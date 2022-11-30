import {useEffect, createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStack, AuthStack } from '../navigation/index';
import { authService } from '../services/authService';

    type AuthContextData = {
        authData?: AuthData;
        // AuthData will only have the token 
        // authData.token = User JWT Token
        // loading: boolean;
        signIn(): Promise<void>;
        signOut(): void;
    };

    type AuthData = {
        token: string;
    }

    const AuthContext = createContext<AuthContextData>({} as AuthContextData);

    const AuthProvider: React.FC = () => {
 
    const [authData, setAuthData] = useState({})
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
            console.log("reached loadstoragedata function!")
        }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorageData function.
    loadStorageData();
    }, []);

    const signIn = async (_email: string, _password: string): Promise<void> => { 
    try {

    const _authData = await authService.signIn(_email, _password);
    console.log(_authData)
    // const _authData = response.json()
    // console.log(_authData)
    setAuthData(_authData);
    console.log("Reached Auth Context before AsyncStorage")
    await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData))
        
    } catch (error) {
        console.error(error);
    } 
    }
  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, signIn, signOut}}>
        <>{authData ? <AppStack /> : <AuthStack />}</>
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

    

export { AuthProvider, useAuth }