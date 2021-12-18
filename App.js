import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoggerProvider } from './contexts/LoggerProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LoggerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Root'
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LoggerProvider>

    // <NavigationContainer>
    //   <BottomTabNavigator/>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
