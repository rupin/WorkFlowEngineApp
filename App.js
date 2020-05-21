import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screens/Login';
import CreateFlow from './screens/CreateFlow.js';
import  ViewPendingFlows from './screens/ViewPendingFlows.js';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="CreateFlow" component={CreateFlow} />
        <Drawer.Screen name="ViewPendingFlows" component={ViewPendingFlows} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}