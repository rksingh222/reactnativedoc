/**
 * 1. Passing function to the prop from App.js
 * 2. from GoalInput props sending enteredGoalText parameter to the passing function
 * 3. GoalItem taking a simple text prop
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
       {text: enteredGoalText, key: Math.random().toString()},
     ]);
   }
   return (
     <View style={styles.appContainer}>
       <GoalInput onAddGoal={addGoalHandler} />
       <View style={styles.flatlistContainer}>
         <FlatList
           data={courseGoals}
           renderItem={itemData => {
             return <GoalItem text={itemData.item.text} />;
           }}
           keyExtractor={(item, index) => {
             return item.key;
           }}
         />
       </View>
     </View>
   );
 };
 
 const styles = StyleSheet.create ({
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
    }
  
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your Course Goal"
          onChangeText={goalInputHandler}
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
   import {Text, View, StyleSheet} from 'react-native';
   
   function GoalItem(props) {
     return (
       <View style={styles.item}>
         <Text style={styles.text}>{props.text}</Text>
       </View>
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
   