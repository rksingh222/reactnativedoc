/**
 * setting the background image
 * giving the opacity to the background image will allow the linear gradient to be visible
 * we can set two styles in LinearGradien one is style and another is imageStyle for opacity
 */

 import React from 'react';
 import {StyleSheet, Text, View, StatusBar, ImageBackground} from 'react-native';
 //import {LinearGradient} from 'expo-linear-gradient';
 import LinearGradient from 'react-native-linear-gradient';
 
 import StartGameScreen from './screens/StartGameScreen';
 
 const App = () => {
   return (
     <LinearGradient colors={['#4e0329', '#ddd52f']} style={styles.container}>
       <ImageBackground
         source={require('./assets/dicebg.jpg')}
         resizeMode="cover"
         style={styles.container}
         imageStyle={styles.backgroundImage}>
         <StartGameScreen />
       </ImageBackground>
     </LinearGradient>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   backgroundImage: {
     opacity: 0.25,
   },
 });
 
 export default App;
 
