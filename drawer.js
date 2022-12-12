/***
*
* if you get a problem regarding reanimated 
*
 * in one project
 * 
 * first try restarting the npm start process 
 * 
 * Just add the below code in babel.config.js
 * 
 * module.exports = {
 *     presets: ['module:metro-react-native-babel-preset'],
 *
 *     // add the below line 
 *     plugins: ['react-native-reanimated/plugin'], 
 *    // this should be always last line
 *   };
 * 
 * then in terminal 
 * 
 * npx react-native start --reset-cache or npm start -- --reset-cache
 *
 * run the app again
 *
 * this should fix the problem related to reanimated 
 */

/*
 * Drawer also opens navigation and route to that component
 * navigation.toggleDrawer() --- to open the drawer if the drawer is closed and to close the drawer if the drawer is opened
 */


import  {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//this import is only for expo apps and remove drawerIcon if you are not using expo icon
import { Ionicons } from '@exp/vector-icons' ;
const Drawer = createDrawerNavigator();
export default function App(){
    return (
        <NavigationContainer>
           <Drawer.Navigator initialRouteName='welcome'>
               <Drawer.screen name='welcome' component={WelcomeScreen} 
                 options= {{
                    headerStyle: {backgroundColor : '#3c06ab'},
                    headerTintColor: 'white', /* header text color like the triple line and the text */
                    drawerLabel: 'Welcome Screen', /* drawer triple line when selected it shows the screen name there */
                    drawerActiveBackgroundColor : '#f0e1ff',
                    drawerActiveTintColor : '#3c0a6b',
                    drawerStyle: {backgroundColor: '#ccc'}, /* overall drawer bg color */
                    drawerIcon:  ({color, size}) => (<Ionicons name="home" color={color} size={size}/>),
                 }}
               />
               <Drawer.screen name='user' component={UserScreen} />
           </Drawer.Navigator>
        </NavigationContainer>
    );
}
