import React, {useState} from "react";
import { Icon } from "react-native-elements";
import Icons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Modal,
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
import ImageShowScreen from "./ImageShowScreen";
const db = SQLite.openDatabase("paperNote.db")

const {height, width} = Dimensions.get('window')

export default function Editor({ route, navigation }: EditorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState(null);
  // const {width, height} = Dimensions.get('window')
  const  entryId  = route.params.entryId;
  const dispatch = useDispatch();
  //   console.log("")
  console.log(entryId);
  let bgColor=route.params.backgroundColor
  let textColor=route.params.textColor
  let iconColor=route.params.iconColor

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
      pickImage();


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
      allowsEditing:false
    })
    if(!result.cancelled){     
      // dispatch(updateEntry({...entry, image: result.uri}))
      dispatch(updateEntry({...entry, image:[...entry.image || [], result.uri] }))
      setModalVisible(true);
      setselectedImage(result.uri)
    }
  }
  const _renderItemFlatList=(obj)=>(
    <TouchableHighlight onPress={()=>{setselectedImage(obj.item)}}>
      <Image source={{uri:obj.item}} style={{height:width/3.1, width:width/3.1,margin:1.5}}></Image>
    </TouchableHighlight>
)
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30, backgroundColor:bgColor,}}>
      {entry &&
        <View style={{
            justifyContent:"space-between",
            paddingTop:23.5,
            flex: 0,
            flexDirection:"row",
            paddingHorizontal: 20,
            alignItems:"center",}}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icons name={'arrow-back'} size={30} color={iconColor}/>
        </TouchableOpacity>
        <View style={{justifyContent:"flex-end", flexDirection:"row"}}>
          <TouchableOpacity onPress={() => { getPhotoPermission(); }}>
          <Icons name={'attach-file'} size={30} color={iconColor} style={{marginLeft:10}}/>

          </TouchableOpacity>
        </View>
      </View>
      
}
  <Text style={{fontSize: 20, fontWeight: "bold", marginHorizontal:20, marginTop:20, color:textColor}}>
          Tell us about your day..
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
          multiline
          style={{
            flex: 6,
            color:textColor,
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
      <View style={{flex:1, paddingTop: 22, backgroundColor:route.params.backgroundColor }}>
            
              <Icon
              color={route.params.textColor}
          name="clear"
          onPress={() => {setModalVisible(!modalVisible);}}
        />

      <ScrollView>

      { selectedImage &&
          <ImageShowScreen image={selectedImage}/> }

            {
              
              

        entry.image &&
          <FlatList
          style={{alignSelf:"center"}}
          data={entry.image}
          numColumns={3}
          renderItem={_renderItemFlatList}>

          </FlatList>}

      </ScrollView>

          
        </View>
      </Modal>

      <View style={{
            justifyContent:"space-between",
            paddingBottom:20,
            flex: 0,
            flexDirection:"row",
            paddingHorizontal: 20,
            alignItems:"center",}}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
            { entry.image &&
              <Text style={{fontSize: 18, color:iconColor, fontWeight: "bold"}}>
          Show images..
        </Text>}
        </TouchableOpacity>
        <View style={{justifyContent:"flex-end", flexDirection:"row"}}>
          <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
          <Icons name={'check'} size={30} color={iconColor} style={{marginLeft:10}}/>

          </TouchableOpacity>
        </View>
        </View>

       
      
    </SafeAreaView>
  );
}
