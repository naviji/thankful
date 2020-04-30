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
          title: "Thankfully",
          
          headerTitle: props => {return(<View>
                                          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                                          <Text {...props} style={{fontSize: 28, fontWeight: '700', elevation: 6}}>Thankfully</Text>
                                        </View>)},
          headerRight: props => <Icon
          
          iconStyle={{
            // width: 40,
            // height: 40,
            // padding: 4,
          }}
          onPress={() => console.log('Begin search!')}
          name='search' />
          ,
          headerLeft: props => <Icon
          
          iconStyle={{
            // width: 40,
            // height: 40,
            // padding: 4,
          }}
          
          onPress={() => console.log('Open menu')}
          name='menu' />
        }}
      >

      </Stack.Screen>
      <Stack.Screen
        name="Editor"
        component={Editor}
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
        <NavigationContainer>{MyStack()}</NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  );
}
