// import App from './src/--App';

// export default App;
import { AuthProvider } from './src/contexts/Auth';

import { RootNavigator } from './src/navigation';
import { StatusBar } from 'expo-status-bar';

import { TailwindProvider } from 'tailwindcss-react-native/dist/provider';

import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';

export default function App() {
  // const AuthProvider = children.error ? NotificationError : NotificationSuccess;
  return (
      <NavigationContainer>
        <TailwindProvider>
          <AuthProvider>
            <RootNavigator/>
            <StatusBar style="auto" />
          </AuthProvider>
          {/* <AuthProvider /> */}
          {/* Children of AuthProvider at specified in the Auth.tsx context file */}
        </TailwindProvider>
      </NavigationContainer>
  );
}

AppRegistry.registerComponent('realm_rn', () => App);