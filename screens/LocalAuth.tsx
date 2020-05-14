import * as LocalAuthentication from 'expo-local-authentication';
import React from 'react'
import {View, Text} from 'react-native';
import { LocalProps } from '../types';

export default function LocalAuth ({navigation}: LocalProps){
    LocalAuthentication.authenticateAsync().then(value=>{if(value.success){
        navigation.navigate("Home")

    }})
    
    return(
        <View><Text>kadjfjdnfidnvi</Text></View>
    )
    
}