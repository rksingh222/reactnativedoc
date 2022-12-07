/*

*/

import React from 'react';
import {View, Image, StyleSheet, Text, useWindowDimensions} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

function GameOverScreen({totalRounds, userNumber, onStartNewGame}) {

    const {width, height} = useWindowDimensions();
    let imageSize = 300;
    if(width < 380){
        imageSize = 150;
    }
    if (height < 400)
    {
        imageSize = 80;
    }
    const imageStyle ={
        width: imageSize,
        height:imageSize,
        borderRadius: imageSize/2,
    }

  return (
    <View style={styles.rootContainer}>
      <Title>GameOver</Title>
      <View style={[styles.imageContainer,imageStyle]}>
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
