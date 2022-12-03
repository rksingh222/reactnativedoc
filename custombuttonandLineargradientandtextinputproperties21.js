/**
 * Applying linear Gradient to our application
 * if you are using expo
 * expo install expo-linear-gradient
 * //import {LinearGradient} from 'expo-linear-gradient';
 * 
 * if you are using npm 
 * import {LinearGradient} from 'expo-linear-gradient';
 * 
 * npm install react-native-linear-gradient --save
 * 
 * npx pod-install
 * 
 * run the application again it worked for me
 */


/**
 * App.js //Main File
 */

 import React from 'react';
 import {StyleSheet, Text, View, StatusBar} from 'react-native';
 //import {LinearGradient} from 'expo-linear-gradient';
 import LinearGradient from 'react-native-linear-gradient';
 
 import StartGameScreen from './screens/StartGameScreen';
 
 const App = () => {
   return (
     <LinearGradient colors={['#4e0329', '#ddd52f']} style={styles.container}>
       <StartGameScreen />
     </LinearGradient>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
 });
 
 export default App;
 

 /**
  * In Screen StartGameScreen.js
  * 
  */

  import React from 'react';
  import {TextInput, View, StyleSheet} from 'react-native';
  import PrimaryButton from '../components/PrimaryButton';
  
  function StartGameScreen () {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton>Confirm</PrimaryButton>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    inputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
      marginHorizontal: 24,
      backgroundColor: '#3b021f',
      padding: 16,
      borderRadius: 8,
      elevation: 4,
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.25,
    },
    numberInput: {
      height: 50,
      width: 50,
      fontSize: 32,
      borderBottomColor: '#ddd52f',
      borderBottomWidth: 2,
      color: '#ddd52f',
      marginVertical: 8,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
    buttonContainer: {
      flex: 1,
    },
  });
  export default StartGameScreen;
  
/**
 *  Component PrimaryButton.js
 * 
 */


/**
 * object destructuring
 */

 import React from 'react';
 import {Text, View, StyleSheet, Pressable} from 'react-native';
 
 function PrimaryButton({children}) {
   function pressHandler() {
     console.log('Pressed');
   }
   return (
     <View style={styles.buttonOuterContainer}>
       <Pressable
         style={({pressed}) =>
           pressed
             ? [styles.pressed, styles.buttonInnerContainer]
             : styles.buttonInnerContainer
         }
         onPress={pressHandler}
         android_ripple={{color: '#640233'}}>
         <Text style={styles.text}>{children}</Text>
       </Pressable>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   buttonOuterContainer: {
     borderRadius: 28,
     margin: 4,
     overflow: 'hidden',
   },
   buttonInnerContainer: {
     backgroundColor: '#72063c',
     paddingVertical: 8,
     paddingHorizontal: 16,
     elevation: 2,
   },
   text: {
     color: '#ffffff',
     textAlign: 'center',
   },
   pressed: {
     opacity: 0.75,
   },
 });
 
 export default PrimaryButton;
 
