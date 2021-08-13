import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SettingsScreen from '../Screen/Settings';
import FavouritesScreen from '../Screen/Favourites';

export type SettingsNavigaitorParamList = {
  Settings: undefined;
  Favourite: undefined;
};

const SettingsNavigator = createStackNavigator<SettingsNavigaitorParamList>();

function Settings(): React.ReactElement {
  return (
    <SettingsNavigator.Navigator
      screenOptions={{
        headerMode: 'screen',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsNavigator.Screen name="Favourite" component={FavouritesScreen} />
    </SettingsNavigator.Navigator>
  );
}

export default Settings;
