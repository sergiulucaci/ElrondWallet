import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp as NativeStackNavigationPropImported,
} from '@react-navigation/native-stack';

import Welcome from 'src/features/welcome/containers/Welcome';
import Wallet from 'src/features/wallet/containers/Wallet';
import {Account} from 'src/features/wallet/api';
import Transaction from 'src/features/transaction/containers/Transaction';
import Confirmation from 'src/features/transaction/containers/Confirmation';

export type NativeStackNavigationProp =
  NativeStackNavigationPropImported<RootStackParamList>;

export type RootStackParamList = {
  Welcome: undefined;
  Wallet: {address: string; mnemonic: string};
  Transaction: {account: Account; mnemonic: string};
  Confirmation: {
    value: string;
    receiver: string;
    txHash: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
