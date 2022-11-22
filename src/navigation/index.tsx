import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';

import BottomTabs from './Tabs';

const RootNavigator = () => {
  return (
    <>
    <Login />
    <NavigationContainer>
        <BottomTabs />
    </NavigationContainer>
    </>
  );
};

export default RootNavigator;