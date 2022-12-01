/**
 * Sample React Native App
 * Using Flex : 1 to the main container so that it uses complete height
 * Using Flex = 1 : 4 to views so that one container takes 1/5 and second takes 4/5
 * OnChangeText Event so that when the text changes this function gets called
 * flat list uses renderITem , data and KeyExtractor 
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
 
   function goalInputHandler(enteredText) {
     setEnteredGoalText(enteredText);
   }
   function addGoalHandler() {
     console.log(enteredGoalText);
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
           data={Data}
           renderItem={({item}) => (
             <View style={styles.item}>
               <Text style={styles.text}>{item.title}</Text>
             </View>
           )}
           keyExtractor={item => item.id}
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
 