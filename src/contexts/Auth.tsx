import {useEffect, createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootNavigator } from '../navigation';

    type AuthContextData = {
    authData?: AuthData;
    // AuthData will only have the token 
    // authData.token = User JWT Token
    //   loading: boolean;
      signIn(): Promise<string>;
      signOut(): void;
    };

    type AuthData = {
        token: string;
    }

    const AuthContext = createContext<AuthContextData>({} as AuthContextData);

    const AuthProvider: React.FC = () => {
    const [authData, setAuthData] = useState({token: ""})

    //The loading part will be explained in the persist step session
    //   const [loading, setLoading] = useState(true);
    async function loadStorageData(): Promise<void> {
        try {
        //Try get the data from Async Storage
        const authDataSerialized = await AsyncStorage.getItem('@AuthData');
        if (authDataSerialized) {
            //If there are data, it's converted to an Object and the state is updated.
            const _authData = JSON.parse(authDataSerialized);
            setAuthData(_authData);
        }
        } catch (error) {
        }
    }

    useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorageData function.
    loadStorageData();
    }, []);



  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, signIn, signOut}}>
      <RootNavigator/>
    </AuthContext.Provider>
  );
  
};

 
    function useAuth(): AuthContextData {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
    }

        const signIn = async (_email: string, _password: string) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.  
    try {
        console.log("Reach authService!");
        let response = await fetch(
            "https://334d-193-61-207-166.eu.ngrok.io/api/user/v1/login/",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ 
                "email": _email, "password": _password }),
            }
        );
        let _authData = response.json();
        // setAuthData(_authData._z)
        //Grabs the correct information of the user
        
        await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData._z));
        } catch (error) {
            console.error(error);
        } }
export{ AuthProvider, useAuth, signIn }