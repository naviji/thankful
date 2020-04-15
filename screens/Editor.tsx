
import React from 'react';
import { SafeAreaView ,StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, colors } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Editor() {
  return (
    <SafeAreaView style={{flex:1, marginTop: 30}}>
        <View style={{flex:0, paddingHorizontal: 20, minHeight: 40, borderBottomColor: 'black', borderBottomWidth: 3}}>
            <Text style={{fontSize: 30, fontWeight: '700'}}>
                Today
            </Text>
            <Text style={{fontSize: 30, fontWeight: '700'}}>
                I am thankful for
            </Text>
        </View>
     <View style={{flex:6}}>
        <TextInput style={{
            flex: 1,
            textAlignVertical: 'top',
            backgroundColor: 'pink',
            padding: 10,
            fontSize: 20,
            fontWeight: '300'
        }}/>

<Button
buttonStyle={{
    width: 100,
    height: 40,
    backgroundColor: 'black',
    position: 'absolute',
    right: 10,
    bottom: 10,
}}
  title="Save"
/>
            
     </View> 
      <View style={{flex:0, padding: 20, borderTopColor: 'black', borderTopWidth: 3}}>
          <Text style={{fontSize: 20, fontWeight: "200", textAlign: "center"}}>
          "Gratitude is the quickest way to happiness"
          </Text>
      </View>


    </SafeAreaView>
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
