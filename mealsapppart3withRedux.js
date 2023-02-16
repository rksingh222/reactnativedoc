/**
 * Redux Files
 * 
 */
/** npm install @reduxjs/toolkit*/

/**
 * store/redux/favorite.js
 */

 import {createSlice} from '@reduxjs/toolkit';

 export const favoriteSlice = createSlice({
   name: 'favorite',
   initialState: {
     ids: [],
   },
   reducers: {
     addFavorite: (state, action) => {
       state.ids.push(action.payload.id);
     },
     removeFavorite: (state, action) => {
       state.ids.splice(state.ids.indexOf(action.payload.id), 1);
     },
   },
 });
 
 export const addFavorite = favoriteSlice.actions.addFavorite;
 export const removeFavorite = favoriteSlice.actions.removeFavorite;
 export default favoriteSlice.reducer;

 
 /***
  * store/redux/store.js
  */

  import {configureStore} from '@reduxjs/toolkit';
  import favoriteReducer from './favorite';
  
  export const store = configureStore({
    reducer: {
      favoriteMeals: favoriteReducer,
    },
  });
  

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
import {StyleSheet, View, Button} from 'react-native';
import CategoryScreen from './screens/CategoryScreen';
import MealsOverViewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FavoriteScreen from './screens/FavoriteScreen';
//import FavoritesContextProvider from './store/context/favorites-context';
import {store} from './store/redux/store';
import {Provider} from 'react-redux';

//import {LinearGradient} from 'expo-linear-gradient';

//Nesting Navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#351401'},
        headerTintColor: '#ffffff',
        sceneContainerStyle: {backgroundColor: '#3f2f25'},
        drawerContentStyle: {backgroundColor: '#351401'},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1',
      }}>
      <Drawer.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          title: 'All Categories',
          //expo vector icons
          //drawerIcon: ({color, size}) =>(<Ionicons name='list' color={color} size={size} />),
        }}
      />
      <Drawer.Screen name="Favorites" component={FavoriteScreen} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#351401'},
            headerTintColor: '#ffffff',
            contentStyle: {backgroundColor: '#3f2f25'},
          }}>
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              //title: 'ALL Categories',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverViewScreen}
            /* this is direct approach to access the route element and display the route in the Meals Screen*/
            //options={({route, navigation}) => {
            // const catId = route.params.categoryId;
            // return {
            // title: catId,
            // };
            //}}
          />
          <Stack.Screen
            name="MealsDetail"
            component={MealDetailScreen}
            options={{
              /**
            * placing a button here is not a good option because we want to access the MealDetailScreen
            * component variables but this is also an option to create a header Right button
            */
              //headerRight: () => {
              //  return <Button title="tap me" />;
              //},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25,
  },
});

export default App;

