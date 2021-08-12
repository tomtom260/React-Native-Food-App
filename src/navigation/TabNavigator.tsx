import React, { ReactElement } from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';

import MapsScreen from '../Screen/Maps';
import SettingsScreen from '../Screen/Settings';
import RestaurantsNavigator, {
  RestaurantNavigatorParamList,
} from './Restaurants';

export type TabParamList = {
  'Restaurants Tab': NavigatorScreenParams<RestaurantNavigatorParamList>;
  Map: undefined;
  Settings: undefined;
};

const TabNavigation = createBottomTabNavigator<TabParamList>();
function TabNavigator(): ReactElement {
  return (
    <TabNavigation.Navigator
      initialRouteName="Restaurants Tab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }): ReactElement | undefined => {
          if (route.name === 'Settings') {
            return <Octicons name="settings" color={color} size={24} />;
          }
          if (route.name === 'Restaurants Tab') {
            return <MaterialIcons name="restaurant" size={24} color={color} />;
          }
          if (route.name === 'Map') {
            return (
              <MaterialCommunityIcons
                name="map-outline"
                size={24}
                color={color}
              />
            );
          }
          return undefined;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <TabNavigation.Screen
        name="Restaurants Tab"
        component={RestaurantsNavigator}
        options={{ title: 'Restaurants' }}
      />

      <TabNavigation.Screen name="Map" component={MapsScreen} />
      <TabNavigation.Screen name="Settings" component={SettingsScreen} />
    </TabNavigation.Navigator>
  );
}

export default TabNavigator;
