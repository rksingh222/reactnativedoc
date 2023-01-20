/** camera , map , implementation */

/**
 * App.js
 */


 import React, {useEffect, useState} from 'react';
 import {StyleSheet, Text, View} from 'react-native';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import AllPlaces from './screens/AllPlaces';
 import AddPlace from './screens/AddPlace';
 import IconButton from './componentss/ui/IconButton';
 import {GlobalStyles} from './constants/styles';
 import {Colors, colors} from './constant/colors';
 import Map from './components/Places/Map';
 import {init} from './util/database';
 import PlaceDetails from './screens/PlaceDetails';
 /**
  * why after navigtaion => we are giving ()
  * 
  * because we are returning in first case i.e in options
  * 
  * an object with {}
  * 
  * in the second case with headerRight after => we are using () because
  * 
  * 
  * we are returning an <IconButton> so we need to place closing and ending ()
  */
 const Stack = createNativeStackNavigator ();
 
 export default function App () {
   const [dbInitialized, setDbInitialized] = useState (false);
   useEffect (() => {
     init ()
       .then (() => {
         setDbInitialized (true);
       })
       .catch (err => {
         console.log (err);
       });
   }, []);
 
   if (!dbInitialized) {
     return;
   }
 
   return (
     <NavigationContainer>
       <Stack.Navigator
         screenOptions={{
           headerStyle: {backgroundColor: Colors.primary500},
           headerTintColor: Colors.gray700,
           contentStyle: {backgroundColor: Colors.gray700},
         }}>
         <Stack.Screen
           name="AllPlaces"
           component={AllPlaces}
           options={({navigation}) => ({
             headerRight: () => (
               <IconButton
                 text="add"
                 textColor={Colors.gray700}
                 onPress={() => navigation.navigate('AddPlace')}
               />
             ),
           })}
         />
         <Stack.Screen name="AddPlace" component={AddPlace} />
         <Stack.Screen name="Map" component={Map} />
         <Stack.Screen
           name="PlaceDetails"
           component={PlaceDetails}
           options={{title: 'Loading Place ....'}}
         />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
 

 /**
  * database.js
  */


/**
 *   
 *   npm install --save react-native-sqlite-storage
 * 
 *   npx pod-install ios
 */

import SQLite from 'react-native-sqlite-storage';
import Place from '../models/place';

const database = SQLite.openDatabase({name: 'places.db', location: 'default'});



export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places(
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
        [],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri,address,lat,lng)
         VALUES (?, ?, ?, ?, ?)`,
        [place.title, place.imageUri, place.address, place.lat, place.lng],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          //console.log(result.rows._array);
          console.log('testpass');
          console.log('results :' + JSON.stringify(result));
          console.log(result);
          const places = [];
          for (let i = 0; i < result.rows.length; ++i) {
            console.log('hello');
            console.log(result.rows.item(i));
            places.push(new Place(result.rows.item(i).title, 
            result.rows.item(i).imageUri, {address: result.rows.item(i).address,
              lat:result.rows.item(i).lat,
              lat:result.rows.item(i).lng},result.rows.item(i).id));
            //places.push(new Place(result.rows.item(i).address,result.rows.item(i)))
          }
          resolve(places);
        },
        (_, error) => {
          console.log('testfail');
          reject(error);
        },
      );
    });
  });
  return promise;
}

// on success it will return two methods
//_ we get some passed argument from it and we don't need it then in javascript we use _
export function fetchPlaceDetails(id) {
  console.log("id");
  console.log(id);
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx)=> {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_,result)=> {
          const dbPlace = result.rows.item(0);
          console.log("fetched data");
          console.log(result.rows.item(0));
          console.log(result);
          const place = new Place(dbPlace.title, dbPlace.imageUri, {address:dbPlace.address, lat: dbPlace.lat, lng: dbPlace.lng},dbPlace.id);
          resolve(place);
        },
        (_,error)=> {
          reject(error);
        }
      );
    });
  });
  return promise;
}

/**
 * screens/AddPlace.js
 */

 import React from 'react';
 import PlaceForm from '../components/Places/PlaceForm';
 import { insertPlace } from '../util/database';
 
 function AddPlace({navigation}) {
    function createPlaceHandler(place) {
     console.log('place data');
     console.log(place.title);
     console.log(place.imageUri);
     console.log(place.address);
     console.log(place.lat);
     console.log(place.lng);
     //await insertPlace(place);
     navigation.navigate("AllPlaces", {place: place})
   }
   return <PlaceForm onCreatePlace={createPlaceHandler} />;
 }
 
 export default AddPlace;

 /**
  * screens/AllPlaces.js
  */

 /**
 * import PlacesList  from '../components/Places/PlacesList';
 * import { useIsFocused } from '@react-navigation/native';
 * 
 * function AllPlaces({route}){
 * 
 * const [loadedPlaces, setLoadedPlaces] = useState([]);
 * 
 * const isFocused = useIsFocused(); 
 * 
 * useEffect(() => {
 * async function loadPlaces(){
 * await fetchPlaces();
 * }
 * 
 * //route.params is not required
 * 
 * if(isFocused && route.params){
 * loadPlaces();
 * setLoadedPlaces((curPlaces)=> [...curPlaces, route.params.place]);
 * }
 * }, [isFocused]);
 * }
 * 
 */

import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import PlacesList from '../components/Places/PlacesList';
import {fetchPlaces} from '../util/database';

function AllPlaces({route}) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(
    () => {
      async function loadPlaces() {
        const places = await fetchPlaces(); 
        setLoadedPlaces(places);    
      }
      if(isFocused){
        loadPlaces();
      }
    },
    [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}
export default AllPlaces;


/**
 * screens/PlaceDetails.js
 */

 import React, { useEffect, useState } from 'react';
 import {ScrollView, Image, View, Text, StyleSheet} from 'react-native';
 import IconButton from '../componentss/ui/IconButton';
 import {Colors} from '../constant/colors';
 import { fetchPlaceDetails } from '../util/database';
 
 function PlaceDetails({route, navigation}) {
 
   const [fetchedPlace, setFetchedPlace] = useState();
 
   function showOnMapHandler() {
     navigation.navigate("Map");
   }
   const selectedPlaceId = route.params.placeId;
 
   useEffect(()=>{
     //use selectedPlaceId to fetch data for a single place
     async function loadPlaceData() {
       const place = await fetchPlaceDetails(selectedPlaceId);
       setFetchedPlace(place);
       navigation.setOptions({
         title: place.title,
       });
     }
     loadPlaceData();
   }, [selectedPlaceId]);
 
   if(!fetchedPlace){
     return (
       <View style={styles.fallback}>
         <Text>Loading place data...</Text>
       </View>
     );
   }
 
   return (
     <ScrollView>
       <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/2825578/pexels-photo-2825578.jpeg'}}/>
       <View style={styles.locationContainer}>
         <View style={styles.addressContainer}>
           <Text style={styles.address}>{fetchedPlace.address}</Text>
         </View>
         <IconButton
           text="View on map"
           textColor={Colors.primary400}
           onPress={showOnMapHandler}
         />
       </View>
     </ScrollView>
   );
 }
 
 const styles = StyleSheet.create({
   fallback: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   screen: {
     alignItems: 'center',
   },
   image: {
     height: '35%',
     minHeight: 300,
     width: '100%',
   },
   locationContainer: {
     justifyContent: 'center',
     alignItems: 'center',
   },
   addressContainer: {
     padding: 20,
   },
   address: {
     color: Colors.primary500,
     textAlign: 'center',
     fontWeight: 'bold',
     fontSize: 16,
   },
 });
 export default PlaceDetails;
 
 /**
  * screens/Map.js
  */


/**
 * //we are getting lat and lng from placedetails screen
 * 
 * const initialLocation = route.params && {
 *  lat : route.params.initialLat,
 *  lng : route.params.initialLng,
 * }
 * 
 * //if we get the value then it will be defined otherwise it will be empty
 * const [selectedLocation, setSelectedLocation] = useState(initialLocation);
 * 
 * const region = {
 *  latitude : initialLocation ? initialLocation.lag: 37.78,
 * longitude: initialLocation ? initialLocation.lng: -122.4324,
 * latitudeDelta: 0.0922,
 * longitudeDelta: 0.0421,
 * }
 * 
 * function selectedLocationHandler(event) {
 * if(!initialLocation){
 * return; 
 * }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({lat: lat, lng: lng});
  }
 * 
 * //also if we have initial location we cannot save it its read only
 * 
 * useLayoutEffect(
 *  () => {
 *     if(initialLocation){
 *      return;
 *     }
 *     navigation.setOptions({
 *       headerRight: () => (
 *         <IconButton
 *           text="save"
 *           textColor={Colors.primary200}
 *           onPress={savePickedLocationHandler}
 *         />
 *       ),
 *     });
 *   },
 *   [navigation, savePickedLocationHandler]
 * );
 */

import React, {useCallback, useLayoutEffect, useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import IconButton from '../../componentss/ui/IconButton';
import {Colors} from '../../constant/colors';
function Map({navigation}) {
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectedLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({lat: lat, lng: lng});
  }

  /**
   * wrap arrow function which is savePickedLocationHandler  to useCallback
   * 
   * hook imported from react 
   * 
   * which helps us ensure that a function defined inside
   * 
   * of a component is not recreated unnecessarily
   * 
   * whenever the navigation prop or the selectedlocation
   * 
   * state value changes this function will be recreated
   * 
   * it will help in stoping infinite loop
   * or rerendering again
   * 
   */
  const savePickedLocationHandler = useCallback(()=> {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  /**
   * since we are using savePickedLocationHandler in useLayOutEffect 
   * they can be multiple rerendering of that function
   * that will cause the function to re render or infinite loop to avoid that
   * 
   * we use useCallback hook in savePickedLocationHandler
   * 
   */
  useLayoutEffect(
    () => {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            text="save"
            textColor={Colors.primary200}
            onPress={savePickedLocationHandler}
          />
        ),
      });
    },
    [navigation, savePickedLocationHandler]
  );
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectedLocationHandler}
    >
      {selectedLocation &&
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />}
    </MapView>
  );
}
export default Map;

const styles = StyleSheet.create ({
  map: {
    flex: 1,
  },
});


/**
 * places/PlacesList.js
 */

 import React from 'react';
 import {FlatList, View, Text, StyleSheet} from 'react-native';
 import PlaceItem from './PlaceItem';
 import {colors} from './constant/colors';
 import {Colors} from '../../constant/colors';
 import {useNavigation} from '@react-navigation/native';
 /**
  *  import {useNavigation } from '@react-navigation/native';
  * 
  * const navigation = useNavigation();
  * 
  * function selectPlaceHandler(id){
  * navigation.navigate('PlaceDetails', {
  * placeId: id
  * })
  * }
  * // onSelection of a particular list onSelect will get called
  * <FlatList
  *    data={places}
  *     keyExtractor={item => item.id}
  *     renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
  *   />
  * 
  * Now go to PlaceItem
  * // with place id reaches the PlaceList selectPlaceHandler function
  * <Pressable onPress= {onSelect.bind(this, place.id)}
  * 
  * 
  */
 
 function PlacesList({places}) {
   const navigation = useNavigation();
 
   function selectPlaceHandler(id) {
     navigation.navigate('PlaceDetails', {
       placeId: id,
     });
   }
   console.log("places length" + places.length);
   if (!places || places.length === 0) {
     return (
       <View style={styles.fallbackContainer}>
         <Text style={styles.fallbackText}>
           No places added yet- start adding some
         </Text>
       </View>
     );
   }
   return (
     <FlatList
       data={places}
       keyExtractor={item => item.id}
       renderItem={({item}) => (
         <PlaceItem place={item} onSelect={selectPlaceHandler} />
       )}
     />
   );
 }
 
 const styles = StyleSheet.create({
   fallbackContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   fallbackText: {
     fontSize: 16,
     color: Colors.primary200,
   },
 });
 
 export default PlacesList;
 

 /**
  * places/PlaceItem.js
  */

  import React from 'react';
  import {Pressable, Image, Text, View, StyleSheet} from 'react-native';
  import {Colors} from '../../constant/colors';
  function PlaceItem({place, onSelect}) {
    console.log(place.id);
    return (
      <Pressable
        style={({pressed}) => [styles.item, pressed && styles.pressed]}
        onPress={onSelect.bind(this, place.id)}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/2825578/pexels-photo-2825578.jpeg',
          }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: 6,
      marginVertical: 12,
      backgroundColor: Colors.primary500,
      elevation: 2,
      shadowColor: 'black',
      shadowOpacity: 0.15,
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 1,
    },
    pressed: {
      opacity: 0.9,
    },
    image: {
      flex: 1,
      borderbotttomleftRadius: 4,
      borderTopLeftRadius: 4,
      height: 100,
    },
    info: {
      flex: 2,
      padding: 12,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      color: Colors.gray700,
    },
    address: {
      fontWeight: 'bold',
      fontSize: 18,
    },
  });
  
  export default PlaceItem;
  

  /**
   * places/PlaceForm.js
   */

  /**
 * Lets see what happens what does an image picker do
 * on image capture we are getting the image
 * so i want to send that image here in this form
 * 
 * so for that we need to call a handler and that gets 
 * the uri from the imagepicker 
 * 
 * what we have to do 
 * first a state 
 * 
 * const [selectedImage, setSelectedImage] = useState();
 * const [pickedLocation, setPickedLocation] = useState();
 * 
 * 
 * function takeImageHandler(imageUri){
 * setSeletedImage(imageUri);
 * }
 * 
 * // onPickLocation function calls pickedlocationHandler
 * // we pass location from onPickLocation to pickedLocationHandler
 * 
 * //we ensure pickedLocationHandler function isn't created unnecisaarily
 * //
 * const pickedLocationHandler= useCallback((location)=>{
 * setPickedLocation(location)
 * },[]);
 * 
 * <ImagePicker onTakeImage={takeImageHandler} />
 * 
 * <LocationPicker onPickLocation={pickLocationHadler} />
 * 
 * In ImagePicker we have onTakeImage prop and that will take image.uri which will be 
 * passed in PlaceForm setSelectedImage
 * 
 * function ImagePicker({onTakeImage}){
 *  function takeImageHandler(){
 *   //this will send the image.uri to ImagePicker 
 *   onTakeImage(image.uri);
 *  }
 * }
 * export default ImagePicker;
 * 
 * whenever a location is picked we call onPickLocation
 * location is picked when setPickedLocation is called
 * that happens in useEffect
 * and state will gets updated
 * 
 * we can use another effect which makes the component to reevaluatedd or reexecuted
 * when pickedLocation state is changed (this is guaranted that is how react native works)
 * 
 * also  onPickLocation is also the dependencey which we should add
 * unncessary reevaluation of this function component or even a infinite loop
 * i want to make sure that function that is recieved on onPickLocation doesnt change
 * unnecessarily
 * because whenever it does change this effect function will be reexecuted again
 * 
 * we can wrap pickedLocationHandler called in PlaceForm with useCallback
 * 
 * useEffect(()=>{
 * async function handleLocation() {
 * if(pickedLocation){
 * //this is a geolocation api code which i have placed in geolocation
 * const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
 * }
 * onPickLocation({...pickedLocation, address: address});
 * }
 * 
 * },  [onPickLocation,pickedLocation])
 *
 * 
 * In LocationPicker 
 * 
 * function LocationPicker({onPickLocation}){
 * 
 * }
 * export default LocationPicker;
 * 
 * // this is in the placeform submission
 * 
 * Function savePlaceHandler(){
 * const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
 * onCreatePlace(placeData)
 * }
 * 
 * Now go to AddPlace
 * function createPlaceHandler(place){
 * navigation.navigate("AllPlaces", {place: place});
 * }
 * call <PlaceForm onCreatePlace={createPlaceHandler} />
 * 
 */

//We will go to allPlaces to get the places
/**
 * we use isFocused because when the other pages gets pushed and popped
 * again the down page will not be reevaluated
 * hence there is hook in 
 * 
 * import {useIsFocused} from '@react-navigation/native'; 
 * which will get called when the screen comes in focuse
 * 
 * function AllPlaces({route}){
 * 
 * const isFocused = useIsFocused();
 * const [loadedPlaces, setLoadedPlaces] = useState([]);
 * 
 * useEffect(()=>{
 * if(isFocused && route.params){
 * setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
 * }
 * },[isFocused, route]);
 * 
 * return <PlacesList places={loadedPlaces} />
 * }
 * 
 * 
 * 
 */

/**
 * PlaceItem
 * 
 * <Pressable>
 * <Image styles.image>
 * <View styles.info>
 * <Text style={styles.title}>
 * <Text style={styles.address}>
 * </View>
 * </Pressable>
 * 
 * const styles = StyleSheet.create({
 * item: {
 * flexDirection: 'row',
 * alignItems: 'flex-start'
 * borderRadius: 6,
 * marginVertical: 12,
 * backgroudColor: Colors.primary500,
 * elevation: 2
 * shadowColor: 'black'
 * shadowOpacity: 0.15,
 * shadowOffset: {width: 1, height: 1},
 * shadowRadius: 1
 * },
 * pressed: {
 * opacity: 0.9
 * },
 * image: {
 * flex: 1,
 * borderbotttomleftRadius: 4,
 * borderTopLeftRadius: 4,
 * height: 100
 * }
 * info: {
 * flex:2,
 * padding: 12,
 * }
 * title: {
 * fontWeidght :bold,
 * fontSize: 18,
 * color: Colors.gray700
 * }
 * address: {
 * fontWeidght :bold,
 * fontSize: 18,
 * }
 * }
 * })
 */

import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import {Colors} from '../../constant/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Place from '../../models/place';


function PlaceForm({onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState('');

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  const pickedLocation = {};
  function savePlaceHandler() {
    const placeData = new Place(
      'Lonavala',
      'https://pixabay.com/photos/dog-pet-husky-puppy-outside-7691238/',
      {address: 'Bombay', lat:77.45 , lng: 88.66},
    );
    onCreatePlace(placeData);
   
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
        <ImagePicker />
        <LocationPicker />
        <Button title="onSubmit" onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
export default PlaceForm;

/**
 * places/LocationPicker.js
 */



/**
 * npm install @react-native-community/geolocation --save
 * 
 * add in ios/projectone/info.plist
 * 
 * <key>NSLocationWhenInUseUsageDescription</key>
 * <string>App needs Location permission </string>
 * <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
 * <string>App needs always location description</string>
 * 
 * import Geolocation from '@react-native-community/geolocation';
 * 
 * Geolocation.getCurrentPosition(info => console.log(info));
 * 
 * and also run the app from again begining
 * 
 * npm start
 * 
 * npm run ios
 */


/**
 * we are getting from Map a latitude and longitude 
 * so for that to access
 * 
 * to get the value from one screen to another we useRoute hook
 * import {useNavigation, useRoute} from '@react-navigation/native'
 * 
 * const navigation = useNaviation();
 * const route = useRoute();
 * 
 * 
 * because we are getting pickedLat from Map.js screen
 * const mapPickedLocation = route.params ? {lat: route.params.pickedLat , lng: route.params.pickedLng} : null;
 * or
 * 
 * const mapPickedLocation = route.params && {
 *  lat: route.params.pickedLat,
 *  lng: route.params.pickedLng,
 * }
 * 
 * //useEFfect to register side effect so to execute some code conditionally
 * //but i do not see the preview
 * //we go back from one screen to another screen that component is not recreated
 * //pushed into the top of the stack
 * // the back screen is preserved not recreated and nested child component
 * 
 * 
 * //useIsFocused is used for that purpose
 * import {useIsFocused} from '@react-navigation/native';
 * 
 * //This return focused true if the screen is currently focused and false otherwise
 * const isFocused = useIsFocused();
 * 
 * useEffect{()=>{
 * if(isFocused && route.params){
 * const mapPickedLocation = route.params ? {lat: route.params.pickedLat , lng: route.params.pickedLng} : null;
 * setPickedLocation(mapPickedLocation);
 * }
 * }, [route, isFocused]};
 *.
 * 
 */
/*

*/

import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Colors} from '../../constant/colors';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';

function LocationPicker() {
   const navigation = useNavigation();
    function getLocationHandler(){
        Geolocation.getCurrentPosition(info => console.log(info));
    }
    function pickOnMapHandler () {
      navigation.navigate('Map');
    }
  return (
    <View>
      <View style={styles.mapPreview} />
      <View style={styles.actions}>
        <Button title="locate user" onPress={getLocationHandler} />
        <Button title="Pick on map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default LocationPicker;


/**
 * ImagePicker.js
 */

/**
 * To make the camera accessible in react native
 * 
 * first we need to install in terminal
 * 
 * 
 * npm install react-native-image-picker
 * 
 * npx pod-install ios
 * 
 * then go to info.plist
 * 
 * ios/projectone/info.plist
 * 
 * and add these dependencies
 * 
 * <key>NSPhotoLibraryUsageDescription</key>
 * <string>App needs photo library Access</string>
 * <key>NSCameraUsageDescription</key>
 * <string>App needs Camera Access Permission for testing</string>
 * <key>NSMicrophoneUsageDescription</key>
 * <string>App needs Microphone Access Permission for testing</string>
 *
 * import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
 *
 * launchCamera({
 *      saveToPhotos: true,
 *       mediaType: 'photo',
 *       includeBase64: false,
 *   });
 * it might not work in simulator if it doesn't have a camera
 * give error code
 * 
 * errorCode": "camera_unavailable
 * try using it on device
 * 
 */


 import React, {useState} from 'react';
 import {View, Text, Button, Image, StyleSheet} from 'react-native';
 import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
 import {Colors} from '../../constant/colors';
 
 function ImagePicker() {
   const [pickedImage, setPickedImage] = useState();
   async function takeImageHandler() {
     const response = await launchCamera({
       saveToPhotos: true,
       mediaType: 'photo',
       includeBase64: false,
     });
     console.log(response);
     if(response) {
       setPickedImage(response.uri);
     }
   }
   let imagePreview = <Text>No image taken yet.</Text>;
   if (pickedImage) {
     imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />;
   }
 
   return (
     <View>
       <View style={styles.imagePreview}>{imagePreview}</View>
       <Button title="Take Image" onPress={takeImageHandler} />
     </View>
   );
 }
 const styles = StyleSheet.create({
   imagePreview: {
     width: '100%',
     height: 200,
     marginVertical: 8,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: Colors.primary100,
     borderRadius: 4,
   },
   image: {
     width: '100%',
     height: '100%',
   },
 });
 export default ImagePicker;

 /**
  * IconButton.js
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
   * colors.js
   */

   export const Colors = {
    primary50: '#cfeffd',
    primary100: '#a0defb',
    primary200: '#77cff8',
    primary400: '#44bdf5',
    primary500: '#1aacf0',
    primary700: '#0570c9',
    primary800: '#003b88',
    accent500: '#e6b30b',
    gray700: '#221c30',
  };
  