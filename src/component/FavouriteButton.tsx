import { AntDesign } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FavouritesContext } from '../context/state/favourites';
import { Restaurant } from '../context/state/restaurants';
import { RestaurantCardProps } from './RestaurantCard';

const StyledTouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 10;
`;

function FavouriteButton({
  restaurant,
}: {
  restaurant: RestaurantCardProps;
}): React.ReactElement {
  const { favourites, removeFromFavourites, addToFavourites } =
    useContext(FavouritesContext);
  const isFavourite = favourites.find(
    rest => rest.placeId === restaurant.placeId
  );
  return (
    <StyledTouchableOpacity
      onPress={() =>
        isFavourite
          ? removeFromFavourites(restaurant as unknown as Restaurant)
          : addToFavourites(restaurant as unknown as Restaurant)
      }
    >
      <AntDesign
        name={isFavourite ? 'heart' : 'hearto'}
        color={isFavourite ? 'red' : 'white'}
        size={24}
      />
    </StyledTouchableOpacity>
  );
}

export default FavouriteButton;
