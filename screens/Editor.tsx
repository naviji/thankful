import React, {useState} from "react";
import Icons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  Image,
  FlatList,
  Text,
  View,
  AppState,
} from "react-native";
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Button, colors } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";
import { updateEntry, createEntry, removeEntry } from "../reducers/entries";
import { EditorProps, IAppState, Entry } from "../types";

import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("paperNote.db")

const {height, width} = Dimensions.get('window')

export default function Editor({ route, navigation }: EditorProps) {
  const [modalVisible, setModalVisible] = useState(false);
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
  

  
  let entries = useSelector((state: IAppState) => {return(state.entries)});

  let item: Entry | undefined = entries.find((x) => x.id === entryId);
  const entry: Entry = item ? item : {id: -1, content: '', date: new Date()}
  // if (entry === undefined) {
  //   // throw new Error("Entry not found!");
  //   entry = {
  //     id: -1,
  //     content: '',
  //     date: new Date(),
  //   }
  //   // console.log("...here...")
  //   navigation.navigate('Home')
  // }

  const pickImage= async ()=>{
    let result  = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[4,3],
    })
    if(!result.cancelled){     
      // dispatch(updateEntry({...entry, image: result.uri}))
      dispatch(updateEntry({...entry, image:[...entry.image || [], result.uri] }))
    }
  }
  const _renderItem=(obj)=>
    (<Image key={obj.item.key} source={{uri:obj.item}} style={{height:width/3, width:width/3}}></Image>
)
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
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
          <TouchableOpacity onPress={() => { getPhotoPermission(); pickImage();}}>
          <Icons name={'attach-file'} size={30} color='#3377ff' style={{marginLeft:10}}/>

          </TouchableOpacity>
          {/* <TouchableOpacity onPress={()=>{dispatch(removeEntry(entry.id))}}>
          <Icons name={'delete'} size={30} color='red' style={{marginLeft:10}}/>

          </TouchableOpacity> */}
        </View>
      </View>
      
}
  <Text style={{fontSize: 20, fontWeight: "bold", marginHorizontal:20, marginTop:20}}>
          Tell use about your day..
        </Text>

      {entry &&
        
        <ScrollView>
      
      

       
      <View style={{ flex: 1,paddingHorizontal:20, paddingTop:10 }}>
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
          autoFocus
          onTouchStart={()=>{}}
          multiline
          style={{
            flex: 6,
            textAlignVertical: "top",
            fontSize: 17.5,
            fontWeight: "300",
          }}
        />

      </View>

      </ScrollView>

      

      }
      

      
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={false}
        onRequestClose={()=>{setModalVisible(!modalVisible);}}
       >
      <View style={{ marginTop: 22 }}>
          <View>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
            {
        entry.image &&
          <FlatList data={entry.image}
          numColumns={3}
          renderItem={_renderItem}>

          </FlatList>}
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text>Show Modal</Text>
      </TouchableHighlight>

       
      
    </SafeAreaView>
  );
}
