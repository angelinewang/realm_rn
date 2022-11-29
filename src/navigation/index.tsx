import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Loading from '../components/Loading';

// import { useAuth } from '../contexts/Auth';
// import {useAuth} from '../screens/Authentication/LoginScreen'
import MainScreen from '../screens/MainScreen';
import AuthScreen from '../screens/AuthScreen';
import { useAuth } from '../contexts/Auth';
// 2 Different Options for Render: 1. Unauthenticated 2. Authenticated 

// Unauthenticated Flow 
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthScreen}/>
    </Stack.Navigator>
  )
}

// Authenticated Flow 
const AppStack = () => {
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

  



export const RootNavigator = () => {
  
  const {authData} = useAuth();

  // if(loading) {
  //   return <Loading />;
  // }
// const [loading, setLoading] = React.useState(true);

  // const [authData, setAuthData] = React.useState()
  // const getAuthData = async () => {
  //   const _authData = await AsyncStorage.getItem('@AuthData')
  //   setAuthData(_authData)
  // } 




  // React.useEffect(() => {
  //   getAuthData()
  //   console.log(authData)
  // }, [authData])

  return (
    // <AuthProvider children={children}>
    <>{authData? <AppStack /> : <AuthStack />}</>
      
    // </AuthProvider>
 
  );
};

