/**
 * To use Expo Location 
 * Location - Expo in google
 * 
 * geolocation information of device
 * 
 * expo install expo-location
 * 
 * now permission
 * 
 * import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location';
 * 
 * 
 * from button async function getlocationHandler(){
 * const hasPermission = await verifyPermissions();
 *   if(!hasPermission){
 *   return ;
 *   }
 * const location = await getCurrentPositionAsync();
 * console.log(location);
 * //still we wont get the result
 * //we don't need to configure
 * }
 * 
 * we have to get the permissions to get the result
 * this beofre getLocationHandler()
 * 
 * const [locationPermissionInformation,requestPermission] = useForegroundPermissions();
 *  async function verifyPermissions() {
 * if(locationPermissionInformation.status == PermissionStatus.UNDETERMINED){
 *  const permissionResponse = await requestPermission();
 *  return permissionResponse.granted;
 * }
 * if(locationPermissionInformation.status == PermissionStatus.DENIED)
 * {
 * Alert.alert('Insufficient permission', 'You need to grant camera permission to use this app');
 * return false;
 * }
 * return true;
 * }
 * 
 */