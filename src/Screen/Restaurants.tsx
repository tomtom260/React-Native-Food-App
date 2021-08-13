import React, { ReactElement, useState, useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import {
  RestaurantsContext,
  RestaurantsType,
  Cities,
} from '../context/state/restaurants';
import { RestaurantNavigatorParamList } from '../navigation/Restaurants';
import LoadingContainer from '../component/LoadingContainer';
import FavouritesBar from '../component/FavouritesBar';
import RestaurantList from '../component/RestaurantList';
import { SettingsNavigaitorParamList } from '../navigation/Settings';

const StyledSearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

export type NavigationScreenProps = CompositeNavigationProp<
  StackNavigationProp<RestaurantNavigatorParamList, 'Restaurants'>,
  StackNavigationProp<SettingsNavigaitorParamList>
>;

interface AppProps {
  navigation: NavigationScreenProps;
}

export default function Restaurants({ navigation }: AppProps): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>(keyword);
  const { restaurants, keyword, setKeyword, loading, onSearch } =
    useContext<RestaurantsType>(RestaurantsContext);

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  useEffect(() => {
    setSearchQuery(keyword);
  }, [keyword]);

  const [favouritesToggled, setFavouritesToggled] = useState(false);
  if (loading) return <LoadingContainer />;

  return (
    <>
      <StyledSearchContainer>
        <Searchbar
          icon={favouritesToggled ? 'heart' : 'heart-outline'}
          onIconPress={() => setFavouritesToggled(toggled => !toggled)}
          value={searchQuery}
          onChangeText={query => setSearchQuery(query)}
          placeholder="Search Restuarants"
          onSubmitEditing={() => {
            setKeyword(searchQuery as Cities);
          }}
        />
      </StyledSearchContainer>
      {favouritesToggled && <FavouritesBar navigation={navigation} />}
      <RestaurantList navigation={navigation} restaurants={restaurants} />
    </>
  );
}
