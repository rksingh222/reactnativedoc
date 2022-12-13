/**
 * if in multiple screen we have a common option styles
 * 
 * instead of using options we use screenOptions in Stack.Navigator instead of Stack.Screen
 */

/**
 * dummy data can be copied from here 
 * 
 * https://github.com/academind/react-native-practical-guide-code/blob/06-navigation/extra-files/models.zip
 * 
 * https://github.com/academind/react-native-practical-guide-code/blob/06-navigation/extra-files/dummy-data.js
 *
 * 
 * I will also paste the code here
 */


/**
 * dummy-data.js
 */

 import Category from '../models/category';
 import Meal from '../models/meal';
 
 export const CATEGORIES = [
   new Category('c1', 'Italian', '#f5428d'),
   new Category('c2', 'Quick & Easy', '#f54242'),
   new Category('c3', 'Hamburgers', '#f5a442'),
   new Category('c4', 'German', '#f5d142'),
   new Category('c5', 'Light & Lovely', '#368dff'),
   new Category('c6', 'Exotic', '#41d95d'),
   new Category('c7', 'Breakfast', '#9eecff'),
   new Category('c8', 'Asian', '#b9ffb0'),
   new Category('c9', 'French', '#ffc7ff'),
   new Category('c10', 'Summer', '#47fced')
 ];
 
 export const MEALS = [
   new Meal(
     'm1',
     ['c1', 'c2'],
     'Spaghetti with Tomato Sauce',
     'affordable',
     'simple',
     'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
     20,
     [
       '4 Tomatoes',
       '1 Tablespoon of Olive Oil',
       '1 Onion',
       '250g Spaghetti',
       'Spices',
       'Cheese (optional)'
     ],
     [
       'Cut the tomatoes and the onion into small pieces.',
       'Boil some water - add salt to it once it boils.',
       'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
       'In the meantime, heaten up some olive oil and add the cut onion.',
       'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
       'The sauce will be done once the spaghetti are.',
       'Feel free to add some cheese on top of the finished dish.'
     ],
     false,
     true,
     true,
     true
   ),
 
   new Meal(
     'm2',
     ['c2'],
     'Toast Hawaii',
     'affordable',
     'simple',
     'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg',
     10,
     [
       '1 Slice White Bread',
       '1 Slice Ham',
       '1 Slice Pineapple',
       '1-2 Slices of Cheese',
       'Butter'
     ],
     [
       'Butter one side of the white bread',
       'Layer ham, the pineapple and cheese on the white bread',
       'Bake the toast for round about 10 minutes in the oven at 200°C'
     ],
     false,
     false,
     false,
     false
   ),
 
   new Meal(
     'm3',
     ['c3'],
     'Classic Hamburger',
     'pricey',
     'simple',
     'https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg',
     45,
     [
       '300g Cattle Hack',
       '1 Tomato',
       '1 Cucumber',
       '1 Onion',
       'Ketchup',
       '2 Burger Buns'
     ],
     [
       'Form 2 patties',
       'Fry the patties for c. 4 minutes on each side',
       'Quickly fry the buns for c. 1 minute on each side',
       'Bruch buns with ketchup',
       'Serve burger with tomato, cucumber and onion'
     ],
     false,
     false,
     false,
     true
   ),
 
   new Meal(
     'm4',
     ['c4'],
     'Wiener Schnitzel',
     'luxurious',
     'challenging',
     'https://cdn.pixabay.com/photo/2018/03/31/19/29/schnitzel-3279045_1280.jpg',
     60,
     [
       '8 Veal Cutlets',
       '4 Eggs',
       '200g Bread Crumbs',
       '100g Flour',
       '300ml Butter',
       '100g Vegetable Oil',
       'Salt',
       'Lemon Slices'
     ],
     [
       'Tenderize the veal to about 2–4mm, and salt on both sides.',
       'On a flat plate, stir the eggs briefly with a fork.',
       'Lightly coat the cutlets in flour then dip into the egg, and finally, coat in breadcrumbs.',
       'Heat the butter and oil in a large pan (allow the fat to get very hot) and fry the schnitzels until golden brown on both sides.',
       'Make sure to toss the pan regularly so that the schnitzels are surrounded by oil and the crumbing becomes ‘fluffy’.',
       'Remove, and drain on kitchen paper. Fry the parsley in the remaining oil and drain.',
       'Place the schnitzels on awarmed plate and serve garnishedwith parsley and slices of lemon.'
     ],
     false,
     false,
     false,
     false
   ),
 
   new Meal(
     'm5',
     ['c2', 'c5', 'c10'],
     'Salad with Smoked Salmon',
     'luxurious',
     'simple',
     'https://cdn.pixabay.com/photo/2016/10/25/13/29/smoked-salmon-salad-1768890_1280.jpg',
     15,
     [
       'Arugula',
       "Lamb's Lettuce",
       'Parsley',
       'Fennel',
       '200g Smoked Salmon',
       'Mustard',
       'Balsamic Vinegar',
       'Olive Oil',
       'Salt and Pepper'
     ],
     [
       'Wash and cut salad and herbs',
       'Dice the salmon',
       'Process mustard, vinegar and olive oil into a dessing',
       'Prepare the salad',
       'Add salmon cubes and dressing'
     ],
     true,
     false,
     true,
     true
   ),
 
   new Meal(
     'm6',
     ['c6', 'c10'],
     'Delicious Orange Mousse',
     'affordable',
     'hard',
     'https://cdn.pixabay.com/photo/2017/05/01/05/18/pastry-2274750_1280.jpg',
     240,
     [
       '4 Sheets of Gelatine',
       '150ml Orange Juice',
       '80g Sugar',
       '300g Yoghurt',
       '200g Cream',
       'Orange Peel'
     ],
     [
       'Dissolve gelatine in pot',
       'Add orange juice and sugar',
       'Take pot off the stove',
       'Add 2 tablespoons of yoghurt',
       'Stir gelatin under remaining yoghurt',
       'Cool everything down in the refrigerator',
       'Whip the cream and lift it under die orange mass',
       'Cool down again for at least 4 hours',
       'Serve with orange peel'
     ],
     true,
     false,
     true,
     false
   ),
 
   new Meal(
     'm7',
     ['c7'],
     'Pancakes',
     'affordable',
     'simple',
     'https://cdn.pixabay.com/photo/2018/07/10/21/23/pancake-3529653_1280.jpg',
     20,
     [
       '1 1/2 Cups all-purpose Flour',
       '3 1/2 Teaspoons Baking Powder',
       '1 Teaspoon Salt',
       '1 Tablespoon White Sugar',
       '1 1/4 cups Milk',
       '1 Egg',
       '3 Tablespoons Butter, melted'
     ],
     [
       'In a large bowl, sift together the flour, baking powder, salt and sugar.',
       'Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.',
       'Heat a lightly oiled griddle or frying pan over medium high heat.',
       'Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.'
     ],
     true,
     false,
     true,
     false
   ),
 
   new Meal(
     'm8',
     ['c8'],
     'Creamy Indian Chicken Curry',
     'pricey',
     'challenging',
     'https://cdn.pixabay.com/photo/2018/06/18/16/05/indian-food-3482749_1280.jpg',
     35,
     [
       '4 Chicken Breasts',
       '1 Onion',
       '2 Cloves of Garlic',
       '1 Piece of Ginger',
       '4 Tablespoons Almonds',
       '1 Teaspoon Cayenne Pepper',
       '500ml Coconut Milk'
     ],
     [
       'Slice and fry the chicken breast',
       'Process onion, garlic and ginger into paste and sauté everything',
       'Add spices and stir fry',
       'Add chicken breast + 250ml of water and cook everything for 10 minutes',
       'Add coconut milk',
       'Serve with rice'
     ],
     true,
     false,
     false,
     true
   ),
 
   new Meal(
     'm9',
     ['c9'],
     'Chocolate Souffle',
     'affordable',
     'hard',
     'https://cdn.pixabay.com/photo/2014/08/07/21/07/souffle-412785_1280.jpg',
     45,
     [
       '1 Teaspoon melted Butter',
       '2 Tablespoons white Sugar',
       '2 Ounces 70% dark Chocolate, broken into pieces',
       '1 Tablespoon Butter',
       '1 Tablespoon all-purpose Flour',
       '4 1/3 tablespoons cold Milk',
       '1 Pinch Salt',
       '1 Pinch Cayenne Pepper',
       '1 Large Egg Yolk',
       '2 Large Egg Whites',
       '1 Pinch Cream of Tartar',
       '1 Tablespoon white Sugar'
     ],
     [
       'Preheat oven to 190°C. Line a rimmed baking sheet with parchment paper.',
       'Brush bottom and sides of 2 ramekins lightly with 1 teaspoon melted butter; cover bottom and sides right up to the rim.',
       'Add 1 tablespoon white sugar to ramekins. Rotate ramekins until sugar coats all surfaces.',
       'Place chocolate pieces in a metal mixing bowl.',
       'Place bowl over a pan of about 3 cups hot water over low heat.',
       'Melt 1 tablespoon butter in a skillet over medium heat. Sprinkle in flour. Whisk until flour is incorporated into butter and mixture thickens.',
       'Whisk in cold milk until mixture becomes smooth and thickens. Transfer mixture to bowl with melted chocolate.',
       'Add salt and cayenne pepper. Mix together thoroughly. Add egg yolk and mix to combine.',
       'Leave bowl above the hot (not simmering) water to keep chocolate warm while you whip the egg whites.',
       'Place 2 egg whites in a mixing bowl; add cream of tartar. Whisk until mixture begins to thicken and a drizzle from the whisk stays on the surface about 1 second before disappearing into the mix.',
       'Add 1/3 of sugar and whisk in. Whisk in a bit more sugar about 15 seconds.',
       'whisk in the rest of the sugar. Continue whisking until mixture is about as thick as shaving cream and holds soft peaks, 3 to 5 minutes.',
       'Transfer a little less than half of egg whites to chocolate.',
       'Mix until egg whites are thoroughly incorporated into the chocolate.',
       'Add the rest of the egg whites; gently fold into the chocolate with a spatula, lifting from the bottom and folding over.',
       'Stop mixing after the egg white disappears. Divide mixture between 2 prepared ramekins. Place ramekins on prepared baking sheet.',
       'Bake in preheated oven until scuffles are puffed and have risen above the top of the rims, 12 to 15 minutes.'
     ],
     true,
     false,
     true,
     false
   ),
   new Meal(
     'm10',
     ['c2', 'c5', 'c10'],
     'Asparagus Salad with Cherry Tomatoes',
     'luxurious',
     'simple',
     'https://cdn.pixabay.com/photo/2018/04/09/18/26/asparagus-3304997_1280.jpg',
     30,
     [
       'White and Green Asparagus',
       '30g Pine Nuts',
       '300g Cherry Tomatoes',
       'Salad',
       'Salt, Pepper and Olive Oil'
     ],
     [
       'Wash, peel and cut the asparagus',
       'Cook in salted water',
       'Salt and pepper the asparagus',
       'Roast the pine nuts',
       'Halve the tomatoes',
       'Mix with asparagus, salad and dressing',
       'Serve with Baguette'
     ],
     true,
     true,
     true,
     true
   )
 ];

 /***
  * category.js
  */

  class Category {
    constructor(id, title, color) {
      this.id = id;
      this.title = title;
      this.color = color;
    }
  }
  
  export default Category;
  
  /***
   * meal.js
   */
   class Meal {
    constructor(
      id,
      categoryIds,
      title,
      affordability,
      complexity,
      imageUrl,
      duration,
      ingredients,
      steps,
      isGlutenFree,
      isVegan,
      isVegetarian,
      isLactoseFree
    ) {
      this.id = id;
      this.categoryIds = categoryIds;
      this.title = title;
      this.imageUrl = imageUrl;
      this.ingredients = ingredients;
      this.steps = steps;
      this.duration = duration;
      this.complexity = complexity;
      this.affordability = affordability;
      this.isGlutenFree = isGlutenFree;
      this.isVegan = isVegan;
      this.isVegetarian = isVegetarian;
      this.isLactoseFree = isLactoseFree;
    }
  }
  
  export default Meal;
  

