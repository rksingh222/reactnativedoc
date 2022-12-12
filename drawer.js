/***
 * in one project
 * 
 * first try restarting the npm start process 
 * 
 * and run npm run ios in another terminal
 * 
 * Reanimated package error if you get
 * 
 * a fix that works  is to install new version of reanimated
 * 
 * go to package.json
 * 
 * you will have react-native-reanimated version
 * 
 * go to terminal project
 * 
 * npm install react-native-reanimated@1 --save --save-exact
 */

import  {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
export default function App(){
    return (
        <NavigationContainer>
           <Drawer.Navigator initialRouteName='welcome'>
               <Drawer.screen name='welcome' component={WelcomeScreen} />
               <Drawer.screen name='user' component={UserScreen} />
           </Drawer.Navigator>
        </NavigationContainer>
    );
}