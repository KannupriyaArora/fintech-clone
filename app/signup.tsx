import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { use } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'

const signup = () => {
  const [countryCode, setCountryCode] = React.useState('+91')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
  const router = useRouter();
  const {signUp} = useSignUp();
  
  const onSignup = async() => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    const encodedPhoneNumber = encodeURIComponent(fullPhoneNumber);
    // router.push({pathname: '/verify/[phone]', params: {phone: encodedPhoneNumber}})
    try {
      //clerk doesn't verify indian numbers
      // await signUp!.create({
      //   phoneNumber: fullPhoneNumber,
      // })
      router.push({pathname: '/verify/[phone]', params: {phone: encodedPhoneNumber}})
    } catch (err) {
      console.error('error signing up', err);
    }
  }

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let's get started!</Text>
      <Text style={defaultStyles.descriptionText}>Enter your phone number. We will send you a confirmation code there.</Text>

    <View style={styles.inputContainer}>
      <TextInput
      style={styles.input}
      placeholder='Country Code'
      placeholderTextColor={Colors.gray}
      keyboardType='numeric'
      value={countryCode}
      onChangeText={setCountryCode}
      />
      <TextInput
      style={[styles.input, { flex: 1 }]}
      placeholder='Phone Number'
      placeholderTextColor={Colors.gray}
      keyboardType='numeric'
      value={phoneNumber}
      onChangeText={setPhoneNumber} 
      />
    </View>

    <Link href='/login' replace asChild>
    <TouchableOpacity>
      <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
    </TouchableOpacity>
    </Link>
    
    <View style={{ flex: 1}}/>
    <TouchableOpacity style={[defaultStyles.pillButton, phoneNumber!==''? styles.enabled : styles.disabled, {marginBottom : 20}]} onPress={onSignup}>
      <Text style={defaultStyles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  )
}

const styles= StyleSheet.create({
  inputContainer:{
    marginVertical:20,
    flexDirection:'row',
  },
input: {
  backgroundColor: Colors.lightGray,
  padding: 20,
  borderRadius: 16,
  fontSize: 20,
  marginRight: 10,
},
enabled: {
  backgroundColor: Colors.primary,
},
disabled: {
  backgroundColor: Colors.primaryMuted,
}
})

export default signup