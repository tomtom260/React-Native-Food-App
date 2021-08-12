import React, { useContext } from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { FavouritesContext } from '../context/state/favourites';
import { Restaurant } from '../context/state/restaurants';
import { NavigationScreenProps } from '../Screen/Restaurants';
import CompactRestaurantCard from './CompactRestaurantCard';

const FavouritesWrapper = styled.View`
  margin: 10px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  margin: ${({ theme }) => theme.space[3]};
`;

const StyledText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

function FavouritesBar({
  navigation,
}: {
  navigation: NavigationScreenProps;
}): React.ReactElement {
  const { favourites } = useContext(FavouritesContext);

  return (
    <FavouritesWrapper>
      <StyledText>Favourites</StyledText>
      {favourites.length ? (
        <FlatList<Restaurant>
          keyExtractor={item => item.name}
          data={favourites}
          renderItem={({ item }) => (
            <StyledTouchableOpacity
              onPress={() =>
                navigation.navigate('Restaurant Detail', {
                  item,
                })
              }
            >
              <CompactRestaurantCard key={item.name} restaurant={item} />
            </StyledTouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text>No Favourites Selected</Text>
      )}
    </FavouritesWrapper>
  );
}

export default FavouritesBar;
