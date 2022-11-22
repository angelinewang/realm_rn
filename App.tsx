// import App from './src/--App';

// export default App;
import { AuthProvider } from './src/contexts/Auth';

import { TailwindProvider } from 'tailwindcss-react-native/dist/provider';

import { AppRegistry } from 'react-native';

export default function App() {
  return (
    <>
      <TailwindProvider>
        <AuthProvider />
        {/* Children of AuthProvider at specified in the Auth.tsx context file */}
      </TailwindProvider>
    </>
  );
}

AppRegistry.registerComponent('realm_rn', () => App);