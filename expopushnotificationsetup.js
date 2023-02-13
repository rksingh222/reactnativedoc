/* you will find a doc where it displays the push notification tool */
/* give expo push token from your app recieved */
/*https://docs.expo.dev/push-notifications/push-notifications-setup/*/
/* https://expo.dev/notifications */
/* https://docs.expo.dev/push-notifications/sending-notifications/ */

/* run  the below code on the ios real device and console log you will see somthing like this */
/*
Object {
  "data": "ExponentPushToken[     ]"  // copy from exponentpushtoken[ ] in the tool
}
on clicking send on notification you will recieve this on your device
*/

/*
you want to send the push notification from your app 
lets create a button 

function sendPushNotificationHandler(){
  fetch("https://exp.host/--/api/v2/push/send",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to:'ExponentPushToken[     ]',
      title:'Test - sent from a device!',
      body: 'This is a test!'
    })
  });
}
<Button title ="Send Push Notification " onPress={sendPushNotificationHanlder} />

*/


//npx expo install expo-notifications
/**
 * copy this in app.json
 * 
 * "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./local/assets/notification-icon.png",
          "color": "#ffffff",
          "sounds": [
            "./local/assets/notification-sound.wav",
            "./local/assets/notification-sound-other.wav"
          ]
        }
      ]
    ]
 */

    import * as Nofifications from 'expo-notifications';
    import {Platform} from 'react-native';

    Notifications.setNotificationHandler({
      handleNotifcation: async() => {
        return {
          shouldPlaySound: false,
          shouldSetBadge: false,
          shouldShowAlert: true
        };
      }
    });
  
    export default function App(){
        //Push token when the app right starts
        //Can't test on emulator only on real device

        useEffect(()=> {

            async function configurePushNotifications(){
             //whether we have permission to get push token
              const { status } = await Notifications.getPermissionsAsync();
              let finalStatus = status;

              if(finalStatus !== 'granted'){
                 const { status } = await Notifications.requestPermissionsAsync();
                 finalStatus = status;
              }

              if(finalStatus !== 'granted'){
                  Alert.alert('Permission required','Push notifications need the appropriate permissions.');
                  return;
              }
              
              const pushTokenData = await Notifications.getExpoPushTokenAsync();
                console.log(pushTokenData)
              
             //for android
             if(Platform.OS === 'android'){
                 Nofifications.setNotificationChannelAsync('default',{
                     name: 'default',
                     importance: Notifications.AndroidImportance.DEFAULT
                 });
             }
            }

            configurePushNotifications();
        },[]);

        // local notification
        useEffect(()=>{
            const subscription1 =  Notifications.addNotificationReceivedListener((notification)=>{
                console.log('Notification Recieved');
                console.log(notification);
                console.log(notification.request.content.data.userName);
            });

            const subscription2 = Nofifications.addNotificationResponseReceivedListener((response) => {
              console.log("Notification Response Recieved");
              console.log(response);
              const userName = response.notification.request.content.data.userName;
              console.log(userName);
            });

            return ()=> {
                subscription1.remove();
                subscription2.remove();
            }
           
        },[])
      function scheduleNotificationHandler(){
        Notifications.scheduleNotificationAsync({
          content: {title: 'My first local Notification', body: 'this is the body of the notification',data: {userName: 'Max'}},
          trigger: {seconds: 5},
        })
      }
      return (
        <View>
          <Button onPress={scheduleNotificationHandler} />
        </View>
      );
    }