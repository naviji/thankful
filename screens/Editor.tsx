import React, {useState} from "react";
import { Icon } from "react-native-elements";
import Icons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from '@use-expo/font';
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
import { AppLoading } from 'expo';

import * as SQLite from 'expo-sqlite'
import ImageShowScreen from "./ImageShowScreen";
const db = SQLite.openDatabase("paperNote.db")

const {height, width} = Dimensions.get('window')

export default function Editor({ route, navigation }: EditorProps) {


  
  
  let [fontsLoaded] = useFonts({
    'Balsamiq-Bold': require('../assets/fonts/BalsamiqSans-Bold.ttf'),
    'Balsamiq-Regular': require('../assets/fonts/BalsamiqSans-Regular.ttf'),
  });

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
      allowsEditing:true,
      aspect:[6,5]
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
      <Image key={obj.item} source={{uri:obj.item}} style={{height:width/3.1, width:width/3.1,margin:1.5,borderRadius:10}}></Image>
    </TouchableHighlight>
)

if (!fontsLoaded) {
  return <AppLoading />;
} else {
  return (
    <SafeAreaView style={{ flex: 1,  backgroundColor:bgColor,}}>
      <ScrollView>
      {entry &&
        <View style={{
            justifyContent:"space-between",
            paddingTop:23.5,
            flex: 0,
            flexDirection:"row",
            paddingHorizontal: 20,
            alignItems:"center",}}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon 
          type='simple-line-icon' name={'like'} color={iconColor}/>
        </TouchableOpacity>
        {/* <View style={{justifyContent:"flex-end", flexDirection:"row"}}>
          <TouchableOpacity onPress={() => { getPhotoPermission(); }}>
          <Icons name={'attach-file'} size={30} color={iconColor} style={{marginLeft:10}}/>

          </TouchableOpacity>
        </View> */}
      </View>
      
}
  <Text style={{fontSize: 20, fontFamily:"Balsamiq-Bold", marginHorizontal:20, marginTop:20, color:textColor}}>
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
            fontFamily:"Balsamiq-Regular",
          }}
        />

      </View>

      </ScrollView>

      

      }
      </ScrollView>
      

      
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={false}
        
        onRequestClose={()=>{setModalVisible(!modalVisible);}}
       >
      <View style={{flex:1, backgroundColor:route.params.backgroundColor}}>
            <View style={{ marginTop: 8, marginHorizontal: 8, justifyContent:"space-between", flexDirection:"row",alignItems:"center"}}>
              <Icon
              raised
              color={iconColor}
          name="clear"
          onPress={() => {setModalVisible(!modalVisible);}}
        />
        {selectedImage &&
        <Icon name="trash" type="simple-line-icon" color={iconColor} raised
        onPress={()=>{
    dispatch(updateEntry({...entry, image:[...entry.image?.filter((value)=>(value!==selectedImage))] }))
    setselectedImage(null)
    

        }}></Icon>
        }

              <Icon
              raised
              color={iconColor}
          name="picture"
          type="simple-line-icon"
          onPress={() => {getPhotoPermission();}}
        /></View>
      <ScrollView>

      { selectedImage &&
          <ImageShowScreen image={selectedImage}/> }
{/* 
{ selectedImage &&
<View  style={{alignItems:"center"}}>
          <Icon name="trash" type="simple-line-icon" color={iconColor} raised
          onPress={()=>{
      dispatch(updateEntry({...entry, image:[...entry.image?.filter((value)=>(value!==selectedImage))] }))
      setselectedImage(null)

          }}></Icon>
          </View>} */}
            {
              
              

        entry.image &&
          <FlatList
          style={{alignSelf:"center",marginTop:18}}
          data={entry.image}
          numColumns={3}
          
          renderItem={_renderItemFlatList}>

          </FlatList>}

      </ScrollView>

          
        </View>
      </Modal>

      <View style={{
            justifyContent:"space-between",
            paddingVertical:20,
            flex: 0,
            flexDirection:"row",
            paddingHorizontal: 20,
            alignItems:"center",}}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
            { entry.image &&
              <Text style={{fontSize: 18, color:iconColor, fontFamily:"Balsamiq-Bold",}}>
          IMAGES OF THE DAY
        </Text>}
        </TouchableOpacity>
        <View style={{justifyContent:"flex-end", flexDirection:"row"}}>
          <TouchableOpacity onPress={() => {getPhotoPermission();}}>
          <Icon 
          name='picture'
          type='simple-line-icon' color={iconColor} style={{marginLeft:10}}/>

          </TouchableOpacity>
        </View>
        </View>

       
      
    </SafeAreaView>
  );
            }
}
