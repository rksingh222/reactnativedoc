/**
 * bind() is added with the passed function and called like 
 * props.onDeleteItem.bind()
 * bind is a standard javascript function which basically allows you
 * to preconfigure a function for future execution
 * the first parameter passed is this , second argument passed to bind
 * is will be the first parameter recieved by the to be called function
 *
 * ripple effect in Pressable can be done
 *  <Pressable
 *   android_ripple={{color: '#210644'}}
 *   onPress={props.onDeleteItem.bind(this, props.id)}
 *   style={({pressed}) => pressed && styles.pressedItem}>
 *  for android_ripple and using style pressed on ios and android both
 */

/**
 * App.js
 */

/**
 * Sample React Native App
 * how to map a coursegoals
 * {courseGoals.map((goal)=>(
 * <View key={goal} style={styles.goalItem}>
 * <Text style={styles.goalText}>{goal}</Text>
 * </View>
 * ))}
 */

 import React from 'react';
 import {useState} from 'react';
 import {
   Text,
   View,
   StyleSheet,
   FlatList,
   StatusBar,
   TextInput,
   Button,
 } from 'react-native';
 import GoalItem from './components/GoalItem';
 import GoalInput from './components/GoalInput';
 
 const App = () => {
   const Data = [
     {
       id: '1',
       title: 'First Item',
     },
     {
       id: '2',
       title: 'Second Item',
     },
     {
       id: '3',
       title: 'Third Item',
     },
   ];
 
   const [courseGoals, setCourseGoals] = useState([]);
   function addGoalHandler(enteredGoalText) {
     setCourseGoals(currentCourseGoals => [
       ...currentCourseGoals,
       {text: enteredGoalText, id: Math.random().toString()},
     ]);
   }
   function deleteGoalHandler(id) {
     console.log('value of id' + id);
     setCourseGoals(currentCourseGoals => {
       return currentCourseGoals.filter(goal => goal.id !== id);
     });
   }
   return (
     <View style={styles.appContainer}>
       <GoalInput onAddGoal={addGoalHandler} />
       <View style={styles.flatlistContainer}>
         <FlatList
           data={courseGoals}
           renderItem={itemData => {
             return (
               <GoalItem
                 text={itemData.item.text}
                 id={itemData.item.id}
                 onDeleteItem={deleteGoalHandler}
               />
             );
           }}
           keyExtractor={(item, index) => {
             return item.id;
           }}
         />
       </View>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   appContainer: {
     paddingTop: 50,
     paddingHorizontal: 16,
     backgroundColor: '#00ff00',
     flex: 1,
   },
   inputContainer: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: 24,
     borderBottomWidth: 1,
   },
   flatlistContainer: {
     flex: 4,
   },
   textInput: {
     margin: 5,
     padding: 14,
     borderWidth: 1,
     width: '70%',
   },
   item: {
     backgroundColor: '#000000',
     margin: 5,
   },
   text: {
     fontSize: 40,
     color: '#ffffff',
   },
 });
 
 export default App;
 
 /**
  * GoalInput.js
  */

  import React from 'react';
  import {useState} from 'react';
  import {View, TextInput, Button, StyleSheet} from 'react-native';
  
  function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');
  
    function goalInputHandler(enteredText) {
      setEnteredGoalText(enteredText);
    }
  
    function addGoalHandler() {
      props.onAddGoal(enteredGoalText);
      setEnteredGoalText('');
    }
  
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your Course Goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="add goal" onPress={addGoalHandler} color="#f5f6fa" />
      </View>
    );
  }
  const styles = StyleSheet.create({
    appContainer: {
      paddingTop: 50,
      paddingHorizontal: 16,
      backgroundColor: '#00ff00',
      flex: 1,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      borderBottomWidth: 1,
    },
    flatlistContainer: {
      flex: 4,
    },
    textInput: {
      margin: 5,
      padding: 14,
      borderWidth: 1,
      width: '70%',
    },
    item: {
      backgroundColor: '#000000',
      margin: 5,
    },
    text: {
      fontSize: 40,
      color: '#ffffff',
    },
  });
  export default GoalInput;

/**
 * GoalItem.js
 */

 import React from 'react';
 import {Text, View, StyleSheet, Pressable} from 'react-native';
 
 function GoalItem(props) {
   return (
      <Pressable
      android_ripple={{color: '#210644'}}
      onPress={props.onDeleteItem.bind(this, props.id)}
      style={({pressed}) => pressed && styles.pressedItem}>
       <View style={styles.item}>
         <Text style={styles.text}>{props.text}</Text>
       </View>
     </Pressable>
   );
 }
 
 const styles = StyleSheet.create({
   item: {
     backgroundColor: '#000000',
     margin: 5,
   },
   text: {
     fontSize: 40,
     color: '#ffffff',
   },
 });
 
 export default GoalItem;
