import {useEffect, createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStack, AuthStack } from '../navigation/index';
import { authService } from '../services/authService';
import { useIsFocused } from '@react-navigation/native';
import { tokenService } from '../services/tokenService';
import Loading from '../components/Loading';

type AuthContextData = {
        authData?: AuthData;
        authUserId?: Number;
        // AuthData will only have the token 
        // authData.token = User JWT Token
        // loading: boolean;
        signIn(): Promise<void>;
        signOut(): void;
        signUp(): void;
    };

    type AuthData = {
        token: string;
    }

    const AuthContext = createContext<AuthContextData>({} as AuthContextData);

    const AuthProvider: React.FC = () => {
 
    const [loading, setLoading] = useState(true)
    const [authData, setAuthData] = useState()
    const [authUserId, setAuthUserId] = useState()
    //The loading part will be explained in the persist step session
    //   const [loading, setLoading] = useState(true);
    
    const isFocused = useIsFocused()
    async function loadStorageData(): Promise<void> {
        try {
        //Try get the data from Async Storage
        const authDataSerialized = await AsyncStorage.getItem('@AuthData');
        if (authDataSerialized) {
            //If there are data, it's converted to an Object and the state is updated.
            const _authData = JSON.parse(authDataSerialized);
            // TODO: Not reaching loadstoragedata upon login and loading on GuestsScreen
            console.log("Auth Data inside load storage data:")
            console.log(_authData)

            if (_authData.token) {
                setAuthData(_authData)

                // UserId can only be found with _authData variable
                // authData variable cannot be passed for a successful result
                setAuthUserId(tokenService.getUserId(_authData))
                setLoading(false)
            }

            else {
                setAuthData(undefined)
                setAuthUserId(undefined)
                setLoading(false)
            }

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
    }, [loading, isFocused]);

    const signIn = async (_email: string, _password: string): Promise<void> => { 
    try {
        const _authData = await authService.signIn(_email, _password);

        console.log("Reached Auth Context before AsyncStorage")
        console.log("AUTHDATA:")
        console.log(_authData)
        // const _authData = response.json()
        // console.log(_authData)
    
        setAuthData(_authData);
        setAuthUserId(tokenService.getUserId(_authData))
        
        await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData))

    } catch (error) {
        console.error(error);
    } 
    }

    // Used on SignUp Page to Create Account and Also Sign In
const signUp = async (image: any, _email: string, _password: string, _department: number, _name: string, _gender: number, _birthdate: string): Promise<void> => { 
    try {
        // 1. Email 2. Password 3. Department 4. Name 5. Gender 6. Birthdate
        const _authData = await authService.signUp(image, _email, _password, _department, _name, _gender, _birthdate);
        console.log(_authData)
        // const _authData = response.json()
        // console.log(_authData)
        console.log("Reached Auth Context before AsyncStorage for signUpAndSignIn")
        setAuthData(_authData);
        setAuthUserId(tokenService.getUserId(authData))
        
        await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData))

    } catch (error) {
        console.error(error);
    } 
    }

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);
    setAuthUserId(undefined);
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    
<> 
{
   isFocused ? (
    <AuthContext.Provider value={{authData, authUserId, signIn, signUp, signOut}}>
        {/* Commented out for testing purposes to final signup form */}
        {/* Need to check for authData on rendering, because authData needs to be passed into tokenService in order to decode the token and grab the authUserId needed */}
        <>{authData ? <AppStack /> : <AuthStack />}</>
        {/* <AuthStack/> */}
        {/* Guests are shown in Browse after new registration, no party means displaying that guest has no party on the Guestlist Screen */}
    </AuthContext.Provider>
   ) : null
}
 
</>
  )
  
};

function useAuth(): AuthContextData {

const context = useContext(AuthContext);

if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
}

return context;
}

    

export { AuthProvider, useAuth }