import { TailwindProvider } from 'tailwindcss-react-native/dist/provider';

import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/Auth';

import analytics from '@react-native-firebase/analytics';
import { firebase } from '@react-native-firebase/analytics';

export default function App() {
  // const AuthProvider = children.error ? NotificationError : NotificationSuccess;
  return (
      <NavigationContainer>
        <TailwindProvider>
          <AuthProvider/>
        </TailwindProvider>
      </NavigationContainer>
  );
}

AppRegistry.registerComponent('realm_rn', () => App);