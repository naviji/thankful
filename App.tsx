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

const store = createStore(reducer);
const Stack = createStackNavigator();

// TO DO
// use redux to mainatin state.
// use sqlite for persistence

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Thankfully",
          headerTitle: props => (<Text {...props} style={{fontSize: 28, fontWeight: '700', elevation: 6}}>Thankfully</Text>),
          // headerRight: props => <IconButton icon="file-search"/>
          headerRight: props => <Icon
          raised
          iconStyle={{
            // width: 40,
            // height: 40,
            // padding: 4,
          }}
          onPress={() => console.log('Begin search!')}
          name='search' />
          ,
          headerLeft: props => <Icon
          raised
          iconStyle={{
            // width: 40,
            // height: 40,
            // padding: 4,
          }}
          onPress={() => console.log('Open menu')}
          name='menu' />
        }}
      />
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