/**
 * CategoryScreen.js
 */

 import React from 'react';
 import {FlatList} from 'react-native';
 import {CATEGORIES} from '../data/dummy-data';
 import CategoryGridItem from '../components/CategoryGridItem';
 
 function CategoryScreen({navigation}) {
   function renderCategoryItem(itemData) {
     function pressHandler() {
       navigation.navigate('MealsOverview', {
         categoryId: itemData.item.id,
       });
     }
     return (
       <CategoryGridItem
         title={itemData.item.title}
         onPress={pressHandler}
         color={itemData.item.color}
       />
     );
   }
 
   return (
     <FlatList
       data={CATEGORIES}
       keyExtractor={item => item.id}
       renderItem={renderCategoryItem}
       numColumns={2}
       key={'#'}
     />
   );
 }
 
 export default CategoryScreen;

 /**
  * MealsOverviewScreen.js
  */

  import {useEffect, useLayoutEffect} from 'react';
  import React from 'react';
  import {Text, View, StyleSheet, FlatList} from 'react-native';
  import MealItem from '../components/MealItem';
  import {CATEGORIES, MEALS} from '../data/dummy-data';
  import MealsList from '../components/MealsList';
  
  /**
   * indexOf returns 0 or greater than 0 if it finds the index otherwise returns -1 that is why 
   * here the logic is this
   * 
   * to send multiple props 
   * we can create an object with text value pair
   * and then using {and spread operator } i.e {...mealItemProps} we send the props and not using props in the called function 
   * but object destructuring
   * we can also use props
   */
  
  /**
   * directly setting the setOptions in the component is a wrong way to do it 
   * instead you should use useEffect
   * 
   * useEffect allows us to process the sideEffects
   * and setting option is  a side Effect
   * 
   * In useEffect we say a temporary problem that animation is quite different
   * 
   * this happens because useEffect function gets called after the component function which is 
   * MealOverViewScreen is rendered or executed for the first time
   * it is set after the screen has been loaded
   * its not set while the animation is in progress
   * 
   * 
   * this can be fixed by useLayoutEffect
   * this works simultaneously with the component is rendered not after the component is rendered
   * so it behaves as if the title is updated when the component is rendered
   * 
   */
  
  function MealsOverViewScreen({route, navigation}) {
    const catId = route.params.categoryId;
    const displayMealItem = MEALS.filter (mealItem => {
      return mealItem.categoryIds.indexOf (catId) >= 0;
    });
  
    useLayoutEffect (
      () => {
        const categoryTitle = CATEGORIES.find (category => category.id === catId)
          .title;
        navigation.setOptions ({
          title: categoryTitle,
        });
      },
      [catId, navigation]
    );
    return <MealsList displayMealItem={displayMealItem} />;
  }
  
  export default MealsOverViewScreen;

  /**
   * MealDetailScreen.js
   * 
   */

   import React from 'react';
   import {useLayoutEffect, useContext} from 'react';
   import {View, Image, Text, StyleSheet, ScrollView, Button} from 'react-native';
   import List from '../components/List';
   import MealDetails from '../components/MealDetails';
   import {MEALS} from '../data/dummy-data';
   
   import {useSelector, useDispatch} from 'react-redux';
   import {addFavorite, removeFavorite} from '../store/redux/favorite';
   //import {FavoritesContext} from '../store/context/favorites-context';
   
   function MealDetailScreen({route, navigation}) {
     const mealId = route.params.mealId;
     const selectedMeal = MEALS.find(meal => meal.id === mealId);
     //const favoriteMealCtx = useContext(FavoritesContext);
     const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
     const dispatch = useDispatch();
   
     const mealIsFavorite = favoriteMealIds.includes(mealId);
   
     function changeFavoriteStatusHandler() {
       if (mealIsFavorite) {
         dispatch(removeFavorite({id: mealId}));
       } else {
         dispatch(addFavorite({id: mealId}));
       }
     }
   
     useLayoutEffect (
       () => {
         navigation.setOptions ({
           headerRight: () => {
             return (
               <Button
                 title="tap me"
                 color={mealIsFavorite ? '#00ff00' : '#ff0000'}
                 onPress={changeFavoriteStatusHandler}
               />
             );
           },
         });
       },
       [navigation, changeFavoriteStatusHandler]
     );
     return (
       <ScrollView style={styles.rootContainer}>
         <View>
           <Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
           <Text style={styles.title}>{selectedMeal.title}</Text>
           <MealDetails
             duration={selectedMeal.duration}
             complexity={selectedMeal.complexity}
             affordability={selectedMeal.affordability}
             textStyle={styles.detailText}
           />
           <View style={styles.listOuterContainer}>
             <View style={styles.listContainer}>
               <View style={styles.subtitleContainer}>
                 <Text style={styles.subtitle}>Ingredients</Text>
               </View>
               <List data={selectedMeal.ingredients} />
               <View style={styles.subtitleContainer}>
                 <Text style={styles.subtitle}>Steps</Text>
               </View>
               <List data={selectedMeal.steps} />
             </View>
           </View>
         </View>
       </ScrollView>
     );
   }
   
   const styles = StyleSheet.create({
     rootContainer: {
       marginBottom: 32,
     },
     image: {
       width: '100%',
       height: 350,
     },
     title: {
       fontWeight: 'bold',
       fontSize: 24,
       margin: 8,
       textAlign: 'center',
       color: '#ffffff',
     },
     detailText: {
       color: '#ffffff',
     },
     //We can not give borders to the text so we use View
     subtitle: {
       color: '#e2b497',
       fontSize: 18,
       fontWeight: 'bold',
       textAlign: 'center',
     },
     subtitleContainer: {
       padding: 6,
       borderBottomColor: '#e2b497',
       borderBottomWidth: 2,
       marginHorizontal: 24,
       marginVertical: 4,
     },
     listContainer: {
       width: '80%',
       borderWidth: 2,
       borderColor: 'white',
     },
     listOuterContainer: {
       alignItems: 'center',
     },
   });
   
   export default MealDetailScreen;
   

   /**
    * FavoriteScreen.js
    */

    import {Text, View, StyleSheet} from 'react-native';

    import {useContext} from 'react';
    //import {FavoritesContext} from '../store/context/favorites-context';
    import {MEALS} from '../data/dummy-data';
    import MealsList from '../components/MealsList';
    import {useSelector} from 'react-redux';
    
    function FavoriteScreen() {
      //const favoriteMealsCtx = useContext(FavoritesContext);
      const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
      const favoriteMeals = MEALS.filter(meal => favoriteMealIds.includes(meal.id));
      if (favoriteMeals.length === 0) {
        return (
          <View style={styles.rootContainer}>
            <Text style={styles.text}>You have no favorite meals yet.</Text>
          </View>
        );
      }
      return <MealsList displayMealItem={favoriteMeals} />;
    }
    const styles = StyleSheet.create ({
      rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
    });
    export default FavoriteScreen;
/**
 * CategoryGridItem.js 
 * */    

/**
 * Important Note 
 * when outerContainer is flex 1 it occupies the space which it gets
 * but as we have inserted pressable before a view
 * pressable currently has zero height and width 
 * so when a view wants a flex : 1 i.e the height and width since its parent is pressable
 * which is having zero so it does not show anything 
 * 
 * to fix this we need to give pressable a flex : 1
 */

