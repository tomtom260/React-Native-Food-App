import React, { ReactElement, useContext } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../context/auth';

function SettingsScreen(): ReactElement {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>Settings</Text>
      <Button mode="contained" onPress={() => signOut()}>
        Logout
      </Button>
    </View>
  );
}

export default SettingsScreen;
