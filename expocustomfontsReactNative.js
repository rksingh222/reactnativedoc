/**
 * 
 * expo install expo-font
 * 
 * import  {useFonts} from 'expo-font';
 * 
 * creats fonts folder inside assets
 * 
 * OpenSans-Regular.ttf
 * copy this in the folder
 * 
 * const [fontsLoaded] = useFonts({
 *  'open-sans' : require('./assets/fonts/Opens-Regular.ttf'),
 * 
 * })
 * 
 * to get splash screen
 * expo install expo-app-loading
 * 
 * Splash Scren is shown until some condition is met
 * 
 * so what we are doing is SPlash screen is shown until the font is initialized
 * 
 * import AppLoading from 'expo-app-loading';
 * 
 * if(!fontsLoaded) {
 *    return <AppLoading />;
 * }
 * 
 * now you can use your fonts in any screen or component
 * 
 * go to style object
 * 
 * font-family : 'open-sans',
 * 
 */