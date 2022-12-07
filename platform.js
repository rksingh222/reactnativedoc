
import platform from "platform";
import { Platform , StyleSheet} from "react-native";


const styles = StyleSheet.create({
  container : {
      borderWidth : platform.os == 'android' ? 2 : 0,
  },
});

const style = StyleSheet.create({
    container : {
        borderWidth : platform.select({ios : 0, android: 2}),
    },
  });