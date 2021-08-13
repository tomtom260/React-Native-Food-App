import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';

import RestaurantList from '../component/RestaurantList';
import { FavouritesContext } from '../context/state/favourites';
import { RestaurantNavigatorParamList } from '../navigation/Restaurants';
import { SettingsNavigaitorParamList } from '../navigation/Settings';

type SettingsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsNavigaitorParamList, 'Settings'>,
  StackNavigationProp<RestaurantNavigatorParamList>
>;

function Favourites({
  navigation,
}: {
  navigation: SettingsNavigationProp;
}): React.ReactElement {
  const { favourites } = useContext(FavouritesContext);
  return <RestaurantList navigation={navigation} restaurants={favourites} />;
}

export default Favourites;
