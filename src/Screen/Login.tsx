import React from 'react';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import AccountsBackground from '../component/AccountsBackground';

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.brand.primary};
`;

function Login() {
  return (
    <AccountsBackground>
      <StyledButton
        icon="lock-open-outline"
        onPress={() => console.log('pressed')}
      >
        Login
      </StyledButton>
      <StyledButton
        icon="lock-open-outline"
        onPress={() => console.log('pressed')}
      >
        Register
      </StyledButton>
    </AccountsBackground>
  );
}

export default Login;
