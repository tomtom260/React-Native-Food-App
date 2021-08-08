/* eslint-disable camelcase */
import React, { ReactElement } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';

import { ThemeProvider } from 'styled-components';
import theme from './src/context/theme';
import { RestaurantsProvider } from './src/context/state/restaurants';
import TabNavigator from './src/navigation/TabNavigator';

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
    return <ActivityIndicator animating />;
  }

  return (
    <>
      <StyledSafeAreaView>
        <RestaurantsProvider>
          <ThemeProvider theme={theme}>
            <TabNavigator />
          </ThemeProvider>
        </RestaurantsProvider>
      </StyledSafeAreaView>
      <StatusBar />
    </>
  );
}

export default App;
