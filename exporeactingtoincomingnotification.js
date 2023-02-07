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
        useEffect(()=>{
          const subscription =  Notifications.addNotificationReceivedListener((notification)=>{
                console.log('Notification Recieved');
                console.log(notification);
                console.log(notification.request.content.data.userName);
            });
            return ()=> {
                subscription.remove();
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