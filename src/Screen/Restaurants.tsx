import React, { ReactElement, useState, useContext, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import RestaurantCard, {
  RestaurantCardProps,
} from '../component/RestaurantCard';
import {
  RestaurantsContext,
  RestaurantsType,
  Cities,
} from '../context/state/restaurants';

const StyledSearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

const StyledLoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const renderRestaurantList = ({ item }: { item: RestaurantCardProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RestaurantCard {...item} />
);

export default function Restaurants(): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { restaurants, setKeyword, loading, onSearch } =
    useContext<RestaurantsType>(RestaurantsContext);

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  return loading ? (
    <StyledLoadingContainer>
      <Text>LOADING</Text>
    </StyledLoadingContainer>
  ) : (
    <>
      <StyledSearchContainer>
        <Searchbar
          value={searchQuery}
          onChangeText={query => setSearchQuery(query)}
          placeholder="Search Restuarants"
          onSubmitEditing={() => {
            setKeyword(searchQuery as Cities);
          }}
        />
      </StyledSearchContainer>
      {restaurants.length ? (
        <FlatList<RestaurantCardProps>
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{ margin: 16 }}
          data={restaurants}
          renderItem={renderRestaurantList}
          keyExtractor={item => item.name!}
        />
      ) : (
        <StyledLoadingContainer>
          <Text>Empty</Text>
        </StyledLoadingContainer>
      )}
    </>
  );
}
