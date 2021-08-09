import React, { ReactElement } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import { TransformedRestaurant as Restaurant } from '../context/state/restaurants';

const StyledImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
const StyledWebView = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const StyledItem = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
  border-radius: 10px;
`;
const StyledText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

function CompactRestaurantCard({
  restaurant: { name, photos },
}: {
  restaurant: Restaurant;
}): ReactElement {
  const CardImage = (
    Platform.OS === 'android' ? StyledWebView : StyledImage
  ) as React.ElementType;
  return (
    <StyledItem>
      <CardImage source={{ uri: photos[0] }} />
      <StyledText numberOfLines={3}>{name}</StyledText>
    </StyledItem>
  );
}

export default CompactRestaurantCard;
