import React, { ReactElement, useState, useContext, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import RestaurantCard, {
  RestaurantCardProps,
} from '../component/RestaurantCard';
import {
  RestaurantsContext,
  RestaurantsType,
  Cities,
} from '../context/state/restaurants';
import { RestaurantNavigatorParamList } from '../navigation/Restaurants';
import LoadingContainer from '../component/LoadingContainer';
import FavouritesBar from '../component/FavouritesBar';

const StyledSearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

const StyledContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const renderRestaurantList = (item: RestaurantCardProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RestaurantCard {...item} />
);

export type NavigationScreenProps = StackNavigationProp<
  RestaurantNavigatorParamList,
  'Restaurants'
>;

interface AppProps {
  navigation: NavigationScreenProps;
}

export default function Restaurants({ navigation }: AppProps): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>(keyword);
  const { restaurants, keyword,setKeyword, loading, onSearch } =
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
      {restaurants.length ? (
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
      )}
    </>
  );
}
