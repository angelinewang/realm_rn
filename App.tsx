// import App from './src/--App';

// export default App;
import { AuthProvider } from './src/contexts/Auth';

import { TailwindProvider } from 'tailwindcss-react-native/dist/provider';

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