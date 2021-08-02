import React, { ReactElement, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import RestaurantCard, {
  RestaurantCardProps,
} from '../component/RestaurantCard';

const StyledSearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

const renderRestaurantList = ({ item }: { item: RestaurantCardProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RestaurantCard {...item} />
);

export default function Restaurants(): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>('');
  return (
    <>
      <StyledSearchContainer>
        <Searchbar
          value={searchQuery}
          onChangeText={query => setSearchQuery(query)}
          placeholder="Search Restuarants"
        />
      </StyledSearchContainer>
      <FlatList<RestaurantCardProps>
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ margin: 16 }}
        data={[
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' },
          { name: 'Four' },
        ]}
        renderItem={renderRestaurantList}
        keyExtractor={item => item.name!}
      />
    </>
  );
}
