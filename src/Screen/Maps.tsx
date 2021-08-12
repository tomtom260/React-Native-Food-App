import React, { ReactElement, useState, useContext, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RestaurantsContext,
  Cities,
  RestaurantsType,
} from '../context/state/restaurants';
import CompactRestaurantCard from '../component/CompactRestaurantCard';
import { TabParamList } from '../navigation/TabNavigator';
import { RestaurantNavigatorParamList } from '../navigation/Restaurants';
import LoadingContainer from '../component/LoadingContainer';

const StyledMapView = styled(MapView)`
  width: 100%;
  height: 100%;
`;

const StyledSearchContainer = styled.View`
  position: absolute;
  padding: ${({ theme }) => theme.space[3]};
  z-index: 100;
  width: 100%;
`;

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Map'>,
  StackNavigationProp<RestaurantNavigatorParamList>
>;

interface AppProps {
  navigation: ProfileScreenNavigationProp;
}

function MapsScreen({ navigation }: AppProps): ReactElement {
  const { keyword, setKeyword, restaurants, loading, location } =
    useContext<RestaurantsType>(RestaurantsContext);
  const [searchQuery, setSearchQuery] = useState<string>(keyword);

  useEffect(() => {
    setSearchQuery(keyword);
  }, [keyword]);
  if (loading) return <LoadingContainer />;

  return (
    <>
      <StyledSearchContainer>
        <Searchbar
          value={searchQuery}
          onChangeText={query => setSearchQuery(query)}
          placeholder="Search"
          onSubmitEditing={() => {
            setKeyword(searchQuery as Cities);
          }}
        />
      </StyledSearchContainer>
      <StyledMapView
        region={{
          latitude: location.location.lat,
          longitude: location.location.lng,
          latitudeDelta:
            location.viewport.northeast.lat - location.viewport.southwest.lat,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.name}
            title={restaurant.name}
            coordinate={restaurant.geometry.location}
          >
            <Callout
              onPress={() =>
                navigation.navigate('Restaurant Detail', { item: restaurant })
              }
            >
              <CompactRestaurantCard isMap restaurant={restaurant} />
            </Callout>
          </Marker>
        ))}
      </StyledMapView>
    </>
  );
}

export default MapsScreen;
