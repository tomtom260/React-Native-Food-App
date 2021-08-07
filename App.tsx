/* eslint-disable camelcase */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactElement } from 'react';
import { SafeAreaView, Text, StatusBar, LogBox } from 'react-native';
import styled from 'styled-components/native';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';

import { ThemeProvider } from 'styled-components';
import RestaurantsScreen from './src/Screen/Restaurants';
import MapsScreen from './src/Screen/Maps';
import SettingsScreen from './src/Screen/Settings';
import theme from './src/context/theme';
import { RestaurantsProvider } from './src/context/state/restaurants';

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;
LogBox.ignoreAllLogs();
export default function App(): ReactElement {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!latoLoaded || !oswaldLoaded) {
    return <Text>LOADING...</Text>;
  }

  const TabNavigation = createBottomTabNavigator();

  return (
    <>
      <StyledSafeAreaView>
        <RestaurantsProvider>
          <ThemeProvider theme={theme}>
            <NavigationContainer>
              <TabNavigation.Navigator
                initialRouteName="Settings"
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color }): ReactElement | undefined => {
                    if (route.name === 'Settings') {
                      return (
                        <Octicons name="settings" color={color} size={24} />
                      );
                    }
                    if (route.name === 'Restaurants') {
                      return (
                        <MaterialIcons
                          name="restaurant"
                          size={24}
                          color={color}
                        />
                      );
                    }
                    if (route.name === 'Map') {
                      return (
                        <MaterialCommunityIcons
                          name="map-outline"
                          size={24}
                          color={color}
                        />
                      );
                    }
                    return undefined;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'tomato',
                  inactiveTintColor: 'gray',
                }}
              >
                <TabNavigation.Screen
                  name="Restaurants"
                  component={RestaurantsScreen}
                />

                <TabNavigation.Screen name="Map" component={MapsScreen} />
                <TabNavigation.Screen
                  name="Settings"
                  component={SettingsScreen}
                />
              </TabNavigation.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </RestaurantsProvider>
      </StyledSafeAreaView>
      <StatusBar />
    </>
  );
}
