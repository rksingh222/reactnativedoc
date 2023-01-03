/**
 * To make this app working 
 * 
 * Need to install react navigation from react navigation doc
 * 
 * Need to install native stack from react navigation doc
 * 
 * Need to install bottomtab navigator from react navigation doc
 */

/**
 * App.js
 */

/**
 * if in multiple screen we have a common option styles
 * 
 * instead of using options we use screenOptions in Stack.Navigator instead of Stack.Screen
 */
 import 'react-native-gesture-handler';
 import React from 'react';
 import {StyleSheet, Text, View, Button} from 'react-native';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
 import ManageExpenses from './screens/ManageExpenses';
 import RecentExpenses from './screens/RecentExpenses';
 import AllExpenses from './screens/AllExpenses';
 import {GlobalStyles} from './constants/styles';
 import IconButton from './component/UI/IconButton';
 import ExpensesContextProvider from './stores/expenses-context';
 
 const Stack = createNativeStackNavigator();
 const BottomTabs = createBottomTabNavigator();
 
 /**
  * to set the tab bar Icon in options use this
  * 
  * tabBarIcon : ({color, size}) => {
  *   <Iconicons name="hourglass" size={size} color={color}
  * }
  * 
  */
 
 /**
  * currently in ScreenOptions we are passing an object
  * 
  * screenOptions={{
  *       headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
  *      headerTintColor: 'white',
  *      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
  *       tabBarActiveTintColor: GlobalStyles.colors.accent500,
  *       headerRight: ({tintColor}) => <IconButton onPress={() => {}} />,
  *    }}
  *but we can also pass a function to screenoptions and then return an object
  *  screenOptions={({navigation}) => ({
  *       headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
  *       headerTintColor: 'white',
  *       tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
  *       tabBarActiveTintColor: GlobalStyles.colors.accent500,
  *       headerRight: ({tintColor}) => <IconButton onPress={() => {}} />,
  *     })}
  * 
  * with this we get a navigation hook also
  *  
  */
 
 function ExpensesOverview() {
   return (
     <BottomTabs.Navigator
       screenOptions={({navigation}) => ({
         headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
         headerTintColor: 'white',
         tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
         tabBarActiveTintColor: GlobalStyles.colors.accent500,
         headerRight: ({tintColor}) => (
           <IconButton
             text="add"
             textColor="white"
             onPress={() => {
               console.log('test');
               navigation.navigate('ManageExpense');
             }}
           />
         ),
       })}>
       <BottomTabs.Screen
         name="RecentExpenses"
         component={RecentExpenses}
         options={{
           title: 'Recent Expenses',
           tabBarLabel: 'Recent',
         }}
       />
       <BottomTabs.Screen
         name="AllExpenses"
         component={AllExpenses}
         options={{
           title: 'All Expenses',
           tabBarLabel: 'All Expenses',
         }}
       />
     </BottomTabs.Navigator>
   );
 }
 
 function App() {
   return (
     <ExpensesContextProvider>
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen
             name="ExpensesOverview"
             component={ExpensesOverview}
             options={{headerShown: false}}
           />
           <Stack.Screen
             name="ManageExpense"
             component={ManageExpenses}
             options={{presentation: 'modal'}}
           />
         </Stack.Navigator>
       </NavigationContainer>
     </ExpensesContextProvider>
   );
 }
 
 export default App;
 

 /** 
  * 
  * Context for accessing and adding and updating the array from any component
  * 
  */

 /**
  * store/expenses-context.js
  */


  import React, {createContext, useReducer} from 'react';
  import {useContext} from 'react';
  
  /***
   * Job of a reducer function is to always a return a new state value
   * either default or new with the case
   * we are returning a new state in add , update and delete
   * 
   * important question is how a state can be an array
   * its our reducer so it what we return
   * when the app just starts we set initial value to reducer 
   * we set DUMMY_EXPENSES in the second paramerter of useReducer() where 
   * we set the initalstate to DUMMY_EXPENSES
   */
  
  const DUMMY_EXPENSES = [
    {
      id: 'e1',
      description: 'A pair of shoe',
      amount: 59.99,
      date: new Date('2022-12-19'),
    },
    {
      id: 'e2',
      description: 'A pair of trousers',
      amount: 89.29,
      date: new Date('2022-01-05'),
    },
    {
      id: 'e3',
      description: 'Some bananas',
      amount: 5.99,
      date: new Date('2022-11-30'),
    },
    {
      id: 'e4',
      description: 'A book',
      amount: 14.99,
      date: new Date('2022-12-29'),
    },
    {
      id: 'e5',
      description: 'Another book',
      amount: 18.59,
      date: new Date('2022-12-31'),
    },
  ];
  
  export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
  });
  
  function expenseReducer(state, action) {
    switch (action.type) {
      case 'ADD':
        const id = new Date().toString() + Math.random().toString();
        return [{...action.payload, id: id}, ...state];
      case 'UPDATE':
        /**
         * first getting the id in payload and searching that in the initial state
         * once found saving in the updatableExpenseIndex
         */
        const updatableExpenseIndex = state.findIndex(expense => {
          return expense.id === action.payload.id;
        });
        console.log(action.payload.id);
        console.log(updatableExpenseIndex);
        /**
         * updatableExpense will be assigned with state[updatableExpenseIndex]
         */
        const updatableExpense = state[updatableExpenseIndex];
        /**
         * now we need to update the data which we get from user to be 
         * updated in the current state
         * so this line will with finded expense object overrides the existing values and id will remain same
         * for example if
         * {description: xyz , amount: 10, date: 12-3-2022} this was the finded index
         * and action.payload.data contains new value
         * {description: rtv, amount: 20 , date: 12-3-2021} this will be updated with this statement
         */
        const updatableItem = {...updatableExpense, ...action.payload.data};
        /***
         * here we get state in updatedexpenses
         */
        const updatedExpenses = [...state];
        /**
         * we change the state with updatableItem
         */
        updatedExpenses[updatableExpenseIndex] = updatableItem;
        return updatedExpenses;
      case 'DELETE':
        return state.filter(expense => expense.id !== action.payload);
      default:
        return state;
    }
  }
  
  function ExpensesContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);
  
    function addExpense(expenseData) {
      dispatch({type: 'ADD', payload: expenseData});
    }
    function deleteExpense(id) {
      dispatch({type: 'DELETE', payload: id});
    }
    function updateExpense(id, expenseData) {
      dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }
  
    const value = {
      expenses: expenseState,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense,
    };
    return (
      <ExpensesContext.Provider value={value}>
        {children}
      </ExpensesContext.Provider>
    );
  }
  
  export default ExpensesContextProvider;
  

  /**
   * RecentExpenses.js
   */

   import React, {useContext} from 'react';
   import {Text} from 'react-native';
   import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
   import {ExpensesContext} from '../stores/expenses-context';
   import {getDateMinusDays} from '../util/date';
   
   function RecentExpenses() {
     const expensesCtx = useContext(ExpensesContext);
     const recentExpenses = expensesCtx.expenses.filter(expense => {
       const today = new Date();
       const date7DaysAgo = getDateMinusDays(today, 7);
       return expense.date > date7DaysAgo;
     });
     return (
       <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
     );
   }
   
   export default RecentExpenses;
   
   /**
    * AllExpenses.js
    */

    import React, {useContext} from 'react';
    import {Text} from 'react-native';
    import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
    import {ExpensesContext} from '../stores/expenses-context';
    
    function AllExpenses() {
      const expenseCtx = useContext(ExpensesContext);
      return (
        <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod="Total" />
      );
    }
    
    export default AllExpenses;


    /**
     * ManageExpenses.js
     */

     import React, {useContext, useLayoutEffect} from 'react';
     import {Text, View, StyleSheet} from 'react-native';
     import ExpenseForm from '../component/ManageExpense/ExpenseForm';
     
     import IconButton from '../component/UI/IconButton';
     import {GlobalStyles} from '../constants/styles';
     import { ExpensesContext } from '../stores/expenses-context';
     
     /**
      * route.params? means that if it is null then do not execute further 
      * 
      * !! means in javascript to convert the variable in a boolean variable 
      * 
      * !! 0 = false
      * !! 1 or 2 or 3 = true
      */
     function ManageExpenses({route, navigation}) {
     
       const expenseCtx = useContext(ExpensesContext);
     
       console.log('manage expenses');
       const editedExpenseId = route.params?.expenseId;
       const isEditing = !!editedExpenseId;
      
       const selectedExpense = expenseCtx.expenses.find((expense)=> expense.id === editedExpenseId);
       useLayoutEffect(()=>{
         navigation.setOptions({
           title: isEditing ? 'Edit Expense' : 'Add Expense'
         });
        }, [navigation, isEditing]);
     
       function deleteExpenseHandler() {
         expenseCtx.deleteExpense(editedExpenseId);
         navigation.goBack();
       }
       function cancelHandler() {
         navigation.goBack();
       }
       /**
        * 
        * {
             description: 'Test',
             amount: 19.99,
             date: new Date('2022-12-31'),
           }
        */
       function confirmHandler(expenseData) {
         if(isEditing) {
           console.log("update expense");
           expenseCtx.updateExpense(editedExpenseId, expenseData);
         } else {
           expenseCtx.addExpense(expenseData);
         }
         navigation.goBack();
       }
       return (
         <View style={styles.container}>
           <ExpenseForm 
             submitButtonLabel={isEditing ? 'Update' : 'Add'} 
             onCancel={cancelHandler} onSubmit={confirmHandler}
             defaultValue={selectedExpense}/>
           {isEditing &&
             <View style={styles.deleteContainer}>
               <IconButton
                 text="trash"
                 textColor={GlobalStyles.colors.error500}
                 onPress={deleteExpenseHandler}
               />
             </View>}
         </View>
       );
     }
     
     const styles = StyleSheet.create({
       
       container: {
         flex: 1,
         padding: 24,
         backgroundColor: GlobalStyles.colors.primary800,
       },
       deleteContainer: {
         marginTop: 16,
         paddingTop: 8,
         borderTopWidth: 2,
         borderTopColor: GlobalStyles.colors.primary200,
         alignItems: 'center',
       },
     });
     export default ManageExpenses;
     

     /**
      * component/ExpensesOutput/ExpenseItem.js
      */

      import React from 'react';
      import {Pressable, View, Text, StyleSheet} from 'react-native';
      import {GlobalStyles} from '../../constants/styles';
      import {getFormattedDate} from '../../util/date';
      import {useNavigation} from '@react-navigation/native';
      
      /**
       * using navigation hook to go to ManageExpense Screen
       * because its difficult to get the navigation object
       */
      
      function ExpenseItem({id, description, amount, date}) {
        const navigation = useNavigation();
        function expensePressHandler() {
          navigation.navigate('ManageExpense', {expenseId: id});
        }
        return (
          <Pressable
            onPress={expensePressHandler}
            style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
              <View>
                <Text style={[styles.textBase, styles.description]}>
                  {description}
                </Text>
                <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
              </View>
            </View>
          </Pressable>
        );
      }
      
      export default ExpenseItem;
      
      const styles = StyleSheet.create({
        pressed: {
          opacity: 0.75,
        },
        expenseItem: {
          padding: 12,
          marginVertical: 8,
          backgroundColor: GlobalStyles.colors.primary500,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 6,
          elevation: 3,
          shadowColor: GlobalStyles.colors.gray500,
          shadowRadius: 4,
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
        },
        textBase: {
          color: GlobalStyles.colors.primary50,
        },
        description: {
          fontSize: 16,
          marginBottom: 4,
          fontWeight: 'bold',
        },
        amountContainer: {
          paddingHorizontal: 12,
          paddingVertical: 4,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          minWidth: 80,
        },
        amount: {
          color: GlobalStyles.colors.primary500,
          fontWeight: 'bold',
        },
      });
      
      /**
       * component/ExpensesOutput/ExpenseList.js
       */

    import React from 'react';
    import {FlatList, Text} from 'react-native';
    import ExpenseItem from './ExpenseItem';

    function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />;
    }

    function ExpensesList({expenses}) {
    return (
        <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
        />
    );
    }

    export default ExpensesList;

    /**
     * component/ExpensesOutput/ExpensesOutput.js
     */

     import React from 'react';
     import {View, Text, StyleSheet} from 'react-native';
     import {GlobalStyles} from '../../constants/styles';
     import ExpensesList from './ExpensesList';
     import ExpensesSummary from './ExpensesSummary';
     
     function ExpensesOutput({expenses, expensesPeriod}) {
       return (
         <View style={styles.container}>
           <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
           <ExpensesList expenses={expenses} />
         </View>
       );
     }
     
     export default ExpensesOutput;
     
     const styles = StyleSheet.create({
       container: {
         flex: 1,
         padding: 24,
         paddingHorizontal: 24,
         paddingTop: 24,
         paddingBottom: 0,
         backgroundColor: GlobalStyles.colors.primary700,
       },
     });
     
     /**
      * component/ExpensesOutput/ExpensesSummary.js
      */

      import React from 'react';
      import {View, Text, StyleSheet} from 'react-native';
      import { GlobalStyles } from '../../constants/styles';
      
      function ExpensesSummary({expenses, periodName}) {
        const expensesSum = expenses.reduce((sum, expense) => {
          return sum + expense.amount;
        }, 0);
        return (
          <View style={styles.container}>
            <Text style={styles.peroid}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
          </View>
        );
      }
      export default ExpensesSummary;
      
      const styles = StyleSheet.create({
        container: {
          padding: 8,
          backgroundColor: GlobalStyles.colors.primary50,
          borderRadius: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        peroid: {
          fontSize: 12,
          color: GlobalStyles.colors.primary400,
        },
        sum: {
          fontSize: 16,
          fontWeight: 'bold',
          color: GlobalStyles.colors.primary500,
        },
      });

      /**
       * component/ManageExpense/Expenseform.js
       */
       import React, {useState} from 'react';
       import {View, StyleSheet, Alert, Text} from 'react-native';
       import Input from './Input';
       import Button from '../UI/Button';
       import { GlobalStyles } from '../../constants/styles';
       
       function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValue}) {
         const [inputs, setInputs] = useState({
           amount: {
             value: defaultValue ? defaultValue.amount.toString() : '',
             isValid: true,
           },
           date: {
             value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : '',
             isValid: true,
           },
           description: {
             value: defaultValue ? defaultValue.description : '',
             isValid: true,
           },
         });
         function inputChangedHandler(inputIdentifier, enteredValue) {
           setInputs(curInputs => {
             return {
               ...curInputs,
               [inputIdentifier]: {value: enteredValue, isValid: true},
             };
           });
         }
         function submitHandler() {
           const expenseData = {
             amount: +inputs.amount.value,
             date: new Date(inputs.date.value),
             description: inputs.description.value,
           };
           const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
           const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
           const descriptionIsValid = expenseData.description.trim().length > 0;
       
           if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
             //Alert.alert('Invalid input', 'Please check your input value');
             setInputs(curInputs => {
               return {
                 amount: {value: curInputs.amount.value, isValid: amountIsValid},
                 date: {value: curInputs.date.value, isValid: dateIsValid},
                 description: {
                   value: curInputs.description.value,
                   isValid: descriptionIsValid,
                 },
               };
             });
             console.log("description is invalid");
             return;
           }
           onSubmit(expenseData);
         }
         const formIsInvalid =
           !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
         return (
           <View>
             <View style={styles.inputContainer}>
               <Input
                 label="Amount"
                 textInputConfig={{
                   keyboardType: 'decimal-pad',
                   onChangeText: inputChangedHandler.bind(this, 'amount'),
                   value: inputs.amount.value,
                 }}
                 style={styles.rowInput}
                 invalid={!inputs.amount.isValid}
               />
               <Input
                 label="Date"
                 textInputConfig={{
                   placeholder: 'YYYY-MM-DD',
                   maxLength: 10,
                   onChangeText: inputChangedHandler.bind(this, 'date'),
                   value: inputs.date.value,
                 }}
                 style={styles.rowInput}
                 invalid={!inputs.date.isValid}
               />
             </View>
             <Input
               label="Description"
               textInputConfig={{
                 multiline: true,
                 onChangeText: inputChangedHandler.bind(this, 'description'),
                 value: inputs.description.value,
               }}
               invalid={!inputs.description.isValid}
             />
             {formIsInvalid &&
               <Text style={styles.errorText}>Invalid input values - please check your entered data !</Text>}
             <View style={styles.buttons}>
               <Button style={styles.button} onPress={onCancel} mode="flat">
                 Cancel
               </Button>
               <Button style={styles.button} onPress={submitHandler}>
                 {submitButtonLabel}
               </Button>
             </View>
           </View>
         );
       }
       
       const styles = StyleSheet.create({
         inputContainer: {
           flexDirection: 'row',
           justifyContent: 'space-between',
         },
         rowInput: {
           flex: 1,
         },
         button: {
           minWidth: 120,
           marginHorizontal: 8,
         },
         buttons: {
           flexDirection: 'row',
           justifyContent: 'center',
           alignItems: 'center',
         },
         errorText: {
           textAlign: 'center',
           color: GlobalStyles.colors.error500,
           margin: 8,
         },
       });
       export default ExpenseForm;

       /**
        * Input.js
        */

        import React from 'react';
        import {Text, TextInput, View, StyleSheet} from 'react-native';
        import {GlobalStyles} from '../../constants/styles';
        
        function Input({label, textInputConfig, style, invalid}) {
          let inputStyles = [styles.input];
          if (textInputConfig && textInputConfig.multiline) {
            inputStyles.push(styles.inputMultiline);
          }
          if(invalid){
            inputStyles.push(styles.invalidInput);
          }
          return (
            <View style={[styles.inputContainer, style]}>
              <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
              <TextInput style={inputStyles} {...textInputConfig} />
            </View>
          );
        }
        
        const styles = StyleSheet.create({
          inputContainer: {
            marginHorizontal: 4,
            marginVertical: 16,
          },
          label: {
            fontSize: 12,
            color: GlobalStyles.colors.primary100,
            marginBottom: 4,
          },
          input: {
            backgroundColor: GlobalStyles.colors.primary100,
            color: GlobalStyles.colors.primary700,
            padding: 6,
            borderRadius: 6,
            fontSize: 18,
          },
          inputMultiline: {
            minHeight: 100,
            textAlignVertical: 'top',
          },
          invalidLabel: {
            color: GlobalStyles.colors.error500,
          },
          invalidInput: {
            backgroundColor: GlobalStyles.colors.error50,
          },
        });
        
        export default Input;
        
        /**
         * component/UI/Button.js
         */

         import React from 'react';
         import {Pressable, Text, View, StyleSheet} from 'react-native';
         import {GlobalStyles} from '../../constants/styles';
         
         function Button({children, onPress, mode, style}) {
           return (
             <View style={style}>
               <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                 <View style={[styles.button, mode === 'flat' && styles.flat]}>
                   <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                 </View>
               </Pressable>
             </View>
           );
         }
         
         export default Button;
         
         const styles = StyleSheet.create({
           button: {
             borderRadius: 4,
             padding: 8,
             backgroundColor: GlobalStyles.colors.primary500,
           },
           flat: {
             backgroundColor: 'transparent',
           },
           buttonText: {
             color: 'white',
             textAlign: 'center',
           },
           flatText: {
             color: GlobalStyles.colors.primary200,
           },
           pressed: {
             opacity: 0.75,
             backgroundColor: GlobalStyles.colors.primary100,
             borderRadius: 4,
           },
         });

         /**
          * component/UI/IconButton.js
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
           * util/date.js
           */

           export function getFormattedDate(date) {
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          }
          
          export function getDateMinusDays(date, days) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
          }
          

          /**
           * constants/styles.js
           */

           export const GlobalStyles = {
            colors: {
              primary50: '#e4d9fd',
              primary100: '#c6affc',
              primary200: '#a281f0',
              primary400: '#5721d4',
              primary500: '#3e04c3',
              primary700: '#2d0689',
              primary800: '#200364',
              accent500: '#f7bc0c',
              error50: '#fcc4e4',
              error500: '#9b095c',
              gray500: '#39324a',
              gray700: '#221c30',
            },
          };
          