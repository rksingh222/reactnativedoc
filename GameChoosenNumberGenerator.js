/**
 * 
 * This React Native App has three screens , two ui component and one game ui component
 * Main App :- App.js
 * Screens :- StartGameScreen.js GameScren.js GameOverScreen.js
 * ui component :- PrimaryButton.js Title.js
 * game ui component :- NumberContainer.js
 */


/**
 * Here first it displays StartGameScreen because picked number is null 
 * screen is StartGameScreen and screen value is startGameScreen
 * we need to set the pickednumberHandler parameter picked Number in the StartGameScreen by passing pickedNumberHandler
 * we useState to tell if the userNumber has been changed as it changes the call to app is made again the screen change
 * from StartGameScreen to GameScreen
 * On confirmInputHandler we set the parameter of pickenumberhandler  using this onPickNumber(chooseNumber);
 * and as it sets User Number by setUserNumber(pickedNumber); then the state changes and it calls App Again
 * 
 * 
 * SafeAreaView is used so that it does not cover the nodge. I.e status bar near that there is a circular space for cam
 *
 * since the colors is used in different places
 * so create a constants folder and in this Color.js
 * in color.js
 * const Colors = {
 *   primary500: '#72063c'
 * }
 * export default Colors;
 * 
 * import Colors from
 * you can use in stylesheet
 * 
 * color: Colors.primary500
 * 
 * 
 * GameOverScreen how the screen gets implemented here logic
 * 
 * first we give the state that isGameOver to true
 * 
 * since the first screen that should come is the StartGameScreen so we specify the first scren with StartGameScreen
 * 
 * Secondly we check if in the StartGameScreen we have choosen a number then it checks whether userNumber is Set. if it is set which is the case
 * then come to the GameScreen
 * 
 * thirdly we need to go to GameOverScreen when the rightno has been choosen so for that we first in PickedNumberHandler which is setting the choosen number
 * we set setGameIsOver(false) so now we also provide a condition to go to the gamescreen if userNumber or chooseNumber is true and gameIsOver is true then
 * we go to the GameOverScreen
 * 
 * Also in useEffect we are checking for the condition and as the condition satisfies it comes back to App.js as the state is changed
 * and hence it updates the screen to GameOverScreen
 *
 * One thing to remember as the State Change for a particular js file it calls that js file main export function 
 */


