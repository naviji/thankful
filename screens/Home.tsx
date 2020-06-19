import React, { useState, useContext } from "react";
import { ThemeContext, Text, FullTheme } from "react-native-elements";
import JournalEntry from '../screens/JournalEntry'
import BottomTab from '../screens/BottomTab';
import SettingsScreen from './Settings';
import { Dimensions, TouchableOpacity, View, ListRenderItem } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useSelector, useDispatch } from "react-redux";
import { loadEntries, createEntry, } from "../reducers/entries";
import { Entry, HomeProps, State } from "../types";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("paperNote.db");


const _onError: SQLite.SQLTransactionErrorCallback | undefined = (e) => {
  console.warn(e);
};

const _onSuccess: SQLite.SQLVoidCallback | undefined = () => {
  console.log("Success loading database");
};



export default function Home({ navigation }: HomeProps) {
  const dispatch = useDispatch();
  const { theme }  = useContext(ThemeContext);

  
  const entries = useSelector((state: State) => state.entries);

  React.useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS entries (
          id TEXT PRIMARY_KEY,
          content TEXT NOT NULL,
          created_time INT NOT NULL
        )`
        );
        tx.executeSql(
          "SELECT id, content, created_time from entries;",
          [],
          (_, { rows }) => {
            const result = rows._array.map((x) => ({
              ...x,
              date: new Date(x.created_time),
            }));
            dispatch(loadEntries(result));
          }
        );
      },
      _onError,
      _onSuccess
    );
    
    // if(fingerLockEnabled){
    //   LocalAuthentication.authenticateAsync().then(value=>{value.success?setAuth(true):setError(true)})
    // }

  }, []);

 



  

  const _renderItem: ListRenderItem<Entry> = ({ item }) => {
    return (
      
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Editor", {
              entryId: item.id
            })
          }
          key={item.id}
          style={{
            flex: 1,
          }}
        >
         <JournalEntry entry={item} />
        </TouchableOpacity>
        
      </View>
    );  
        
  };

  const { width } = Dimensions.get("screen");
  
  return (
    <View style={{ flex: 1, paddingTop:50, backgroundColor:theme.colors?.grey0}}>
   
      <View style={{flex: .4, paddingHorizontal:20, justifyContent:"center", flexDirection:"row"}}>
 
        <Text style={{ fontFamily:"Balsamiq-Bold", fontSize:20 }}>Welcome to Thankfully</Text>
      
        </View>
     
     
        <View style={{flex:4, paddingBottom:55}}>
        <Carousel
        style={{
        elevation: 4,
        }}
        layout="default"
        inactiveSlideOpacity={1}
        activeSlideOffset={100}
          data={entries}
          renderItem={_renderItem}
          sliderWidth={width / 1}
          itemWidth={width / 1.1}
          hasParallaxImages={true}
        /></View>        

        <BottomTab navigation={navigation}></BottomTab>
        
    </View>
  );
}
