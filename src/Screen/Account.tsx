import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import AccountsBackground from '../component/AccountsBackground';
import LoadingContainer from '../component/LoadingContainer';
import { AuthContext } from '../context/auth';
import { AuthNavigatorParamList } from '../navigation/Auth';

const StyledButton = styled(Button).attrs({
  mode: 'contained',
})`
  background-color: ${({ theme }) => theme.colors.brand.primary};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const StyledContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${({ theme }) => theme.sizes[4]};
  margin-top: ${({ theme }) => theme.space[2]};
  width: 100%;
`;

const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 30px;
`;

const StyledAnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  z-index: 10000;
  padding: ${({ theme }) => theme.space[2]};
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
  const { loading } = useContext(AuthContext);

  return loading ? (
    <LoadingContainer />
  ) : (
    <>
      <StyledAnimationWrapper>
        <LottieView
          loop={false}
          key="animation"
          resizeMode="cover"
          autoPlay
          source={require('../../assets/watermelon.json')}
        />
      </StyledAnimationWrapper>
      <AccountsBackground>
        <StyledContainer>
          <StyledTitle>Meals To Go</StyledTitle>
          <StyledButton
            icon="lock-open-outline"
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            Login
          </StyledButton>
          <StyledButton
            icon="email"
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            Register
          </StyledButton>
        </StyledContainer>
      </AccountsBackground>
    </>
  );
}

export default Account;
