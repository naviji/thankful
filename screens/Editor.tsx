import React from "react";
import Icons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  AppState,
} from "react-native";
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Button, colors } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";
import { updateEntry, createEntry, removeEntry, addImage } from "../reducers/entries";
import { EditorProps, IAppState, Entry } from "../types";

import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("paperNote.db")


export default function Editor({ route, navigation }: EditorProps) {


  
  // const {width, height} = Dimensions.get('window')
  const { entryId } = route.params;
  const dispatch = useDispatch();
  //   console.log("")
  // console.log(entryId);

  const _onError: SQLite.SQLTransactionErrorCallback | undefined = (e) => {
    console.warn(e);
  };

  const _onSuccess: SQLite.SQLVoidCallback | undefined = () => {
    console.log("Success loading database");
  };

  const getPhotoPermission=async ()=>{
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        getPhotoPermission()
      }

  }
  

  const pickImage= async ()=>{
    let result  = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[4,3],
      

    })
    if(!result.cancelled){     
      

      dispatch(addImage(result.uri,route.params.entryId))

    
    
    }


  }
  
  let entries = useSelector((state: IAppState) => {getPhotoPermission(); return(state.entries)});

  const entry: Entry | undefined = entries.find((x) => x.id === entryId);
  if (entry === undefined) {
    // throw new Error("Entry not found!");
    console.log("...here...")
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {entry &&
        <View style={{
            justifyContent:"space-between",
            paddingTop:23.5,
            flex: 0,
            flexDirection:"row",
            paddingHorizontal: 20,
            alignItems:"center",}}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icons name={'arrow-back'} size={30} color='#3377ff'/>
        </TouchableOpacity>
        <View style={{justifyContent:"flex-end", flexDirection:"row"}}>
          <TouchableOpacity onPress={pickImage}>
          <Icons name={'broken-image'} size={30} color='#3377ff' style={{marginLeft:10}}/>

          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{dispatch(removeEntry(entry.id))}}>
          <Icons name={'delete'} size={30} color='red' style={{marginLeft:10}}/>

          </TouchableOpacity>
        </View>
      </View>
}

      {entry &&
        
        <ScrollView>
      {entry.image &&<View style={{ marginTop:20, marginHorizontal:20 }}>
        <Image source={{uri:entry.image}} style={{height:200,width:100, borderRadius:10,borderWidth:2, borderColor:"#3377ff"}}></Image>

      </View>}
      

       
      <View style={{ flex: 1,padding:20 }}>
        <TextInput
          defaultValue={entry.content}
          value={entry.content}
          onChange={(e) => {
            const updatedEntry = { ...entry, content: e.nativeEvent.text };

            db.transaction(tx => {
              tx.executeSql("UPDATE entries set content=? WHERE id=?", [
                updatedEntry.content,
                entry.id,
              ]);
            }, _onError, _onSuccess);

            dispatch(updateEntry(updatedEntry));
          }}
          placeholder="Your note here"
          multiline
          style={{
            flex: 6,
            textAlignVertical: "top",
            fontSize: 17.5,
            fontWeight: "300",
          }}
        />

        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "flex-end" }}
        >
          {/* <Button
            onPress={() => navigation.navigate("Home")}
            buttonStyle={{
              width: 100,
              height: 40,
              backgroundColor: "black",
              marginHorizontal: 10,
              marginBottom: 10,
              // position: 'absolute',
            }}
            title="Save"
          /> */}
        </View>
      </View>

      </ScrollView>
      }
      <View
        style={{
          flex: 0,
          paddingHorizontal: 20,
          paddingVertical:15,
          borderTopColor: "#3377ff",
          borderTopWidth: 8,
        }}
      >
        <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          "Gratitude is the quickest way to happiness"
        </Text>
      </View>
    </SafeAreaView>
  );
}
