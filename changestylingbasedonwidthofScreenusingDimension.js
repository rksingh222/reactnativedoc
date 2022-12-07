/**
 * using Dimension you can get the device width and height
 */
/**
 * with ios you can use either window or screen
 * 
 * with android 
 * screen is entire width and height including status bar
 * with window is excluding statusbar
 * 
 * in every screen you need to call this Dimension API to configure
 */

import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container : {
      padding : deviceWidth < 380 ? 12 : 24,
  }
});

