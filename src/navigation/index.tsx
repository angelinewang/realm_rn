import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen';
import AuthScreen from '../screens/AuthScreen';
// 2 Different Options for Render: 1. Unauthenticated 2. Authenticated 

// Unauthenticated Flow 
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthScreen}/>
    </Stack.Navigator>
  )
}

// Authenticated Flow 
export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainScreen" component={MainScreen}/>
    </Stack.Navigator>
  );
};

// This will passback JWToken

//Set the data in the context, so the App can be notified
//and send the user to the AuthStack
// setAuthData(_authData);

//Persist the data in the Async Storage
//to be recovered in the next user session.
//Only passes the token to AsyncStorage and stores it under @AuthData:token  

// export const RootNavigator = () => {
//   debugger
//   Context Not Work
//   const {authData} = useAuth();

//   console.log(authData)
//   return (
//     <AuthProvider children={children}>

//     </AuthProvider>

//   );
// };

