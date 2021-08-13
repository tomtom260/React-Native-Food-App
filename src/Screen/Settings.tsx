import { StackNavigationProp } from '@react-navigation/stack';
import React, { ReactElement, useContext } from 'react';
import { List, Avatar } from 'react-native-paper';
import styled from 'styled-components/native';
import { AuthContext } from '../context/auth';
import { SettingsNavigaitorParamList } from '../navigation/Settings';

type SettingsNavigationProp = {
  navigation: StackNavigationProp<SettingsNavigaitorParamList,'Settings'>;
};

const StyledItem = styled(List.Item)`
  margin: ${({ theme }) => theme.space[1]};
`;

const StyledAvatarContainer = styled.View`
  align-items: center;
  margin: ${({ theme }) => theme.space[3]};
`;

const StyledAvatarIcon = styled(Avatar.Icon)`
  background-color: ${({ theme }) => theme.colors.brand.primary};
`;

const StyledText = styled.Text`
  margin-top: ${({ theme }) => theme.space[3]};
`;

function SettingsScreen({ navigation }: SettingsNavigationProp): ReactElement {
  const { signOut, user } = useContext(AuthContext);

  return (
    <>
      <StyledAvatarContainer>
        <StyledAvatarIcon icon="human" size={180} />
        <StyledText>{user?.email} </StyledText>
      </StyledAvatarContainer>
      <List.Section>
        <StyledItem
          title="Favourites"
          description="View Yout Favourite Restaurants"
          left={() => <List.Icon icon="heart" color="black" />}
          onPress={() => navigation.navigate('Favourite')}
        />
        <StyledItem
          title="Log Out"
          left={() => <List.Icon icon="exit-run" color="black" />}
          onPress={signOut}
        />
      </List.Section>
    </>
  );
}

export default SettingsScreen;
