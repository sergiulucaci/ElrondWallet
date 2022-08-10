import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from 'src/features/welcome/Welcome';
import Wallet from 'src/features/wallet/Wallet';

export type RootStackParamList = {
  Welcome: undefined;
  Wallet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;