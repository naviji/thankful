import React, { useContext, useState }from "react";
import { Icon } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";



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

const BottomTab=(props)=>{
  const { theme } = useContext(ThemeContext);
  if (!theme.colors) {
    throw new Error("No colors in theme")
  }

  
  // const [showCalendar, setShowCalendar] = useState(false);
  
    // const [date, setDate] = useState(new Date(Date.now()));
  
    return(
      <View style={{ flex: 0, alignItems: 'center', backgroundColor:theme.colors.primary, marginHorizontal:10, marginBottom:10, padding:25,borderRadius:15}}>
          
 <View style={{
   width:"100%",
            justifyContent:"space-between",
            flex: 0,
            paddingHorizontal:15,
            alignItems:"center",
            flexDirection:"row",}}>

              <View style={{justifyContent:"flex-start"}}>
             {props.showCalendar&&<DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={new Date(Date.now())}
          is24Hour={true}
          display="calendar"
          style={{}}
          onChange={props.onChange}
        />} 

          <TouchableOpacity onPress={() => {             
            props.setShowCalendar(true)
          }}>
          <Icon
          name='calendar'
          type='feather'
        />

          </TouchableOpacity>
        </View>
        <View style={{justifyContent:"center"}}>

        <TouchableOpacity onPress={()=>{ props.setSettingToggle(false)}}><Icon
          name='home'
          type='feather'
        /></TouchableOpacity>
        
      </View>

        <View style={{justifyContent:"flex-end"}}>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Settings")
          }
          // onPress={()=>{ props.setSettingToggle(true)}}
          >
        <Icon
          name="settings"
          type='feather'
        />

        </TouchableOpacity>
          
        </View>
      </View>
          
        </View>
    )
  }


  export default BottomTab;