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
   const [guessRounds, setGuessRounds] = useState(0);
 
   function pickedNumberHandler(pickedNumber) {
     setUserNumber(pickedNumber);
     setGameIsOver(false);
   }
 
   function gameOverHandler(numberOfRounds) {
     setGameIsOver(true);
     setGuessRounds(numberOfRounds);
   }
 
   function startNewGameHandler() {
     setUserNumber(null);
     setGuessRounds(0);
   }
 
   let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
   if (userNumber) {
     screen = (
       <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
     );
   }
 
   if (gameIsOver && userNumber) {
     screen = (
       <GameOverScreen
         totalRounds={guessRounds}
         userNumber={userNumber}
         onStartNewGame={startNewGameHandler}
       />
     );
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
  */

  import React from 'react';
  import {useState} from 'react';
  import {TextInput, View, StyleSheet, Alert, Text} from 'react-native';
  import PrimaryButton from '../components/ui/PrimaryButton';
  import Title from '../components/ui/Title';
  import Card from '../components/ui/Card';
  import InstructionText from '../components/ui/InstructionText';
  
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
      <View style={styles.rootContainer}>
        <Title>Guess My Number</Title>
        <Card>
          <InstructionText>Enter a Number</InstructionText>
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
        </Card>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      marginTop: 100,
      alignItems: 'center',
    },
    inputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 36,
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
    textInstruction: {
      color: '#ddd52f',
      fontSize: 24,
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

   import React from 'react';
   import {Text, View, StyleSheet, Alert, FlatList} from 'react-native';
   import {useState, useEffect} from 'react';
   import Title from '../components/ui/Title';
   import NumberContainer from '../components/game/NumberContainer';
   import PrimaryButton from '../components/ui/PrimaryButton';
   import Card from '../components/ui/Card';
   import InstructionText from '../components/ui/InstructionText';
   import GuessLogItem from '../components/game/GuessLogItem';
   
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
     const [guessRounds, setGuessRounds] = useState([initialGuess]);
   
     //UseEffect with dependency
     useEffect(
       () => {
         if (currentGuess === userNumber) {
           onGameOver(guessRounds.length);
         }
       },
       [currentGuess, userNumber, onGameOver]
     );
   
     //empty dependency useEffect
     //will be called once as the UI comes in the phone not when the screen updates
     useEffect(() => {
       minBoundary = 1;
       maxBoundary = 100;
     }, []);
   
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
       setGuessRounds(previousGuesses => [newRndNumber, ...previousGuesses]);
     }
   
   
     const guessRoundsListLength = guessRounds.length;
    
   
     return (
       <View style={styles.screen}>
         <Title>Opponent's Guess</Title>
         <NumberContainer>{currentGuess}</NumberContainer>
         <Card>
           <InstructionText style={styles.instructionText}>
             Higher or Lower
           </InstructionText>
           <View style={styles.buttonsContainer}>
             <View style={styles.buttonContainer}>
               <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                 +
               </PrimaryButton>
             </View>
             <View style={styles.buttonContainer}>
               <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                 -
               </PrimaryButton>
             </View>
           </View>
         </Card>
         <View style={styles.listContainer}>
           <FlatList
             data={guessRounds}
             renderItem={itemData => (
               <GuessLogItem
                 guessRoundIndex={guessRoundsListLength - itemData.index}
                 guessRoundNumber={itemData.item}
               />
             )}
             keyExtractor={item => item}
           />
           {/*{guessRounds.map(guessRound => (
             <Text key={guessRound}>{guessRound}</Text>
           ))} */}
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
     instructionText: {
       marginBottom: 15,
     },
     buttonContainer: {
       flex: 1,
     },
     buttonsContainer: {
       flexDirection: 'row',
     },
     listContainer: {
       flex: 1,
       padding: 16,
     },
   });
   
   export default GameScreen;
   
   /**
    * GameOverScreen.js
    */

   /*

*/

import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

function GameOverScreen({totalRounds, userNumber, onStartNewGame}) {
  return (
    <View style={styles.rootContainer}>
      <Title>GameOver</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/fg.jpg')} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed<Text style={styles.highLight}>{totalRounds}</Text>rounds to guess the number<Text style={styles.highLight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
    width: 300,
    borderRadius: 150,
    borderWidth: 3,
    overflow: 'hidden',
    borderColor: '#3b021f',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontSize: 24,
    color: '#3b021f',
    marginBottom: 24,
  },
  highLight: {
    fontSize: 24,
    color: '#ddd52f',
  },
});

export default GameOverScreen;


/**
 * GuessLogItem.js
 */

 import React from 'react';
 import {View, Text, StyleSheet} from 'react-native';
 function GuessLogItem({guessRoundIndex, guessRoundNumber}) {
   return (
     <View style={styles.logItem}>
       <Text>#{guessRoundIndex}</Text>
       <Text>{guessRoundNumber}</Text>
     </View>
   );
 }
 const styles = StyleSheet.create({
   logItem: {
     borderRadius: 40,
     borderWidth: 2,
     padding: 12,
     marginVertical: 8,
     borderColor: '#3b021f',
     backgroundColor: '#ddd52f',
     flexDirection: 'row',
     justifyContent: 'space-between',
     elevation: 4,
     shadowColor: 'black',
     shadowOffset: {width: 0, height: 0},
     shadowOpacity: 0.25,
     shadowRadius: 3,
   },
 });
 export default GuessLogItem;

 /**
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

  /**
   * Card.js
   */
  

   import React from 'react';
   import {View, StyleSheet} from 'react-native';
   function Card({children}) {
     return <View style={styles.inputContainer}>{children}</View>;
   }
   
   const styles = StyleSheet.create({
     inputContainer: {
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 36,
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
   });
   
   export default Card;

   /**
    * InstructionText.js
    */

    import React from 'react';
    import {Text, StyleSheet} from 'react-native';
    function InstructionText({children, style}) {
      return <Text style={[style, styles.textInstruction]}>{children}</Text>;
    }
    const styles = StyleSheet.create({
      textInstruction: {
        color: '#ddd52f',
        fontSize: 24,
      },
    });
    export default InstructionText;
    
   /**
    * 
    * PrimaryButton.js
    */

   /**
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
 * Title.js
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
 
