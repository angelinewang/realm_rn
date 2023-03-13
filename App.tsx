import { TailwindProvider } from 'tailwindcss-react-native/dist/provider';

import { AppRegistry } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/Auth';

import {useRef} from 'react';
//Remove react-native-firebase which does not work with expo

// import analytics from '@react-native-firebase/analytics';
// import { firebase } from '@react-native-firebase/analytics';

// import analytics from "@react-native-firebase/analytics"

export default function App() {

  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  // analytics().setAnalyticsCollectionEnabled(true);
  // const AuthProvider = children.error ? NotificationError : NotificationSuccess;
  return (
    //Record screen views for analytics 
    //1. Add a callback to get notified of state changes
    //2. Get the root navigator state and find the active route name

    //Resource for screen-tracking integration: Lhttps://reactnavigation.org/docs/screen-tracking/

     // ref={navigationRef}
        // onReady={() => {
        //   routeNameRef.current = navigationRef.getCurrentRoute().name;
        // }}
        // onStateChange={async () => {
        //   const previousRouteName = routeNameRef.current;
        //   const currentRouteName = navigationRef.getCurrentRoute().name;
        //   const trackScreenView = async (screenName: any) => {
        //     // await analytics().logEvent('screen_view', {
        //     //   firebase_screen: screenName
        //     // })
        //   };

        //   if (previousRouteName !== currentRouteName) {
        //     routeNameRef.current = currentRouteName;

        //     // await trackScreenView(currentRouteName);
        //   }
        // }}
      <NavigationContainer>
        <TailwindProvider>
          <AuthProvider/>
        </TailwindProvider>
      </NavigationContainer>
  );
}

AppRegistry.registerComponent('realm_rn', () => App);