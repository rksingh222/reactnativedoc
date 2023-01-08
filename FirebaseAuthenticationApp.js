/**
 * App.js
 */

 import React, {useContext,useEffect, useState} from 'react';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import {StatusBar} from 'expo-status-bar';
 
 import LoginScreen from './screens/LoginScreen';
 import SignupScreen from './screens/SignupScreen';
 import WelcomeScreen from './screens/WelcomeScreen';
 import {Colors} from './constant/styles';
 import AuthContextProvider, {AuthContext} from './stores/auth-context';
 import IconButton from './componentss/ui/IconButton';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 
 const Stack = createNativeStackNavigator ();
 
 function AuthStack () {
   return (
     <Stack.Navigator
       screenOptions={{
         headerStyle: {backgroundColor: Colors.primary500},
         headerTintColor: 'white',
         contentStyle: {backgroundColor: Colors.primary100},
       }}
     >
       <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="Signup" component={SignupScreen} />
     </Stack.Navigator>
   );
 }
 
 function AuthenticatedStack () {
   const authCtx = useContext (AuthContext);
   return (
     <Stack.Navigator
       screenOptions={{
         headerStyle: {backgroundColor: Colors.primary500},
         headerTintColor: 'white',
         contentStyle: {backgroundColor: Colors.primary100},
       }}
     >
       <Stack.Screen
         name="Welcome"
         component={WelcomeScreen}
         options={{
           headerRight: () => (
             <IconButton
               text="logout"
               textColor={Colors.primary800}
               onPress={authCtx.logout}
             />
           ),
         }}
       />
     </Stack.Navigator>
   );
 }
 
 /**
  * here if it is false it becomes true and it will execute the first statement
  * 
  * if it is true the first statement becomes false and the second statement becomes true
  */
 function Navigation () {
   const authCtx = useContext (AuthContext);
   return (
     <NavigationContainer>
       {!authCtx.isAuthenticated && <AuthStack />}
       {authCtx.isAuthenticated && <AuthenticatedStack />}
     </NavigationContainer>
   );
 }
 /**
  * In npm
  * expo install expo-app-loading
  * 
  * import AppLoading from 'expo-app-loading'; instead of just return
  */
 
 function Root() {
   const [isTryingLogin, setIsTryingLogin] = useState(true);
   const authCtx = useContext(AuthContext);
   useEffect(() => {
     async function fetchToken() {
       const storedToken = await AsyncStorage.getItem('token');
       if (storedToken) {
         authCtx.authenticate(storedToken);
       }
       setIsTryingLogin(false);
     }
     fetchToken();
   }, []);
   if (isTryingLogin) {
     return;
   }
   return <Navigation />;
 }
 export default function App() {
   return (
     <AuthContextProvider>
       <Root />
     </AuthContextProvider>
   );
 }
 

 /**
  * stores/auth-context.js
  */

 /**
 * to install async storage we need to go to this link 
 * 
 * https://react-native-async-storage.github.io/async-storage/docs/install/
 * 
 * follow the guide
 * 
 * npm install @react-native-async-storage/async-storage
 * 
 * npx pod-install
 */

/**
 * to fetch the token from asyncstorage when the app starts from AuthContext Provider
 * 
 * we need to call something which can get us the token 
 */

