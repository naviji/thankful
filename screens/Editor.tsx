
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Editor() {
  return (
    <View style={{flex:1, marginTop: 30, padding: 5}}>
      <Text style={{fontSize: 20, fontWeight: '700'}}>
          What are you thankful for today?
      </Text>
      <TextInput style={{
          flex: 1,
          textAlignVertical: 'top',
          padding: 10,
          backgroundColor: 'pink',
      }}/>

    </View>
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
