import React, { useState } from "react";
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Icon, Text } from "react-native-elements";
import { ToggleButton, Switch } from 'react-native-paper';
import {BlurView} from 'expo-blur';
import * as Font from 'expo-font';

import { useFonts } from '@use-expo/font';

import {LinearGradient} from 'expo-linear-gradient';
import {
  ScrollView,
  FlatList,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  Image,
  
  ImageBackground,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatListProps,
  ListRenderItem,
  StatusBar,
  Button,
  Animated,
} from "react-native";
import Carousel from "react-native-snap-carousel";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadEntries, createEntry, removeEntry } from "../reducers/entries";

import { AppLoading } from 'expo';
import { Entry, HomeProps, IAppState } from "../types";
// import { v4 as uuidv4 } from 'uuid';

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("paperNote.db");
const {height, width} = Dimensions.get('window')

const dummyData: Array<Entry> = [
  {
    id: 1,
    date: new Date("January 29, 2020 13:15:30"),
    content:
      "Sed blandit finibus diam, eget finibus purus interdum at. Aenean ac dictum eros, fermentum ultricies est. Proin at ipsum sit amet dui sollicitudin bibendum. Sed felis felis, pharetra in odio et, egestas dapibus quam.",
  },
  {
    id: 2,
    date: new Date("January 2, 2020 20:15:30"),
    content:
      "Nam blah tortor ex. Praesent congue a nisl et feugiat. Nullam lacus nisl, scelerisque sit amet nunc vitae, sagittis lacinia arcu. Aenean at nisi lorem. Suspendisse potenti. Vestibulum vitae risus enim. Mauris porttitor risus urna, vitae vehicula risus condimentum a.",
  },
  {
    id: 3,
    date: new Date("January 8, 2020 10:15:30"),
    content:
      "Cras et tellus maximus, auctor odio vitae, tristique augue. Donec vitae velit ut leo lobortis tempor. Sed ullamcorper nisl in sapien facilisis efficitur. Vivamus volutpat tempus magna, vitae interdum odio. Nulla egestas nisl dui, eu egestas magna consectetur eleifend. Pellentesque id nisi nisi. Praesent vitae venenatis turpis. Sed tristique odio nisi, at pulvinar nisi blandit quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus urna, iaculis non maximus in, condimentum quis felis. Morbi fermentum vulputate mi, at volutpat dui scelerisque non. In volutpat odio dolor, nec rutrum enim tincidunt a. Duis a odio ac nulla euismod dictum. Aliquam sem dolor, finibus ut ligula sit amet, sagittis feugiat diam. Curabitur commodo enim in nunc maximus, scelerisque efficitur massa cursus. \
        \n\nUt in felis eget ligula laoreet ultrices. Pellentesque aliquet tortor sit amet purus interdum euismod. Duis a erat erat. Sed blandit aliquet semper. Vestibulum euismod eget ex id cursus. Proin lorem odio, malesuada quis sagittis nec, vehicula vel nisi. Mauris metus dolor, scelerisque sit amet risus non, interdum rutrum risus. Fusce id diam lobortis, scelerisque metus vel, aliquam erat. Nunc sit amet nisi et lorem scelerisque venenatis a a eros.",
  },
  {
    id: 4,
    date: new Date("January 18, 2020 12:15:30"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet purus consequat neque pellentesque commodo et in elit. Etiam sagittis quis ligula eu auctor. Vivamus interdum mauris eget ligula euismod vestibulum. Vestibulum tortor lectus, tristique ut nibh ultricies, suscipit eleifend leo. Nullam nisi nisi, placerat vitae commodo quis, pulvinar ut nulla. Vestibulum quis semper massa. Suspendisse velit lectus, dictum at ex in, lacinia ornare libero.",
  },
  {
    id: 5,
    date: new Date("April 16, 2020 11:15:30"),
    content:
      "Today I am grateful for good friends and good food. I'm also able to spend time with my family. Most of all, we are safe and together.",
  },
];

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
  const entry: Entry = props.entry;
  const dispatch = useDispatch();
  // const { width, height } = Dimensions.get("window");
  return (


    
    
    <View
      style={{
        
        flex: 1,
        // minHeight: height/1.23, // replace with dimensions
        backgroundColor: props.cardColor,  //#8249E4
        marginTop: 20,
        marginHorizontal: 7,
        borderRadius: 10,
        shadowColor:"black",
        shadowOffset: {height:20, width:20},
        shadowOpacity:0.9,
        shadowRadius:20


      }}
    >

      {(props.entry.image)&&  
      <Image source={{uri:props.entry.image[0]}} resizeMode="cover" style={{borderTopLeftRadius:10, borderTopRightRadius:10, width:"100%", height:height/4}}></Image>
    }

    {!props.entry.image&&
      <Image source={require("../assets/ab2.jpg")} resizeMode="cover" style={{borderTopLeftRadius:10, borderTopRightRadius:10, width:"100%", height:height/4}}></Image>
    }

 <View style={{
            justifyContent:"space-between",
            flex: 0,
            paddingHorizontal:15,
            paddingTop:15,
            alignItems:"center",
            flexDirection:"row",}}>
        <Text style={{ fontSize: 20, fontWeight: "700", color:props.textColor}}>
        {isToday(entry.date)
          ? "Today"
          : isYesterday(entry.date)
          ? "Yesterday"
          : entry.date.toDateString()}
      </Text>
        <View style={{justifyContent:"flex-end", flexDirection:"row"}}>

          <TouchableOpacity onPress={() => { }}>
          <Icon
          color={props.textColor}
        style={{justifyContent: "flex-end"}}
          name="clear"
          onPress={() => {
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
          }}
        />

          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:3, paddingHorizontal:15,}}>
      
      <Text style={{ fontSize: 17, marginTop: 10, color:props.textColor }}>
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

          </FlatList></View>}
      

      
    </View>
  );
};

