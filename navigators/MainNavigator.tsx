import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Registrar from '../Screens/Registrar';
import Datos from '../Screens/Datos';
import Administrar from '../Screens/Administrar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Tab.Screen name="Registro" component={Registrar} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Registro" component={Registrar} />
      <Tab.Screen name="Visualizar" component={Datos} />
      <Tab.Screen name="Administrar" component={Administrar}/>
    </Tab.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
