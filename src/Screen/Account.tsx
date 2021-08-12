import React from 'react';
import { View, Text } from 'react-native';
import AccountsBackground from '../component/AccountsBackground';

function Account(): React.ReactElement {
  return (
    <AccountsBackground>
      <View>
        <Text>Hello</Text>
      </View>
    </AccountsBackground>
  );
}

export default Account;
