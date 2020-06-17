import React from "react";
import { ThemeProvider } from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {Provider as StoreProvider} from 'react-redux'
import { createStore } from "redux";
import reducer from "./reducers/index"

import Home from "./screens/Home";
import Editor from "./screens/Editor";

import {RootStackParamList} from './types'

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import { YellowBox, StatusBar } from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const store = createStore(reducer);
const Stack = createStackNavigator<RootStackParamList>();


// Define style object and pass it to theme provider
// Give theme presets to ThemeProvider once instead of passing
// it seperately. ie. Don't mix theme and application logic!

// Refactor: Styles into a single object.
  // Also save setting into asyncStorage


const theme = {
  light: {
    colors: {
      background: "#f1f2fa",
      text: "#262c33",
      icon: "#cf3d43",
      card: "#fff",
      cardText: "#262c33",
    }
  },
  dark: {
    colors: {
      background: "#161616",
      text: "#ededed",
      icon: "#cf3d43",
      card: "#1a1a1a",
      cardText: "#fff",
    }
  }
}


export default function App() {

  let [fontsLoaded] = useFonts({
    'Balsamiq-Bold': require('./assets/fonts/BalsamiqSans-Bold.ttf'),
    'Balsamiq-Regular': require('./assets/fonts/BalsamiqSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.light.colors.icon} barStyle="light-content"  />
        <NavigationContainer>
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
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  );
}
