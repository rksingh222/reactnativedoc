/**
 * useNavigation hook
 * 
 * In a stack navigator screen when you supply the compnent in that component
 * only you get navigation prop and which then can be used
 * in navigation.navigate(name of the stack screen)
 * 
 * but what if we want to use it later in a nested components
 * we can pass it as a prop that is possible
 * 
 * you can also a hook if you want which is useNavigationHook
 * you can use in the nested component 
 * import { useNavigation } from '@react-navigation/native'
 * 
 * function CategoryGridTitle(){
 *  const navigation = useNavigation(); 
 *  with use you can get navigation 
 * }
 * 
 * useRoute Hook
 * 
 * import {useRoute} '@react-navigation/native'
 * 
 * const route = useRoute();
 * route.params.categoryId
 * 
 */