/**
 * to get shadow we give four properties
 * however after it does not add the shadow
 * to make the shadow workd
 * we need to give background color of white 
 * 
 */

 import React from 'react';
 import {View, Pressable, Text, StyleSheet, Platform} from 'react-native';
 function CategoryGridItem({title, color, onPress}) {
   return (
     <View style={styles.root}>
       <View style={[styles.gridItemContainer]}>
         <Pressable
           android_ripple={{color: '#ccc'}}
           style={({pressed}) => [
             styles.button,
             pressed ? styles.buttonPressed : null,
           ]}
           onPress={onPress}>
           <View style={[styles.innerContainer, {backgroundColor: color}]}>
             <Text style={styles.title}>{title}</Text>
           </View>
         </Pressable>
       </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   root: {
     flex: 1,
     backgroundColor: '#24180f',
   },
   gridItemContainer: {
     flex: 1,
     height: 150,
     margin: 16,
     elevation: 4,
     backgroundColor: 'white',
     shadowColor: 'black',
     shadowOffset: {width: 0, height: 2},
     shadowOpacity: 0.25,
     shadowRadius: 6,
     borderRadius: 8,
     overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
   },
   innerContainer: {
     flex: 1,
     padding: 16,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 8,
   },
   buttonPressed: {
     opacity: 0.5,
   },
   button: {
     flex: 1,
   },
   title: {
     fontWeight: 'bold',
     fontSize: 18,
   },
 });
 export default CategoryGridItem;

 
 /**
  * List.js
  */

  import React from 'react';
  import {View, Text, StyleSheet} from 'react-native';
  function List({data}) {
    return data.map(dataPoint => (
      <View style={styles.listItem} key={dataPoint}>
        <Text style={styles.itemText}>{dataPoint}</Text>
      </View>
    ));
  }
  
  const styles = StyleSheet.create({
    listItem: {
      borderRadius: 6,
      marginVertical: 4,
      marginHorizontal: 24,
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: '#e2b497',
    },
    itemText: {
      color: '#351401',
      textAlign: 'center',
    },
  });
  
  export default List;

  /**
   * MealDetails.js
   */

   import React from 'react';
   import {View, Text, StyleSheet} from 'react-native';
   function MealDetails({duration, complexity, affordability, style, textStyle}) {
     return (
       <View style={[styles.details, style]}>
         <Text style={[styles.itemDetail, textStyle]}>{duration}</Text>
         <Text style={[styles.itemDetail, textStyle]}>{complexity}</Text>
         <Text style={[styles.itemDetail, textStyle]}>{affordability}</Text>
       </View>
     );
   }
   
   const styles = StyleSheet.create({
     details: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       padding: 8,
     },
     itemDetail: {
       marginHorizontal: 8,
       fontSize: 16,
     },
   });
   export default MealDetails;


   /**
    * MealItem.js
    */

    import React from 'react';
    import {useNavigation} from '@react-navigation/native';
    import {View, Text, Image, StyleSheet, Pressable, Platform} from 'react-native';
    import MealDetails from './MealDetails';
    function MealItem({id, title, imageUrl, duration, complexity, affordability}) {
      const navigation = useNavigation();
      function selectMealItemHandler() {
        navigation.navigate('MealsDetail', {
          mealId: id,
        });
      }
      return (
        <View style={styles.mealItem}>
          <View style={styles.innerContainer}>
            <Pressable onPress={selectMealItemHandler}>
              <View>
                <Image source={{uri: imageUrl}} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
              </View>
              <MealDetails
                duration={duration}
                affordability={affordability}
                complexity={complexity}
              />
            </Pressable>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      image: {
        width: '100%',
        height: 200,
      },
      innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
      },
      title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
      },
      mealItem: {
        margin: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.35,
        shadowRadius: 6,
        shadowColor: 'black',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      },
      details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      },
      itemDetail: {
        marginHorizontal: 8,
        fontSize: 16,
      },
    });
    export default MealItem;

    /**
     * MealsList.js
     */
    
     import React from 'react';
     import {Text, View, StyleSheet, FlatList} from 'react-native';
     import MealItem from './MealItem';
     
     function MealsList({displayMealItem}) {
       function renderMealItem(itemData) {
         const item = itemData.item;
     
         const mealItemProps = {
           id: item.id,
           title: item.title,
           imageUrl: item.imageUrl,
           affordability: item.affordability,
           complexity: item.complexity,
           duration: item.duration,
         };
     
         return <MealItem {...mealItemProps} />;
       }
       return (
         <View style={styles.container}>
           <FlatList
             data={displayMealItem}
             keyExtractor={item => item.id}
             renderItem={renderMealItem}
           />
         </View>
       );
     }
     
     const styles = StyleSheet.create({
       container: {
         flex: 1,
         padding: 16,
       },
     });
     
     export default MealsList;
     
