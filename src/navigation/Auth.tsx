import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Account from '../Screen/Account';
import Login from '../Screen/Login';
import Register from '../Screen/Register';

export type AuthNavigatorParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

const AuthStackNavigator = createStackNavigator<AuthNavigatorParamList>();

function AuthNavigator(): React.ReactElement {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <AuthStackNavigator.Screen name="Main" component={Account} />
      <AuthStackNavigator.Screen name="Login" component={Login} />
      <AuthStackNavigator.Screen name="Register" component={Register} />
    </AuthStackNavigator.Navigator>
  );
}

export default AuthNavigator;
