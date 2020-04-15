import React from "react";
import { StyleSheet } from 'react-native'
import { ThemeProvider } from 'react-native-elements'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';


import Home from "./screens/Home";
import Editor from "./screens/Editor";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Editor">
      <Stack.Screen name="Home" component={Home}
      options={{
        title: 'Thankfully',
        // headerRight: props => <IconButton icon="file-search"/>
      }} />
      <Stack.Screen name="Editor" component={Editor}
      options={{
        headerShown: false,
      }}
      />
    </Stack.Navigator>
  );
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open h on your app!</Text>
//     </View>
//   );
// }
export default function App() {
  return <NavigationContainer>{MyStack()}</NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
