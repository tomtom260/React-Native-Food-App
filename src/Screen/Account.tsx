import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import AccountsBackground from '../component/AccountsBackground';
import { AuthNavigatorParamList } from '../navigation/AuthNavigator';

const StyledButton = styled(Button).attrs({
  icon: 'lock-open-outline',
  mode: 'contained',
})`
  background-color: ${({ theme }) => theme.colors.brand.primary};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

type AccountsNavigationProp = StackNavigationProp<
  AuthNavigatorParamList,
  'Main'
>;

function Account({
  navigation,
}: {
  navigation: AccountsNavigationProp;
}): React.ReactElement {
  return (
    <AccountsBackground>
      <>
        <StyledButton onPress={() => navigation.navigate('Login')}>
          Login
        </StyledButton>
        <StyledButton onPress={() => navigation.navigate('Register')}>
          Register
        </StyledButton>
      </>
    </AccountsBackground>
  );
}

export default Account;
