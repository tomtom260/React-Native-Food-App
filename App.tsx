/* eslint-disable camelcase */
import React, { ReactElement } from 'react';
import 'react-native-gesture-handler';
import firebase from 'firebase';
import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import styled from 'styled-components/native';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '@env';

import { ThemeProvider } from 'styled-components';
import theme from './src/context/theme';
import { RestaurantsProvider } from './src/context/state/restaurants';
import Navigator from './src/navigation';
import { FavouritesProvider } from './src/context/state/favourites';
import LoadingContainer from './src/component/LoadingContainer';
import { AuthProivder } from './src/context/auth';

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;
LogBox.ignoreAllLogs();
function App(): ReactElement {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!latoLoaded || !oswaldLoaded) {
    return <LoadingContainer />;
  }
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID,
    });
  }
  return (
    <>
      <StyledSafeAreaView>
        <AuthProivder>
          <RestaurantsProvider>
            <FavouritesProvider>
              <ThemeProvider theme={theme}>
                <Navigator />
              </ThemeProvider>
            </FavouritesProvider>
          </RestaurantsProvider>
        </AuthProivder>
      </StyledSafeAreaView>
      <StatusBar />
    </>
  );
}

export default App;
