import React, { ReactElement } from 'react';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import starSvg from '../../assets/svgStar';
import openSvg from '../../assets/svgOpen';
import FavouriteButton from './FavouriteButton';

const StyledInfo = styled.View`
  padding: ${props => props.theme.space[3]};
`;
const StyledCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  margin-bottom: ${({ theme: { space } }) => space[3]};
`;
const StyledCardCover = styled(Card.Cover)`
  padding: ${props => props.theme.space[3]};
  background-color: ${props => props.theme.colors.bg.primary};
`;
const StyledRating = styled.View`
  margin: ${props => props.theme.space[2]} 0;
  flex-direction: row;
`;
const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const StyledText = styled.Text`
  color: ${props => props.theme.colors.ui.primary};
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.body};
`;
const StyledAddress = styled.Text`
  color: ${props => props.theme.colors.ui.primary};
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.caption};
`;
const StyledClosed = styled.Text`
  color: ${props => props.theme.colors.text.error};
  text-transform: uppercase;
`;
const StyledIconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 50px;
`;
const StyledImage = styled.Image`
  width: 15px;
`;

export interface RestaurantCardProps {
  name?: string;
  icon?: string;
  photos?: string[];
  vicinity?: string;
  openNow?: boolean;
  rating?: number;
  isClosedTemporarily?: boolean;
  placeId: string;
}

function RestaurantCard({
  restaurant,
}: {
  restaurant: RestaurantCardProps;
}): ReactElement {
  const {
    name = 'Some Restaurant',
    photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ],
    vicinity: address = '100 Random Street',
    rating = 4,
    openNow = true,
    isClosedTemporarily = true,
    icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
  } = restaurant;

  return (
    <StyledCard elevation={5}>
      <FavouriteButton restaurant={restaurant} />
      <StyledCardCover key={name} source={{ uri: photos[0] }} />
      <StyledInfo>
        <StyledText>{name}</StyledText>
        <StyledRow>
          <StyledRating>
            {Array.from(new Array(Math.floor(rating))).map((el, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <SvgXml key={index} xml={starSvg} width={20} height={20} />
            ))}
          </StyledRating>
          {isClosedTemporarily && (
            // eslint-disable-next-line react-native/no-raw-text
            <StyledClosed>closed temporarily</StyledClosed>
          )}
          <StyledIconContainer>
            {openNow && <SvgXml xml={openSvg} width={20} height={20} />}
            <StyledImage source={{ uri: icon }} />
          </StyledIconContainer>
        </StyledRow>
        <StyledAddress>{address}</StyledAddress>
      </StyledInfo>
    </StyledCard>
  );
}

export default RestaurantCard;
