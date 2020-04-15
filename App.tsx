import React from "react";
import { StyleSheet } from "react-native";
import { ThemeProvider, Text , Icon} from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Editor from "./screens/Editor";

const Stack = createStackNavigator();


function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Editor">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Thankfully",
          // headerTitle: props => (<Text {...props} style={{fontSize: 24, fontWeight: '700', elevation: 6, marginBottom: 10}}></Text>)
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

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open h on your app!</Text>
//     </View>
//   );
// }
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>{MyStack()}</NavigationContainer>
    </ThemeProvider>
  );
}
