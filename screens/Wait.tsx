import React from 'react';
import {View, Text} from 'react-native';
import { WaitNavProps } from '../types';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Wait({navigation}:WaitNavProps){
    return(
        <View><TouchableHighlight onPress={()=>{navigation.navigate("Home")}}><Text>sknsin</Text></TouchableHighlight></View>
    )
        
}