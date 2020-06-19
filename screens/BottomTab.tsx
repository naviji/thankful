import React, { useContext, useState } from "react";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, View, Dimensions } from "react-native";
import { ThemeContext } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeScreenNavigationProp } from "../types";
import {Calendar} from 'react-native-calendars';
import { black } from "react-native-paper/lib/typescript/src/styles/colors";

// const onChange = (event, selectedDate) => {
//   console.log(event)
//   if(event.type==="dismissed"){
//   setShowCalendar(false)

//   }
//   else{
//   const currentDate = selectedDate || date;
//   setShowCalendar(false)
//   const newEntry = {
//             id: Math.round(Math.random() * 1000000),
//             date: new Date(selectedDate),
//             content: "",
//             image: [],
//           };

//           db.transaction(
//             (tx) => {
//               tx.executeSql(
//                 "INSERT into entries(id, content, created_time) values (?, ?, ?)",
//                 [newEntry.id, newEntry.content, newEntry.date.getTime()],
//                 () => console.log("Insert success"),
//                 (t, e) => {
//                   console.log("Insert failed");
//                   return false;
//                 }
//               );
//             },
//             () => console.log("creation failed"),
//             () => console.log("creation successful")
//           );

//           dispatch(createEntry(newEntry));

//           navigation.navigate("Editor", {
//             entryId: newEntry.id, theme
//           });
//           setSettingToggle(false)
//   }
// }

const BottomTab = (props: { navigation: HomeScreenNavigationProp }) => {
  const { theme } = useContext(ThemeContext);
  const [showCalendar, setShowCalendar] = useState(false);

  // const [date, setDate] = useState(new Date(Date.now()));
  const { width, height } = Dimensions.get("screen");

  return (
    <View
      style={{
        backgroundColor: theme.colors?.primary,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 25,
        borderRadius: 15,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
{/* 
float:left;
    display:block;
    .border-box;
    background:white;
    width:300px;
    border:solid 1px @border-colour;
    margin-bottom:10px;
     */}


     {showCalendar && 
      <View style={{
        position: "absolute",
        bottom: (height-315)/2,                                             
        right: (width-300)/2 - 10,
        width: 300,
        height: 320,
        elevation: 5,
        // borderColor: "black",
        // borderWidth: 1,
      }}>
      <Calendar onDayPress={(day) => {console.log('selected day', day)}}/>
      </View>
     
     
     }
    
        <View>
          <TouchableOpacity
            onPress={() => {
              setShowCalendar(!showCalendar);
            }}
          >
            <Icon name="calendar" type="feather" />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              props.setSettingToggle(false);
            }}
          >
            <Icon name="home" type="feather" />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Settings")}
            // onPress={()=>{ props.setSettingToggle(true)}}
          >
            <Icon name="settings" type="feather" />
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default BottomTab;
