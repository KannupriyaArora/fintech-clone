import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

enum SignInType {
  Phone,
  Email,
  Google,
  Apple
}


const login = () => {
  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      // Handle phone sign-in
    } else if (type === SignInType.Email) {
      // Handle email sign-in
    } else if (type === SignInType.Google) {
      // Handle Google sign-in
    } else if (type === SignInType.Apple) {
      // Handle Apple sign-in
    }
  }
  const [countryCode, setCountryCode] = React.useState('+49')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back!</Text>
        <Text style={defaultStyles.descriptionText}>Enter the phone number associated with your account.</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Country Code'
            placeholderTextColor={Colors.gray}
            keyboardType='numeric'
            value={countryCode}
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

        <TouchableOpacity style={[defaultStyles.pillButton, phoneNumber !== '' ? styles.enabled : styles.disabled, { marginBottom: 20 }]} onPress={() => onSignIn(SignInType.Phone)}>
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[defaultStyles.pillButton, {
            flexDirection: 'row',
            gap: 16,
            marginTop: 20,
            backgroundColor: '#fff',
          }]}>
          <Ionicons name="mail" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[defaultStyles.pillButton, {
            flexDirection: 'row',
            gap: 16,
            marginTop: 20,
            backgroundColor: '#fff',
          }]}>
          <Ionicons name="logo-google" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[defaultStyles.pillButton, {
            flexDirection: 'row',
            gap: 16,
            marginTop: 20,
            backgroundColor: '#fff',
          }]}>
          <Ionicons name="logo-apple" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Apple</Text>
        </TouchableOpacity>





      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    flexDirection: 'row',
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

export default login