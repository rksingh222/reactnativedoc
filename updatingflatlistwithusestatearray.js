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
   const [enteredGoalText, setEnteredGoalText] = useState('');
 
   const [courseGoals, setCourseGoals] = useState([]);
 
   function goalInputHandler(enteredText) {
     setEnteredGoalText(enteredText);
   }
   function addGoalHandler() {
     console.log(enteredGoalText);
     //there are two ways you can set the value of the array using useState
     //1... setCourseGoals([...courseGoals,enteredGoalText]);
     setCourseGoals(currentCourseGoals => [
       ...currentCourseGoals,
       enteredGoalText,
     ]);
   }
   return (
     <View style={styles.appContainer}>
       <View style={styles.inputContainer}>
         <TextInput
           style={styles.textInput}
           placeholder="Your Course Goal"
           onChangeText={goalInputHandler}
         />
         <Button title="add goal" onPress={addGoalHandler} color="#f5f6fa" />
       </View>
       <View style={styles.flatlistContainer}>
         <FlatList
           data={courseGoals}
           renderItem={itemData => {
             return (
               <View style={styles.item}>
                 <Text style={styles.text}>{itemData.item}</Text>
               </View>
             );
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
 