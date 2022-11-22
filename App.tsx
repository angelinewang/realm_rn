// import App from './src/--App';

// export default App;

import { StatusBar } from 'expo-status-bar';

import RootNavigator from './src/navigation';

import { TailwindProvider } from 'tailwindcss-react-native/dist/provider';

export default function App() {
  return (
    <>
      <TailwindProvider>
      <RootNavigator />
      <StatusBar style="auto" />
      </TailwindProvider>
    </>
  );
}