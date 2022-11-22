// Expo React Native TS Template 
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import useCachedResources from '../hooks/useCachedResources';
// import useColorScheme from '../hooks/useColorScheme';
// import Navigation from '../navigation';

// export default function App() {
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();

//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <SafeAreaProvider>
//         <Navigation colorScheme={colorScheme} />
//         <StatusBar />
//       </SafeAreaProvider>
//     );
//   }
// }

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation';

export default () => (
  // <View style={{ marginTop: 50 }}>
  //   <Text>Hello Expo!</Text>
  // </View>
  <>
    <RootNavigator/>
    <StatusBar style="auto"/>
  </>
);
