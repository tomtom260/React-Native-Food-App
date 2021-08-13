import React, { useContext } from 'react';
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

function Login(): React.ReactElement {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { signIn, loading, error } = useContext(AuthContext);

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
          {error ? <StyledError>{error}</StyledError> : null}
          {loading ? (
            <LoadingContainer size="small" />
          ) : (
            <StyledButton
              mode="contained"
              icon="email"
              onPress={() => signIn(email, password)}
            >
              Login
            </StyledButton>
          )}
        </StyledContainer>
      </>
    </AccountsBackground>
  );
}

export default Login;
