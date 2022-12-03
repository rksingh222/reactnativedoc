/**
 *  if you are not setting the Modal props then try this method
 *  This will allow the GoalInput to work only if modalIsVisible is true
 *  {modalIsVisible &&<GoalInput onAddGoal={addGoalHandler} visibility={modalIsVisible} />}
 *  
 *  How to set image to my application
 *  1 create an assets folder
 *  2 Copy the image jpg or png
 *  3 As we want to apply the image to goalInput.js
 *  4 <Image source={require('../assets/goalimage.jpeg')} />
 * 
 *  In expo to keep the background color for all the screen
 *  go to app.json
 *  inside expo: {
 *  "backgroundColor": "#ffffff",
 * }
 * 
 * to change the status bar in expo
 * <StatusBar style="light">
 * import {StatusBar} from 'expo-status-bar'
 * 
 *  for metro
 *  import {StatusBar} from 'react-native
 *  <StatusBar barStyle="light-content" />
 * 
 *   <> </> --- this is called a fragment
 */


/**
 * App.js
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
 
   const [modalIsVisible, setModalIsVisible] = useState(false);
   const [courseGoals, setCourseGoals] = useState([]);
   function addGoalHandler(enteredGoalText) {
     setCourseGoals(currentCourseGoals => [
       ...currentCourseGoals,
       {text: enteredGoalText, id: Math.random().toString()},
     ]);
     setModalIsVisible(false);
   }
   function deleteGoalHandler(id) {
     console.log('value of id' + id);
     setCourseGoals(currentCourseGoals => {
       return currentCourseGoals.filter(goal => goal.id !== id);
     });
   }
 
   function startAddGoalHandler() {
     setModalIsVisible(true);
   }
   function endAddGoalHandler() {
     setModalIsVisible(false);
   }
 
   return (
     <>
       <StatusBar barStyle="light-content" />
       <View style={styles.appContainer}>
         <Button 
           title="add new goal" 
           color="#a065ec" 
           onPress={startAddGoalHandler} 
         />
         <GoalInput
           onAddGoal={addGoalHandler}
           visibility={modalIsVisible}
           onCancel={endAddGoalHandler}
         />
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
     </>
   );
 };
 
 const styles = StyleSheet.create({
   appContainer: {
     paddingTop: 50,
     paddingHorizontal: 16,
     backgroundColor: '#1e085a',
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
  import {View, TextInput, Button, StyleSheet, Modal, Image} from 'react-native';
  
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
      <Modal visible={props.visibility} animationType="slide">
        <View style={styles.inputContainer}>
          <Image
            style={styles.image}
            source={require('../assets/goalimage.jpeg')}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Your Course Goal"
            onChangeText={goalInputHandler}
            value={enteredGoalText}
          />
          <View style={styles.buttonContainer}>
            <View class="buttonView1">
              <Button title="cancel" onPress={props.onCancel} color="#b180f0" />
            </View>
            <View class="buttonView2">
              <Button title="add goal" onPress={addGoalHandler} color="#5e0acc" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#311b6b',
    },
    image: {
      width: 100,
      height: 100,
      margin: 20,
    },
    textInput: {
      margin: 5,
      padding: 16,
      borderWidth: 1,
      width: '100%',
      borderColor: '#e4d0ff',
      backgroundColor: '#e4d0ff',
      color: '#120438',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    buttonView1: {
      width: 100,
      marginHorizontal: 16,
    },
    buttonView2: {
      width: 100,
      marginHorizontal: 8,
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
     pressedItem: {
       opacity: 0.5,
     },
     text: {
       fontSize: 40,
       color: '#ffffff',
     },
   });
   
   export default GoalItem;
   