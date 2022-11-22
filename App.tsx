// import App from './src/--App';

// export default App;

import { StatusBar } from 'expo-status-bar';

import RootNavigator from './src/navigation';

export default function App() {
  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
}