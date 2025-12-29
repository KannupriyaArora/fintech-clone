import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useAssets } from 'expo-asset';
import { Link } from 'expo-router';
import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';



export default function Index() {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
  
  const { height, width } = Dimensions.get('screen');
  const player = useVideoPlayer(
    assets ? assets[0].uri : '',
    (p) => {
      if (assets) {
        p.loop = true;
        p.play();
        p.muted = true;
      }
    }
  );

  if (!assets) {
    return <View style={styles.container} />;
  }

  return (
    <>

      <StatusBar hidden />

    <View style={styles.container}>
      {/* Background Video */}
      <VideoView
        player={player}
 style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    transform: [{ scale: 1.1 }],
  }}      pointerEvents="none"
    contentFit='cover'
        allowsFullscreen={false}  
        allowsPictureInPicture={false}
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link href={'/login'} style ={[defaultStyles.pillButton, {flex: 1, backgroundColor: Colors.dark}]} asChild>
    <TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: 500 }}>Login</Text>
    </TouchableOpacity>
    </Link>

    <Link href={'/signup'} style ={[defaultStyles.pillButton, {flex: 1, backgroundColor: '#ffffff'}]} asChild>
    <TouchableOpacity>
      <Text style={{fontSize: 22, fontWeight: 500 }}>Sign up</Text>
    </TouchableOpacity>
    </Link>
      </View>
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'space-between',
  },
  overlay: {
    flex: 1,
    marginTop: 80,
    padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    color: 'white',
    textTransform: 'uppercase',
    // textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});