const _onError: SQLite.SQLTransactionErrorCallback | undefined = (e) => {
  console.warn(e);
};

const _onSuccess: SQLite.SQLVoidCallback | undefined = () => {
  console.log("Success loading database");
};

export default function Home({ navigation }: HomeProps) {
  const [bgColor, setBgColor] = useState("#fff")
  const [textColor, setTextColor] = useState("#131d27")
  const [iconColor, setIconColor] = useState("#01d4bf")
  const [cardColor, setCardColor] = useState("#f8d69c")
  const [cardTextColor, setCardTextColor] = useState("#fff")
  const [backTopColor,setBackTopColor ] = useState('#ededed')
  const [backBottomColor,setBackBottomColor ] = useState('#ededed')
  const [cardType,setCardType] = useState("light")
  const [settingToggle, setSettingToggle] = useState(false)

  let [fontsLoaded] = useFonts({
    'Balsamiq-Bold': require('../assets/fonts/BalsamiqSans-Bold.ttf'),
    'Balsamiq-Regular': require('../assets/fonts/BalsamiqSans-Regular.ttf'),
  });

  

  const [theme,setTheme] = useState(true)  

  // const [entries, setEntires] = useState(data);
  //   const entries: Array<Entry> = useSelector(state => state.entries);
  // const windowHeight = useWindowDimensions().height;
  let entries = useSelector((state: IAppState) => state.entries);
  const dispatch = useDispatch();

  React.useEffect(() => {
    db.transaction(
      (tx) => {
        // tx.executeSql(
        //   `DROP TABLE entries`
        // );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS entries (
          id TEXT PRIMARY_KEY,
          content TEXT NOT NULL,
          created_time INT NOT NULL
        )`
        );

        // tx.executeSql(
        //   `INSERT into entries(id, content, created_time) values ('1', 'testbody1', '1587568912445');`
        // );

        // tx.executeSql(
        //   `INSERT into entries(id, content, created_time) values ('2', 'testbody2', '1587568912445');`
        // );

        tx.executeSql(
          "SELECT id, content, created_time from entries;",
          [],
          (_, { rows }) => {
            // @ts-ignore
            let result = rows._array.map((x) => ({
              ...x,
              date: new Date(x.created_time),
            }));
            // console.log(result);
            dispatch(loadEntries(result.concat(dummyData)));
          }
        );
      },
      _onError,
      _onSuccess
    );
    
  }, []);


  React.useEffect(()=>{
    if(theme){
      setBgColor("#f1f2fa")
      setTextColor("#131d27")
      setCardTextColor("#161616")
      setCardColor("#fff")
      setBackBottomColor('#fea09c')
      setBackTopColor('#fdc7d5')
      setCardType("light")
    }
    else{
      setBgColor("#161616")
      setCardColor("#1a1a1a")
      setCardTextColor("white")
      setTextColor("#ededed")
      setBackBottomColor('#2d455d')
      setBackTopColor('#2d455d')
      setCardType("dark")

    }
  },[theme])

  // if (entries.length && !isToday(entries[0].date)) {
  //   const today = new Date();
  //   const entryForToday: Entry = {
  //     id: entries.length + 1,
  //     content: "",
  //     date: today,
  //   };
  //   dispatch(createEntry(entryForToday));
  // }

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
              entryId: item.id, backgroundColor:bgColor, textColor:textColor, iconColor:iconColor
            })
          }
          key={item.id}
          style={{
            flex: 1,
          }}
        >
         <JournalEntry entry={item} cardColor={cardColor} textColor={cardTextColor} iconColor={cardTextColor} cardType={cardType}/>
        </TouchableOpacity>
        
      </View>
    );
  };



  const Settings=()=>{
    return(
      <View style={{flex:3,marginHorizontal:25, marginBottom:55}}>
        <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:15}}>
          <Text style={{fontFamily:"Balsamiq-Bold", color:textColor}}>Dark Mode</Text>
          <View style={{justifyContent:"flex-end"}}>
        <Switch value={!theme}
          onValueChange={()=>{
            setTheme(!theme)
          }}></Switch>

        </View>
        </View>
        
        

      </View>
      
    )
  }

  const BottomTab=()=>{
    return(
      <View style={{ flex: 0, alignItems: 'center', backgroundColor:cardColor, marginHorizontal:20, marginBottom:20, padding:25,borderRadius:15}}>
          


 <View style={{
   width:"100%",
            justifyContent:"space-between",
            flex: 0,
            paddingHorizontal:15,
            alignItems:"center",
            flexDirection:"row",}}>

              <View style={{justifyContent:"flex-start"}}>

          <TouchableOpacity onPress={() => { 
            const newEntry = {
              id: Math.round(Math.random() * 1000000),
              date: new Date(),
              content: "",
            };
  
            db.transaction(
              (tx) => {
                tx.executeSql(
                  "INSERT into entries(id, content, created_time) values (?, ?, ?)",
                  [newEntry.id, newEntry.content, newEntry.date.getTime()],
                  () => console.log("Insert success"),
                  (t, e) => {
                    console.log("Insert failed");
                    return false;
                  }
                );
              },
              () => console.log("creation failed"),
              () => console.log("creation successful")
            );
  
            dispatch(createEntry(newEntry));
  
            navigation.navigate("Editor", {
              entryId: newEntry.id, backgroundColor:bgColor, textColor:textColor, iconColor:iconColor
            });
            setSettingToggle(false)
          }}>
          <Icon
          color="#01d4bf"
          name="add"
        />

          </TouchableOpacity>
        </View>
        <View style={{justifyContent:"center"}}>

        <TouchableOpacity onPress={()=>{ setSettingToggle(false)}}><Icon
          color="#01d4bf"
          name="home"
        /></TouchableOpacity>
        
      </View>

        <View style={{justifyContent:"flex-end"}}>

        <TouchableOpacity
          onPress={()=>{ setSettingToggle(true)}}>
        <Icon
          color="#01d4bf"
          name="settings"
        />

        </TouchableOpacity>
          
        </View>
      </View>
          
        </View>
    )
  }

  const { width, height } = Dimensions.get("window");
  

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={{ flex: 1, paddingTop:50, backgroundColor:bgColor}}>
      {/* <LinearGradient
          colors={[backTopColor, backBottomColor]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: height+80,
          }}
        /> */}
      {/* <Image source={require("../assets/ab2.jpg")}  blurRadius={10} style={{flex:1,opacity:0.9, position:"absolute",height:"110%", width:"100%", }} resizeMode="cover"></Image> */}
      <View style={{flex: .4, paddingHorizontal:20, justifyContent:"center", flexDirection:"row"}}>
      {settingToggle &&
      <Text style={{fontFamily:"Balsamiq-Bold", fontSize:20, color:textColor}}>Settings</Text>}
        {!settingToggle &&
      <Text style={{fontFamily:"Balsamiq-Bold", marginTop:10, fontSize:20, color:textColor}}>Welcome to Thankfully</Text>}
        
        </View>
        
        {!settingToggle &&
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
        /></View>}

        {settingToggle &&
        <Settings></Settings>}

        <BottomTab></BottomTab>
     
      
      
    </View>
  );
  }
}
