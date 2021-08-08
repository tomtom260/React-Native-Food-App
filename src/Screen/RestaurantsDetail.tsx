/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import RestaurantCard from '../component/RestaurantCard';
import { RestaurantNavigatorParamList } from '../navigation/Restaurants';

type RestaurantsDetailParamsProp = RouteProp<
  RestaurantNavigatorParamList,
  'Restaurant Detail'
>;

interface AppProps {
  route: RestaurantsDetailParamsProp;
}

function RestaurantsDetail({
  route: { params: item },
}: AppProps): ReactElement {
  const [isBreakfastExpanded, setIsBreakfastExpanded] = useState<boolean>();
  const [isLunchExpanded, setIsLunchExpanded] = useState<boolean>();
  const [isDinnerExpanded, setIsDinnerExpanded] = useState<boolean>();
  const [isDrinkExpanded, setIsDrinkExpanded] = useState<boolean>();

  return (
    <>
      <RestaurantCard {...item.item} />
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={props => <List.Icon {...props} icon="bread-slice" />}
          expanded={isBreakfastExpanded}
          onPress={() => setIsBreakfastExpanded(val => !val)}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="clasic breakfast" />
        </List.Accordion>
        <List.Accordion
          title="Lunch"
          left={props => <List.Icon {...props} icon="hamburger" />}
          expanded={isLunchExpanded}
          onPress={() => setIsLunchExpanded(val => !val)}
        >
          <List.Item title="Burger with Fries" />
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>
        <List.Accordion
          title="Dinner"
          left={props => <List.Icon {...props} icon="food-variant" />}
          expanded={isDinnerExpanded}
          onPress={() => setIsDinnerExpanded(val => !val)}
        >
          <List.Item title="Spaghetti Bolognes" />
          <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
          <List.Item title="Steak Frites" />
        </List.Accordion>
        <List.Accordion
          title="Drinks"
          left={props => <List.Icon {...props} icon="cup" />}
          expanded={isDrinkExpanded}
          onPress={() => setIsDrinkExpanded(val => !val)}
        >
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Modelo" />
          <List.Item title="Coke" />
          <List.Item title="Fanta" />
        </List.Accordion>
      </ScrollView>
    </>
  );
}

export default RestaurantsDetail;
