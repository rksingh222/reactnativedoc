/**
 * so when a screen is in landscape mode and you get stuck because your keyboard
 * comes up and the input field goes down of keyboard
 * 
 * to fix this we wrap the keyboardAvoidingView in the main view 
 * also we wrap the keyboardAvoidingView with Scrollview
 * 
 * we set the styling for both to take the whole screen i.e flex :1 for both 
 * keyboardAvoidingView and Scrollview
 * 
 * in keyboardAvoidingView the behaviour should be position
 * 
 */

import { KeyboardAvoidingView, ScrollView } from "react-native";


function StartGameScreen(){

   return(
       <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior='position'>
            <View style={styles.container}>
            </View>
        </KeyboardAvoidingView>
       </ScrollView>
   );
}

const styles = StyleSheet.create({
    screen : {
        flex: 1,
    },
  });

export default StartGameScreen;
