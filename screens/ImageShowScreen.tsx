import React from 'react'
import {View, Image, Dimensions} from 'react-native'
const {height, width} = Dimensions.get('window')

export default function ImageShowScreen ({route, navigation}){
    
    return(
        <View>
            <Image resizeMode="cover" source={{uri:route.image}} style={{height:height, width:"100%"}}></Image>
        </View>
    )
}