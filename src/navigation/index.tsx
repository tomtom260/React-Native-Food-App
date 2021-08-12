import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

function Navigator(): React.ReactElement {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default Navigator;
