import { FlatList, Image, TouchableOpacity, View, Dimensions } from "react-native";
import { useFonts } from '@use-expo/font';
import { Icon, Text, ThemeContext } from "react-native-elements";
import { Entry} from "../types";
import { useDispatch } from "react-redux";
import React, { useState, useContext } from "react";
import { AppLoading } from 'expo';
import { removeEntry } from "../reducers/entries";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("paperNote.db");
const {height, width} = Dimensions.get('screen')

const isToday = (dateToCheck: Date): Boolean => {
    const dateToCompare = new Date(dateToCheck);
    dateToCompare.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return todayDate.valueOf() === dateToCompare.valueOf();
  };
  
  const isYesterday = (dateToCheck: Date): Boolean => {
    const dateToCompare = new Date(dateToCheck);
    dateToCompare.setHours(0, 0, 0, 0);
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    yesterdayDate.setHours(0, 0, 0, 0);
    return yesterdayDate.valueOf() === dateToCompare.valueOf();
  };
  
const _renderItemFlatList=(obj)=>(
    <Image key={obj.item} source={{uri:obj.item}} style={{borderRadius:10, shadowColor:"#000", shadowOffset:{width:7, height:7}, shadowOpacity:1, shadowRadius:10, alignItems:"center", height:width/4.5, width:width/4.5,margin:1.5}}></Image>
    )

const JournalEntry = (props: any) => {
  const { theme }  = useContext(ThemeContext);
  if (!theme.colors) {
    throw new Error("No colors in theme")
  }

  
    const entry: Entry = props.entry;
    const dispatch = useDispatch();
    // const { width, height } = Dimensions.get("window");
    
   
    return (
  
  
      
      
      <View
        style={{
          
          flex: 1,
          // minHeight: height/1.23, // replace with dimensions
          backgroundColor: theme.colors.primary, 
          marginTop: 20,
          marginHorizontal: 7,
          borderRadius: 10
  
        }}
      >
  
        {(props.entry.image)&&  
        <Image source={{uri:props.entry.image[0]}} resizeMode="cover" style={{borderTopLeftRadius:10, borderTopRightRadius:10, width:"100%", height:height/4.7}}></Image>
      }
  
      {!props.entry.image&&
        <Image source={require("../assets/pattern.jpg")} resizeMode="cover" style={{borderTopLeftRadius:10, borderTopRightRadius:10, width:"100%", height:height/4.7}}></Image>
      }
  
   <View style={{
              justifyContent:"space-between",
              flex: 0,
              paddingHorizontal:20,
              paddingTop:20,
              alignItems:"center",
              flexDirection:"row",}}>
          <Text style={{ fontSize: 20, fontFamily:"Balsamiq-Bold"}}>
          {isToday(entry.date)
            ? "Today"
            : isYesterday(entry.date)
            ? "Yesterday"
            : entry.date.toDateString()}
        </Text>
          <View style={{justifyContent:"flex-end", flexDirection:"row"}}>
  
            <TouchableOpacity onPress={() => {
              db.transaction(
                tx => {
                  tx.executeSql(
                    "DELETE from entries WHERE id=?",
                    [entry.id],
                    () => console.log("delete success"),
                    (t, e) => {
                      console.log("delete failed");
                      return false;
                    }
                  );
                }
              )
              dispatch(removeEntry(entry.id));
            }}>
            <Icon
            // color={theme.colors.secondary}
          style={{justifyContent: "flex-end"}}
          name="trash"
          type='simple-line-icon'
            
          />
  
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:3, paddingHorizontal:20,}}>
        
        <Text style={{ fontSize: 17, marginTop: 10, fontFamily:"Balsamiq-Regular" }}>
          {entry.content.length > 20
            ? entry.content.slice(0, 400) + "..."
            : entry.content}
        </Text></View>
        {entry.image &&<View  style={{flex:2,paddingTop:15}} >
          
            <FlatList
            style={{alignSelf:"center"}}
            data={entry.image.slice(0,3)}
            numColumns={3}
            renderItem={_renderItemFlatList}>
  
            </FlatList></View>
            }
        
  
        
      </View>
    );
          
  };


  export default JournalEntry;