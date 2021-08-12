import React, { ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantsScreen from '../Screen/Restaurants';
import RestaurantsDetailScreen from '../Screen/RestaurantsDetail';
import { RestaurantCardProps } from '../component/RestaurantCard';

export type RestaurantNavigatorParamList = {
  Restaurants: undefined;
  'Restaurant Detail': { item: RestaurantCardProps };
};

const StackNavigator = createStackNavigator<RestaurantNavigatorParamList>();
function Restaurant(): ReactElement {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="Restaurants"
    >
      <StackNavigator.Screen name="Restaurants" component={RestaurantsScreen} />
      <StackNavigator.Screen
        options={{ gestureEnabled: true, gestureDirection: 'vertical' }}
        name="Restaurant Detail"
        component={RestaurantsDetailScreen}
      />
    </StackNavigator.Navigator>
  );
}

export default Restaurant;
