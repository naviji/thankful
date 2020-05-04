import React from 'react'
import {View, Image, Dimensions} from 'react-native'
const {height, width} = Dimensions.get('window')
import {ImageShowProps} from '../types'

export default function ImageShowScreen (props){
    
    return(
            <Image resizeMode="contain" source={{uri:props.image}} style={{height:height/2.2, width:width}}></Image>
        
    )
}