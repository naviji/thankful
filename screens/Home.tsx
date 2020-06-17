import React, { useState, useContext } from "react";
import { ThemeContext, Text } from "react-native-elements";
import JournalEntry from '../screens/JournalEntry'
import BottomTab from '../screens/BottomTab';
import SettingsScreen from '../screens/SettingsScreen';
import { Dimensions, TouchableOpacity, View, ListRenderItem, } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useSelector, useDispatch } from "react-redux";
import { loadEntries, createEntry, } from "../reducers/entries";
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
    image: [],
  },
  {
    id: 2,
    date: new Date("January 2, 2020 20:15:30"),
    content:
      "Nam blah tortor ex. Praesent congue a nisl et feugiat. Nullam lacus nisl, scelerisque sit amet nunc vitae, sagittis lacinia arcu. Aenean at nisi lorem. Suspendisse potenti. Vestibulum vitae risus enim. Mauris porttitor risus urna, vitae vehicula risus condimentum a.",
    image: [],
  },
  {
    id: 3,
    date: new Date("January 8, 2020 10:15:30"),
    content:
      "Cras et tellus maximus, auctor odio vitae, tristique augue. Donec vitae velit ut leo lobortis tempor. Sed ullamcorper nisl in sapien facilisis efficitur. Vivamus volutpat tempus magna, vitae interdum odio. Nulla egestas nisl dui, eu egestas magna consectetur eleifend. Pellentesque id nisi nisi. Praesent vitae venenatis turpis. Sed tristique odio nisi, at pulvinar nisi blandit quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus urna, iaculis non maximus in, condimentum quis felis. Morbi fermentum vulputate mi, at volutpat dui scelerisque non. In volutpat odio dolor, nec rutrum enim tincidunt a. Duis a odio ac nulla euismod dictum. Aliquam sem dolor, finibus ut ligula sit amet, sagittis feugiat diam. Curabitur commodo enim in nunc maximus, scelerisque efficitur massa cursus. \
        \n\nUt in felis eget ligula laoreet ultrices. Pellentesque aliquet tortor sit amet purus interdum euismod. Duis a erat erat. Sed blandit aliquet semper. Vestibulum euismod eget ex id cursus. Proin lorem odio, malesuada quis sagittis nec, vehicula vel nisi. Mauris metus dolor, scelerisque sit amet risus non, interdum rutrum risus. Fusce id diam lobortis, scelerisque metus vel, aliquam erat. Nunc sit amet nisi et lorem scelerisque venenatis a a eros.",
    image: [],
  },
  {
    id: 4,
    date: new Date("January 18, 2020 12:15:30"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet purus consequat neque pellentesque commodo et in elit. Etiam sagittis quis ligula eu auctor. Vivamus interdum mauris eget ligula euismod vestibulum. Vestibulum tortor lectus, tristique ut nibh ultricies, suscipit eleifend leo. Nullam nisi nisi, placerat vitae commodo quis, pulvinar ut nulla. Vestibulum quis semper massa. Suspendisse velit lectus, dictum at ex in, lacinia ornare libero.",
    image: [],
  },
  {
    id: 5,
    date: new Date("April 16, 2020 11:15:30"),
    content:
      "Today I am grateful for good friends and good food. I'm also able to spend time with my family. Most of all, we are safe and together.",
    image: [],
  }
];

const _onError: SQLite.SQLTransactionErrorCallback | undefined = (e) => {
  console.warn(e);
};

const _onSuccess: SQLite.SQLVoidCallback | undefined = () => {
  console.log("Success loading database");
};



