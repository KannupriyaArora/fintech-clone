import Colors from '@/constants/Colors';
import { Stack, useRouter, useSegments, Link } from 'expo-router';
import React, { useEffect } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const router = useRouter();


  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return <Stack>
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
        headerLeft: () => (<TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={34} color={Colors.dark} />
        </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen
      name="login"
      options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerLeft: () => (<TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={34} color={Colors.dark} />
        </TouchableOpacity>
        ),
        headerRight: () => (
          <Link href='/help' asChild>
            <TouchableOpacity>
              <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
            </TouchableOpacity>
          </Link>
        ),
      }}
    />
    <Stack.Screen
      name="help"
      options={{
        title: 'Help',
        presentation: 'modal',

      }}
    />

  </Stack>;
};


const RootLayoutNav = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style='light' />
      <InitialLayout />
    </GestureHandlerRootView>
  );
}


export default RootLayoutNav;
