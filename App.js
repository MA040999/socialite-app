import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';

export default function App() {
  return (
      <LinearGradient
        colors={['#211663', '#0cae88']}
        style={styles.container}
      >
          <Navbar/>
        <View style={{...styles.container}}>
          <CreatePost/>
          <Text>asdasda</Text>
        </View>
        {/* <StatusBar  barStyle="light-content" translucent={true} /> */}
        <StatusBar style='light'/>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postScreen: {
    flexDirection: 'row',
  }
});
