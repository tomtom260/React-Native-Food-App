import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import RestaurantCard, { RestaurantCardProps } from './RestaurantCard';
import { Restaurant } from '../context/state/restaurants';
import { NavigationScreenProps } from '../Screen/Restaurants';

const renderRestaurantList = (item: RestaurantCardProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RestaurantCard restaurant={item} />
);

const StyledContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

function RestaurantList({
  restaurants,
  navigation,
}: {
  restaurants: Restaurant[];
  navigation: NavigationScreenProps;
}): React.ReactElement {
  return restaurants.length ? (
    <FlatList<RestaurantCardProps>
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{ margin: 16 }}
      data={restaurants}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Restaurant Detail', {
              item,
            });
          }}
        >
          {renderRestaurantList(item)}
        </TouchableOpacity>
      )}
      keyExtractor={item => item.name!}
    />
  ) : (
    <StyledContainer>
      <Text>Empty</Text>
    </StyledContainer>
  );
}

export default RestaurantList;