/**
 * App.js
 */
 import React from 'react';
 import {
   StyleSheet,
   Text,
   View,
   StatusBar,
   ImageBackground,
   SafeAreaView,
 } from 'react-native';
 //import {LinearGradient} from 'expo-linear-gradient';
 import LinearGradient from 'react-native-linear-gradient';
 import {useState} from 'react';
 
 import StartGameScreen from './screens/StartGameScreen';
 import GameScreen from './screens/GameScreen';
 import GameOverScreen from './screens/GameOverScreen';
 
 const App = () => {
   const [gameIsOver, setGameIsOver] = useState(true);
   const [userNumber, setUserNumber] = useState();
 
   function pickedNumberHandler(pickedNumber) {
     setUserNumber(pickedNumber);
     setGameIsOver(false);
   }
 
   function gameOverHandler() {
     setGameIsOver(true);
   }
 
   let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
   if (userNumber) {
     screen = (
       <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
     );
   }
 
   if (gameIsOver && userNumber) {
     screen = <GameOverScreen />;
   }
 
   return (
     <LinearGradient colors={['#4e0329', '#ddd52f']} style={styles.container}>
       <ImageBackground
         source={require('./assets/dicebg.jpg')}
         resizeMode="cover"
         style={styles.container}
         imageStyle={styles.backgroundImage}>
         <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
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
 

 /**
  * StartGameScreen.js
  * 
  */

  import React from 'react';
  import {useState} from 'react';
  import {TextInput, View, StyleSheet, Alert} from 'react-native';
  import PrimaryButton from '../components/ui/PrimaryButton';
  
  function StartGameScreen({onPickNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');
  
    function resetInputHandler() {
      setEnteredNumber('');
    }
    function numberInputHandler(enteredText) {
      setEnteredNumber(enteredText);
    }
  
    function confirmInputHandler() {
      const chooseNumber = parseInt(enteredNumber);
      if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
        Alert.alert(
          'Invalid Number!',
          'Number has to be a number between 1 and 99.',
          [{text: 'okay', style: 'destructive', onPress: resetInputHandler}],
        );
        return;
      }
      onPickNumber(chooseNumber);
    }
  
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
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
   * GameScreen.js
   */
  

  /**
 *  here the nextGuessHandler function takes the logic 
 *  since maxBoundary is 100 and minBoundary 1 at first and lets suppose userNumber is 55
 * 
 *  Now so the first time it generates a randomNumber so lets suppose its 98 by calling generateRandomBetween and excluding the userNumber 
 *  so that it does not guess the number immediately.
 * 
 *  in nextGuessHandler since the random generated number 98(which is current guess) is greater than the userNumber which is 55
 *  the user clicks on - to tell that it needs a number lower than 98
 *  it calls nextGuessHandler where we supply direction as lower
 *  when we go inside the lower
 *  we set the minboundary remains 1 but maxBoundary becomes a currentGuess which is 98
 *  lets suppose now we call randomnumbergenerator with currentGuess as excluded minboundary is 1 and maxBoundary is 98
 * lets suppose it generates a number 45 so our currentGuess is 45.
 *  we select greater which is + to tell that we need a bigger number
 *  in in this case it makes
 *  minBoundary = currentGuess so its 45 and maxBoundary is 98
 *  this continues until it finds the number
 * 
 * also lets suppose our currentGuess or randomnumberGenerated is 45 and userNumber is 58 and we select - which is wrong 
 * because the number is 58 and we will not be able to guess the number
 * in that case we write a logic if direction is lower and currentGuess(45) < userNumber(58) then we call
 * a alert saying that "don't lie that you know that is wrong" and similary with greater also
 *  
 * 
 * what is useEffect 
 * 
 * useEffect is the depedency of certain values and if that changes and agrees with the condition then that method gets 
 * called
 * the same is happening is here
 */

import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {useState, useEffect} from 'react';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {
  console.log('Inside Game Screen');
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  console.log(initialGuess);
  console.log('max Boundary ' + maxBoundary + ' minBoundary ' + minBoundary);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("don't lie", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }

    // direction => 'lower', 'greater'
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    console.log('random number generated' + newRndNumber);
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower</Text>
        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
          +
        </PrimaryButton>
        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
          -
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ddd52f',
    borderWidth: 2,
    borderColor: '#ddd52f',
    textAlign: 'center',
    padding: 12,
  },
});

export default GameScreen;


/**
 * GameOverScreen.js
 * 
 */

 import React from 'react';
 import {Text} from 'react-native';
 
 function GameOverScreen() {
   return <Text>GameOverScreen</Text>;
 }
 
 export default GameOverScreen;

 
/**
 * Title.js
 * 
 */

 import React from 'react';
 import {Text, StyleSheet} from 'react-native';
 function Title({children}) {
   return <Text style={styles.title}>{children}</Text>;
 }
 const styles = StyleSheet.create({
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     color: '#ffffff',
     borderWidth: 2,
     borderColor: '#ffffff',
     textAlign: 'center',
     padding: 12,
   },
 });
 export default Title;


 /**
  * PrimaryButton.js
 * 
 * 
 * object destructuring
 */

import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

function PrimaryButton({children, onPress}) {
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
        onPress={onPress}
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


/**
 * 
 * NumberContainer.js
 */
 

 import React from 'react';
 import {View, Text, StyleSheet} from 'react-native';
 function NumberContainer({children}) {
   return (
     <View style={styles.container}>
       <Text style={styles.text}>{children}</Text>
     </View>
   );
 }
 const styles = StyleSheet.create({
   container: {
     borderWidth: 2,
     borderColor: '#ddd52f',
     padding: 24,
     margin: 24,
     borderRadius: 8,
     alignItems: 'center',
     justifyContent: 'center',
   },
   text: {
     fontSize: 36,
     fontWeight: 'bold',
     color: '#ddd52f',
   },
 });
 export default NumberContainer;
 