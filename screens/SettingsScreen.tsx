import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

  const SettingsScreen=(props)=>{
    return(
      <View style={{flex:3,marginRight:25, marginLeft:27, marginBottom:55}}>
        <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon
              color={props.iconColor}
              name='moon'
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:props.textColor, marginLeft:10}}>Dark Mode</Text>

          </View>
          <View style={{justifyContent:"flex-end"}}>
        <Switch value={!props.theme}
        color='#cf3d43'
          onValueChange={()=>{
            props.setTheme(!props.theme)
          }}></Switch>

        </View>
        </View>


        <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon
              color={props.iconColor}
              name='bell'
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:props.textColor, marginLeft:10}}>Daily Reminder Notifications</Text>

          </View>
            
          <View style={{justifyContent:"flex-end"}}>
        <Switch value={props.reminder}
        color='#cf3d43'
          onValueChange={()=>{
            props.setReminder(!props.reminder)
          }}></Switch>

        </View>
        </View>

        {props.reminder &&
          <TouchableOpacity
          onPress={()=>{
            props.setShow1(true)
          }}
          style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon
              color={props.iconColor}
              name='clock'
              
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:props.textColor, marginLeft:10}}>Adjust Reminder Notifications</Text>

          </View>
            
        </TouchableOpacity>
        }

        {props.show1&&
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={props.time}
          mode='time'
          is24Hour={false}
          onChange={props.onTimeSelect}
        />
        } 
        
        


        
        <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon
              color={props.iconColor}
              name='arrow-up'
              
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:props.textColor, marginLeft:10}}>Export Journals</Text>

          </View>
        </TouchableOpacity>


        <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon
              color={props.iconColor}
              name='arrow-down'
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:props.textColor, marginLeft:10}}>Import Journals</Text>

          </View>
            
          {/* <View style={{justifyContent:"flex-end"}}>
        <Switch value={!theme}
        color='#cf3d43'
          onValueChange={()=>{
            setTheme(!theme)
          }}></Switch>

        </View> */}
        </TouchableOpacity>

        <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
              <Icon
                color={props.iconColor}
                name='lock'
                type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:props.textColor, marginLeft:10}}>Lock with Fingerprint</Text>
            </View>
          <View style={{justifyContent:"flex-end"}}>
        
        
        
            <Switch value={props.finger}
  
          color='#cf3d43'
            onValueChange={ props.fingerPrintLock }></Switch>

        </View>
        </View>
        

      </View>
      
    )
  }


  export default SettingsScreen