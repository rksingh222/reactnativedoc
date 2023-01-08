/**
 * for IOS Devices
 * 
 * search expo image picker in google
 * 
 * official doc of expo
 * 
 * add this after android and web and after comma
 * "plugins": [
 *     [
 *       "expo-image-picker",
 *       {
 *         "cameraPermission": "The app accesses your photos to let you share them with your friends."
 *       }
 *     ]
 * now create
 * 
 * ImagePicker.js
 * 
 * import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker'
 * 
 * function ImagePicker(){
 * const [cameraPermissionInformation, requestPermission]= useCameraPermissions();
 * 
 * async function verifyPermissions() {
 * if(cameraPermissionInformation.status == PermissionStatus.UNDETERMINED){
 *  const permissionResponse = await requestPermission();
 *  return permissionResponse.granted;
 * }
 * if(cameraPermissionInformation.status == PermissionStatus.DENIED)
 * {
 * Alert.alert('Insufficient permission', 'You need to grant camera permission to use this app');
 * return false;
 * }
 * return true;
 * }
 * 
 * 
 * call in button handler
 * async function takeImageHandler() {\
 *   const hasPermission = await verifyPermissions();
 *   if(!hasPermission){
 *   return ;
 *   }
 *  const image = await launchCameraAsync({
 *   allowsEditing: true,
 *   aspect: [16, 9],
 *   quality: 0.5,
 * });
 * console.log(image);
 * }
 * 
 * In expo
 * to see the output if the simulator doesn't work
 * go to browser and scan the expo code on original device
 * 
 */