export default function Home({ navigation }: HomeProps) {
  const { theme } = useContext(ThemeContext);
  const [activeTheme, setActiveTheme] = useState("light")
  
  const [reminder, setReminder] = useState(false)
  
  const [time, setTime] = useState(new Date(Date.now()));
  const [date, setDate] = useState(new Date(Date.now()));
  const [showCalendar, setShowCalendar] = useState(false);
  const [showClock, setShowClock] = useState(false);
  
  const [settingToggle, setSettingToggle] = useState(false)

  const [fingerLockEnabled, setFingerLockEnabled] = useState(false)

  // let [fontsLoaded] = useFonts({
  //   'Balsamiq-Bold': require('../assets/fonts/BalsamiqSans-Bold.ttf'),
  //   'Balsamiq-Regular': require('../assets/fonts/BalsamiqSans-Regular.ttf'),
  // });
  
  let entries = useSelector((state: IAppState) => state.entries);
  const dispatch = useDispatch();

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
            // @ts-ignore
            let result = rows._array.map((x) => ({
              ...x,
              date: new Date(x.created_time),
            }));
            dispatch(loadEntries(result.concat(dummyData)));
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

  // React.useEffect(()=>{
    
  // },[theme])

  // TODO: Add today card
  // if (entries.length && !isToday(entries[0].date)) {
  //   const today = new Date();
  //   const entryForToday: Entry = {
  //     id: entries.length + 1,
  //     content: "",
  //     date: today,
  //   };
  //   dispatch(createEntry(entryForToday));
  // }

  const onChange = (event, selectedDate) => {
    console.log(event)
    if(event.type==="dismissed"){
    setShowCalendar(false)

    }
    else{
    const currentDate = selectedDate || date;
    setShowCalendar(false)
    // setDate(currentDate);
    // console.log(currentDate)
    const newEntry = {
              id: Math.round(Math.random() * 1000000),
              date: new Date(selectedDate),
              content: "",
              image: [],
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
              entryId: newEntry.id, backgroundColor:theme[activeTheme].colors.card, textColor:theme[activeTheme].colors.text, iconColor:theme[activeTheme].colors.icon
            });
            setSettingToggle(false)
  };
}


const onTimeSelect = (event, selectedTime) => {
  console.log(event)
  if(event.type==="dismissed"){
    setShowClock(false)

  }
  else{
    const currentDate = selectedTime || date;
    setShowClock(false)
    setTime(selectedTime);
    console.log(selectedTime)
  }
}

  const fingerPrintLockToggle=()=>{
    setFingerLockEnabled(!fingerLockEnabled)
  }

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
              entryId: item.id, backgroundColor:theme[activeTheme].colors.background, textColor:theme[activeTheme].colors.text, iconColor:theme[activeTheme].colors.icon
            })
          }
          key={item.id}
          style={{
            flex: 1,
          }}
        >
         <JournalEntry entry={item} cardColor={theme[activeTheme].colors.card} textColor={theme[activeTheme].colors.text} iconColor={theme[activeTheme].colors.icon} />
        </TouchableOpacity>
        
      </View>
    );
  };

  const { width, height } = Dimensions.get("screen");
  
  return (
    <View style={{ flex: 1, paddingTop:50, backgroundColor:theme[activeTheme].colors.background}}>

      {/* Refactor with Settings title in the title screen itself.  */}
      
      <View style={{flex: .4, paddingHorizontal:20, justifyContent:"center", flexDirection:"row"}}>
      {settingToggle &&
      <Text style={{fontFamily:"Balsamiq-Bold", fontSize:20, color:theme[activeTheme].colors.text}}>Settings</Text>}
        {!settingToggle &&
      <Text style={{fontFamily:"Balsamiq-Bold", marginTop:10, fontSize:20, color:theme[activeTheme].colors.text}}>Welcome to Thankfully</Text>}
        
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

        {/* theme, setTheme */}
        {settingToggle &&
        <SettingsScreen {...{reminder, setReminder,
                        setShowClock, showClock, time, onTimeSelect, fingerLockEnabled, fingerPrintLockToggle, activeTheme, setActiveTheme, theme}}></SettingsScreen>
        }

        <BottomTab {...{showCalendar, date, onChange, setSettingToggle, setShowCalendar}}></BottomTab>
        
    </View>
  );
}
