import React, { useContext, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import AccountsBackground from '../component/AccountsBackground';
import LoadingContainer from '../component/LoadingContainer';
import { AuthContext } from '../context/auth';

const StyledButton = styled(Button)`
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.brand.primary};
`;

const StyledTextInput = styled(TextInput)`
  margin-bottom: 20px;
`;

const StyledContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${({ theme }) => theme.sizes[2]};
  margin-top: ${({ theme }) => theme.space[2]};
  width: 100%;
`;

const StyledError = styled.Text`
  color: ${({ theme }) => theme.colors.text.error};
  margin: 10px;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 30px;
  align-self: center;
`;

function Regsiter(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const { signUp, loading, error } = useContext(AuthContext);

  return (
    <AccountsBackground>
      <>
        <StyledTitle>Meals To GO</StyledTitle>
        <StyledContainer>
          <StyledTextInput
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <StyledTextInput
            label="Password"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <StyledTextInput
            label="Password Confirm"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            value={passwordConfirm}
            onChangeText={text => setPasswordConfirm(text)}
          />
          {error ? <StyledError>{error}</StyledError> : null}
          <StyledButton
            mode="contained"
            icon="lock-open-outline"
            onPress={() => signUp(email, password, passwordConfirm)}
          >
            {loading ? <LoadingContainer /> : 'Register'}
          </StyledButton>
        </StyledContainer>
      </>
    </AccountsBackground>
  );
}

export default Regsiter;
