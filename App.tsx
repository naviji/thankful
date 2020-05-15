import React from "react";
import { StyleSheet } from "react-native";
import { ThemeProvider, Text , Icon} from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {Provider as StoreProvider} from 'react-redux'
import { createStore } from "redux";
import reducer from "./reducers/index"

import Home from "./screens/Home";
import Editor from "./screens/Editor";

import {RootStackParamList} from './types'

import { YellowBox, StatusBar, View } from 'react-native';

import * as SQLite from 'expo-sqlite'
import Wait from "./screens/Wait";
const db = SQLite.openDatabase("paperNote.db")

// About: Non-serializable warning.
// If you don't use state persistence or deep link to the screen
// which accepts functions in params, 
// then the warning doesn't affect you and you can safely ignore it.

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const store = createStore(reducer);
const Stack = createStackNavigator<RootStackParamList>();


function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Editor"
        component={Editor}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="Wait"
        component={Wait}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <StatusBar backgroundColor="#cf3d43" barStyle="light-content"  />
        <NavigationContainer>{MyStack()}</NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  );
}