/**
 * when we call the useEffect to get the token
 * 
 * from AsyncStorage when closing and opening the application
 * 
 * we see the login screen for sometime and then we see the welcome screen
 * 
 * to fix this we can replace the useEffect which we placed after the useState()
 * 
 *  useEffect(() => {
 *   async function fetchToken() {
 *     const storedToken = await AsyncStorage.getItem('token');
 *     if (storedToken) {
 *         setAuthToken(storedToken);
 *     }
 *   }
 *   fetchToken();
 * }, []);
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {createContext} from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: token => {},
  logout: () => {},
});

function AuthContextProvider({children}) {
  /**
   * getItem will return a promise so we need to have a function with async and await
   */
   const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    /**
     * second paramerter is string
     */
    AsyncStorage.setItem('token', token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;


/**
 * LoginScreen.js
 */

 import React, { useContext } from 'react';
 import AuthContent from '../componentss/Auth/AuthContent';
 import LoadingOverlay from '../componentss/ui/LoadingOverlay';
 import {useState} from 'react';
 import {Alert} from 'react-native';
 import {login} from '../util/auth';
 import { AuthContext } from '../stores/auth-context';
 
 function LoginScreen() {
   const authCtx = useContext(AuthContext);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   async function loginHandler({email, password}) {
     setIsAuthenticated(true);
     try {
       const token = await login(email, password);
       authCtx.authenticate(token);
     } catch (error) {
       Alert.alert(
         'Authentication failed',
         'Could not log in please check your connection or try again later'
       );
     }
     setIsAuthenticated(false);
   }
   if (isAuthenticated) {
     return <LoadingOverlay message="Logging you in..." />;
   }
   return <AuthContent isLogin onAuthenticate={loginHandler} />;
 }
 
 export default LoginScreen;
 
 /**
  * SignupScreen.js
  */

 import React, { useContext } from 'react';
import {useState} from 'react';
import AuthContent from '../componentss/Auth/AuthContent';
import LoadingOverlay from '../componentss/ui/LoadingOverlay';
import { AuthContext } from '../stores/auth-context';
import {createUser} from '../util/auth';

function SignupScreen() {
  const authCtx = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function signUpHandler({email, password}) {
    setIsAuthenticated(true);
    const token = await createUser(email, password);
    authCtx.authenticate(token);
    setIsAuthenticated(false);
  }
  if (isAuthenticated) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;


/**
 * WelcomeScreen.js
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * Here in welcome screen to use the token with RealTimeDatabase in firebase console
 * 
 * first go to the RealTime database
 * 
 * Go to rules
 * 
 * {
 *   "rules": {
 *     "read": "auth.uid != null",
 *     "write": "auth.uid != null"
 *   }
 * }
 * 
 * publish the rules
 * 
 * now we cannot access the database without authentication
 * 
 * here in the realtime database just next to the url you have + sign 
 * 
 * give key and value pair and add it
 * 
 * lets suppose the key is message value is helloworld
 * 
 * to access the url  call this
 * 
 * https://react-native-course-a3651-default-rtdb.firebaseio.com/message.json
 * 
 * const [fetchedMessage, setFetchedMessage] = useState('');
 * 
 * const authCtx = useContext(AuthContext);
 * 
 * const token = authCtx.token;
 * 
 * useEffect(() => {
 * axios.get("https://react-native-course-a3651-default-rtdb.firebaseio.com/message.json?auth="+token).then((response) => {setFetchedMessage(response.data)});
 * },[token]);
 * 
 * <Text>{fetchedMessage}</Text>
 */

function WelcomeScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

/**
 * components/Auth/AuthContent.js
 */

 import React from 'react';
 import {useState} from 'react';
 import {Alert, StyleSheet, View} from 'react-native';
 
 import FlatButton from '../ui/FlatButton';
 import AuthForm from './AuthForm';
 import {Colors} from '../../constant/styles';
 import {useNavigation} from '@react-navigation/native';
 
 function AuthContent({isLogin, onAuthenticate}) {
   const [credentialsInvalid, setCredentialsInvalid] = useState({
     email: false,
     password: false,
     confirmEmail: false,
     confirmPassword: false,
   });
   const navigation = useNavigation();
 
   function switchAuthModeHandler() {
     // Todo
     if (isLogin) {
        // navigation.navigate('Signup');
         navigation.replace('Signup');
     }
     else{
        // navigation.navigate('Login');
        navigation.replace('Login');
     }
   }
 
   function submitHandler(credentials) {
     let {email, confirmEmail, password, confirmPassword} = credentials;
 
     email = email.trim();
     password = password.trim();
 
     const emailIsValid = email.includes('@');
     const passwordIsValid = password.length > 6;
     const emailsAreEqual = email === confirmEmail;
     const passwordsAreEqual = password === confirmPassword;
 
     if (
       !emailIsValid ||
       !passwordIsValid ||
       (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
     ) {
       Alert.alert('Invalid input', 'Please check your entered credentials.');
       setCredentialsInvalid({
         email: !emailIsValid,
         confirmEmail: !emailIsValid || !emailsAreEqual,
         password: !passwordIsValid,
         confirmPassword: !passwordIsValid || !passwordsAreEqual,
       });
       return;
     }
     onAuthenticate({email, password});
   }
 
   return (
     <View style={styles.authContent}>
       <AuthForm
         isLogin={isLogin}
         onSubmit={submitHandler}
         credentialsInvalid={credentialsInvalid}
       />
       <View style={styles.buttons}>
         <FlatButton onPress={switchAuthModeHandler}>
           {isLogin ? 'Create a new user' : 'Log in instead'}
         </FlatButton>
       </View>
     </View>
   );
 }
 
 export default AuthContent;
 
 const styles = StyleSheet.create({
   authContent: {
     marginTop: 64,
     marginHorizontal: 32,
     padding: 16,
     borderRadius: 8,
     backgroundColor: Colors.primary800,
     elevation: 2,
     shadowColor: 'black',
     shadowOffset: {width: 1, height: 1},
     shadowOpacity: 0.35,
     shadowRadius: 4,
   },
   buttons: {
     marginTop: 8,
   },
 });
 

 /**
  * components/Auth/AuthForm.js
  */

  import React from 'react';
  import { useState } from 'react';
  import { StyleSheet, View } from 'react-native';
  
  import Button from '../ui/Button';
  import Input from './Input';
  
  function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  
    const {
      email: emailIsInvalid,
      confirmEmail: emailsDontMatch,
      password: passwordIsInvalid,
      confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;
  
    function updateInputValueHandler(inputType, enteredValue) {
      switch (inputType) {
        case 'email':
          setEnteredEmail(enteredValue);
          break;
        case 'confirmEmail':
          setEnteredConfirmEmail(enteredValue);
          break;
        case 'password':
          setEnteredPassword(enteredValue);
          break;
        case 'confirmPassword':
          setEnteredConfirmPassword(enteredValue);
          break;
      }
    }
  
    function submitHandler() {
      onSubmit({
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
      });
    }
  
    return (
      <View style={styles.form}>
        <View>
          <Input
            label="Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'email')}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
          />
          {!isLogin && (
            <Input
              label="Confirm Email Address"
              onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
              value={enteredConfirmEmail}
              keyboardType="email-address"
              isInvalid={emailsDontMatch}
            />
          )}
          <Input
            label="Password"
            onUpdateValue={updateInputValueHandler.bind(this, 'password')}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
          />
          {!isLogin && (
            <Input
              label="Confirm Password"
              onUpdateValue={updateInputValueHandler.bind(
                this,
                'confirmPassword'
              )}
              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
            />
          )}
          <View style={styles.buttons}>
            <Button onPress={submitHandler}>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </View>
        </View>
      </View>
    );
  }
  
  export default AuthForm;
  
  const styles = StyleSheet.create({
    buttons: {
      marginTop: 12,
    },
  });

  /**
   * components/Auth/Input.js
   */

   import React from 'react';
   import { View, Text, TextInput, StyleSheet } from 'react-native';
   
   import { Colors } from '../../constant/styles';
   
   function Input({
     label,
     keyboardType,
     secure,
     onUpdateValue,
     value,
     isInvalid,
   }) {
     return (
       <View style={styles.inputContainer}>
         <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
           {label}
         </Text>
         <TextInput
           style={[styles.input, isInvalid && styles.inputInvalid]}
           autoCapitalize={false}
           autoCapitalize="none"
           keyboardType={keyboardType}
           secureTextEntry={secure}
           onChangeText={onUpdateValue}
           value={value}
         />
       </View>
     );
   }
   
   export default Input;
   
   const styles = StyleSheet.create({
     inputContainer: {
       marginVertical: 8,
     },
     label: {
       color: 'white',
       marginBottom: 4,
     },
     labelInvalid: {
       color: Colors.error500,
     },
     input: {
       paddingVertical: 8,
       paddingHorizontal: 6,
       backgroundColor: Colors.primary100,
       borderRadius: 4,
       fontSize: 16,
     },
     inputInvalid: {
       backgroundColor: Colors.error100,
     },
   });

   /**
    * ui/Button.js
    */

    import React from 'react';
    import { Pressable, StyleSheet, Text, View } from 'react-native';
    
    import { Colors } from '../../constant/styles';
    
    function Button({ children, onPress }) {
      return (
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={onPress}
        >
          <View>
            <Text style={styles.buttonText}>{children}</Text>
          </View>
        </Pressable>
      );
    }
    
    export default Button;
    
    const styles = StyleSheet.create({
      button: {
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      pressed: {
        opacity: 0.7,
      },
      buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
      },
    });

    /**
     * ui/FlatButton.js
     */

     import React from 'react';
     import { Pressable, StyleSheet, Text, View } from 'react-native';
     
     import { Colors } from '../../constant/styles';
     
     function FlatButton({ children, onPress }) {
       return (
         <Pressable
           style={({ pressed }) => [styles.button, pressed && styles.pressed]}
           onPress={onPress}
         >
           <View>
             <Text style={styles.buttonText}>{children}</Text>
           </View>
         </Pressable>
       );
     }
     
     export default FlatButton;
     
     const styles = StyleSheet.create({
       button: {
         paddingVertical: 6,
         paddingHorizontal: 12,
       },
       pressed: {
         opacity: 0.7,
       },
       buttonText: {
         textAlign: 'center',
         color: Colors.primary100,
       },
     });

     /**
      * ui/IconButton.js
      */

      import React from 'react';
      import {Pressable, View, Text, StyleSheet} from 'react-native';
      function IconButton({text, textColor, onPress}) {
        return (
          <Pressable
            onPress={onPress}
            style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
              <Text style={{color: textColor}}>{text}</Text>
            </View>
          </Pressable>
        );
      }
      
      const styles = StyleSheet.create({
        buttonContainer: {
          borderRadius: 24,
          padding: 6,
          marginHorizontal: 8,
          marginVertical: 2,
          borderWidth: 1,
          borderColor: 'black',
        },
        pressed: {
          opacity: 0.75,
        },
        text: {
          color: 'white',
        },
      });
      
      export default IconButton;

      /**
       * ui/LoadingOverlay.js
       */

       import React from 'react';
       import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
       
       function LoadingOverlay({ message }) {
         return (
           <View style={styles.rootContainer}>
             <Text style={styles.message}>{message}</Text>
             <ActivityIndicator size="large" />
           </View>
         );
       }
       
       export default LoadingOverlay;
       
       const styles = StyleSheet.create({
         rootContainer: {
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',
           padding: 32,
         },
         message: {
           fontSize: 16,
           marginBottom: 12,
         },
       });

       /**
        * constant/styles.js
        */

        export const Colors = {
            primary100: '#f9beda',
            primary500: '#c30b64',
            primary800: '#610440',
            error100: '#fcdcbf',
            error500: '#f37c13',
          };
          

        /**
         * util/auth.js
         */

        /**
         * npm install axios
         */
        import axios from 'axios';

        /**
         * To authenticate
         * 
         * react-native-project
         * 
         * https://react-native-course-a3651-default-rtdb.firebaseio.com
         * 
         * test@test.com
         * rahulsingh
         */
        /**
         * to get firebase url for authentication
         * 
         * firebase auth rest api in browser
         * 
         * select sign up with email/password
         * 
         * to get the api key
         * 
         * go to the firebase project
         * 
         * at the top right you will see project overview  with an icon 
         * 
         * click on the setting icon
         * 
         * select project settings
         * 
         * General/Web api key 
         * 
         */

        const API_KEY = 'AIzaSyBLpOokXmC04-nefHufeuHs5u-FjopxXvQ';

        async function authenticate(mode, email, password) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

        const response = await axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true,
        });
        const token =  response.data.idToken;
        return token;
        }

        /**
         * we are not making it async or await because we just want to return the promise
         */
        export function createUser(email, password) {
        return authenticate('signUp', email, password);
        }
        /**
         * same is the case with this function
         */
        export function login(email, password) {
        return authenticate('signInWithPassword', email, password);
        }