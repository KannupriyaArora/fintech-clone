import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
// import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors';
import { useMockAuth } from '../AuthContext';

const CELL_COUNT = 6;
const Page = () => {
    const {signIn} = useMockAuth();
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();
    const decodedPhone = decodeURIComponent(phone as string);
    const [code, setCode] = useState('');
    // const { signIn } = useSignIn();
    // const { signUp, setActive } = useSignUp();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    })

    const MOCK_OTP = '123456';
    useEffect(() => {
        if (code.length === 6) {
            console.log(code,"code");
            // if (signin === 'true') {
            //     verifySignIn();
            // } else {
            //     verifyCode();
            // }
            verifyMockOTP();
        }
    }, [code]);

    const verifyMockOTP = async () => {
  if (code === MOCK_OTP) {
    await signIn();
    Alert.alert('Success', 'OTP verified successfully !!');
    // Navigate to home/dashboard
    // router.replace('/(tabs)');
  } else {
    Alert.alert('Invalid OTP', 'Please enter correct code');
    setCode('');
  }
};

//clerk doesn't verify indian numbers
    // const verifyCode = async () => {
    //     try{
    //         await signUp!.attemptPhoneNumberVerification({
    //             code,
    //         });
    //             await setActive!({session: signUp!.createdSessionId});

    //     } catch(err){
    //         console.log('error', JSON.stringify(err, null, 2));
    //         if(isClerkAPIResponseError(err)) {
    //             Alert.alert('Error', err.errors[0].message);
    //         }
    //     }
    //  };
    // const verifySignIn = async () => { 
    //      try{
    //         await signIn!.attemptFirstFactor({
    //             strategy: 'phone_code',
    //             code,
    //         });
    //             await setActive!({session: signIn!.createdSessionId});

    //     } catch(err){
    //         console.log('error', JSON.stringify(err, null, 2));
    //         if(isClerkAPIResponseError(err)) {
    //             Alert.alert('Error', err.errors[0].message);
    //         }
    //     }
    // };
    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>6-digit code</Text>
            <Text style={defaultStyles.descriptionText}>
                Code sent to {decodedPhone} unless you already have an account.
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                      <Fragment key={index}>
                        <View
                          // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                          onLayout={getCellOnLayoutHandler(index)}
                          key={index}
                          style={[styles.cellRoot, isFocused && styles.focusCell]}>
                          <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
                        </View>
                        {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
                      </Fragment>
                )}
            />

            <Link href={'/login'} replace asChild>
                <TouchableOpacity>
                    <Text style={defaultStyles.textLink}>Already have an account? Login</Text>
                </TouchableOpacity>

            </Link>

        </View>
    )
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 12,
    },
    cellRoot: {
        width: 48,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 12,
    },

    cellText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
    },

    focusCell: {
        borderWidth: 2,
        borderColor: Colors.primary,
        backgroundColor: '#fff',
    },
    separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  },

})

export default Page