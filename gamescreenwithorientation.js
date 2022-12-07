import React from 'react';
import {Text, View, StyleSheet, Alert, FlatList, useWindowDimensions} from 'react-native';
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

  //UseWindowDimenstion

  const { width, height} = useWindowDimensions();

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

  let content = (
      <>
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
      </>
  );
 
  if (width > 500){
      content = (
          <>
          <View style={styles.buttonContainerWide}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                +
                </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                -
                </PrimaryButton>
            </View>
          </View>
          </>
      )
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
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
  buttonContainerWide: {
      flexDirection: 'row',
      alignItems: 'center',
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
