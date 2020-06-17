import React from "react";
import { Icon } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, View } from "react-native";

  const BottomTab=(props)=>{
    return(
      <View style={{ flex: 0, alignItems: 'center', backgroundColor:props.cardColor, marginHorizontal:10, marginBottom:10, padding:25,borderRadius:15}}>
          
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
          value={props.date}
          is24Hour={true}
          display="calendar"
          style={{}}
          onChange={props.onChange}
        />} 

          <TouchableOpacity onPress={() => {             
            props.setShowCalendar(true)
          }}>
          <Icon
          color={props.iconColor}
          name='calendar'
          type='feather'
        />

          </TouchableOpacity>
        </View>
        <View style={{justifyContent:"center"}}>

        <TouchableOpacity onPress={()=>{ props.setSettingToggle(false)}}><Icon
          color={props.iconColor}
          name='home'
          type='feather'
        /></TouchableOpacity>
        
      </View>

        <View style={{justifyContent:"flex-end"}}>

        <TouchableOpacity
          onPress={()=>{ props.setSettingToggle(true)}}>
        <Icon
          color={props.iconColor}
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