/**
 * App.js
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
 
 //import {LinearGradient} from 'expo-linear-gradient';
 
/***
*
* you will get a problem regarding reanimated when using drawer
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


 //Nesting Navigator
 const Stack = createNativeStackNavigator();
 const Drawer = createDrawerNavigator();
 function DrawerNavigator () {
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
 

 /***
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
   * CategoryGridItem.js
   */

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
 * MealsOverviewScreen.js
 */

 import {useEffect, useLayoutEffect} from 'react';
 import React from 'react';
 import {Text, View, StyleSheet, FlatList} from 'react-native';
 import MealItem from '../components/MealItem';
 import {CATEGORIES, MEALS} from '../data/dummy-data';
 
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
   const displayMealItem = MEALS.filter(mealItem => {
     return mealItem.categoryIds.indexOf(catId) >= 0;
   });
 
   useLayoutEffect(() => {
       const categoryTitle = CATEGORIES.find(category => category.id === catId).title;
       navigation.setOptions({
         title: categoryTitle,
       });
     },[catId, navigation]);
 
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
 export default MealsOverViewScreen;
 
 /**
  * MealItem.js
  * 
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
  
  const styles = StyleSheet.create ({
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
  
  /***
   * MealDetailScreen.js
   */

   import React from 'react';
   import {useLayoutEffect} from 'react';
   import {View, Image, Text, StyleSheet, ScrollView, Button} from 'react-native';
   import List from '../components/List';
   import MealDetails from '../components/MealDetails';
   import {MEALS} from '../data/dummy-data';
   
   function MealDetailScreen({route, navigation}) {
     const mealId = route.params.mealId;
     const selectedMeal = MEALS.find(meal => meal.id === mealId);
     function headerButtonPressHandler() {
       console.log ('pressed');
     }
   
     useLayoutEffect(
       () => {
         navigation.setOptions({
           headerRight: () => {
             return <Button title="tap me" onPress={headerButtonPressHandler} />;
           },
         });
       },
       [navigation, headerButtonPressHandler]
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
   
   const styles = StyleSheet.create ({
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
    * MealDetails.js
    * 
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

    /***
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
     * IconButton.js
     */
     /** only if you are using expo */

    import React from 'react';
    import {Pressable, StyleSheet} from 'react-native';
    import {Ionicons} from '@expo/vector-icons';
    function IconButton({onPress}) {
    return (
        <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <Ionicons name="star" size={24} color="white" />
        </Pressable>
    );
    }

    const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    });
    export default IconButton;
