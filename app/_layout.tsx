import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
// import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ 
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (<TouchableOpacity onPress={() => { } }>
            <Ionicons name="arrow-back" size={34} color={Colors.dark} />
          </TouchableOpacity>
          ),
         }}
      />
    </Stack>
  );
}
