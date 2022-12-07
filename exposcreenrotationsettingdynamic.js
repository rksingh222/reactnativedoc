/**
 * In expo the orientation is locked to portrait in 
 * app.json 
 * orientation : portrait
 * to change this orientation so that both works  we need
 * to change it to 
 * orientation : default
 * with that it will accept portrait as well as landscape
 * 
 */

/**
 * to set screen sizes dynamically for different orientation
 * we don't use Dimension we use 
 * 
 * a hook that is 
 * useWindowDimensions
 * and this should be called in the component function which gets rendered
 * 
 */

import { useWindowDimensions } from "react-native";

function StartGameScreen(){
    //so when it comes to potrait it tells you the width and height
    // and when it comes to landscape it tells you the width and height in that mode
   const {width, height} = useWindowDimensions();

   const marginTopDistance = height < 380 ? 30 : 100;

   //now to use this property on the styles dynamically 
   //this will adjust whenever the screen orientation changes
   return(
       <View style={[styles.container, {marginTop : marginTopDistanced}]}>
       </View>
   );
}

export default StartGameScreen;