import React, { useContext }from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text, ThemeContext } from "react-native-elements";
import { Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

// theme, setTheme

  const SettingsScreen=(props)=>{
    const theme = props.theme;
    const activeTheme = props.activeTheme

    return(
      <View style={{flex:3,marginRight:25, marginLeft:27, marginBottom:55}}>
        <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon
              color={theme[activeTheme].colors.icon}
              name='moon'
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:theme[activeTheme].colors.text, marginLeft:10}}>Dark Mode</Text>

          </View>
          <View style={{justifyContent:"flex-end"}}>


        <Switch value={activeTheme === 'dark'}
        color={theme[activeTheme].colors.icon}
          onValueChange={()=>{
            props.setActiveTheme(activeTheme === 'dark' ? 'light' : 'dark')
          }}></Switch>

        </View>
        </View>


        <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon
              color={theme[activeTheme].colors.icon}
              name='bell'
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:theme[activeTheme].colors.text, marginLeft:10}}>Daily Reminder Notifications</Text>

          </View>
            
          <View style={{justifyContent:"flex-end"}}>
        <Switch value={props.reminder}
        color={theme[activeTheme].colors.icon}
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
              color={theme[activeTheme].colors.icon}
              name='clock'
              
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:theme[activeTheme].colors.text, marginLeft:10}}>Adjust Reminder Notifications</Text>

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
              color={theme[activeTheme].colors.icon}
              name='arrow-up'
              
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:theme[activeTheme].colors.text, marginLeft:10}}>Export Journals</Text>

          </View>
        </TouchableOpacity>


        <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Icon
              color={theme[activeTheme].colors.icon}
              name='arrow-down'
              type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:theme[activeTheme].colors.text, marginLeft:10}}>Import Journals</Text>

          </View>
            
         
        </TouchableOpacity>

        <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:25, alignItems:"center"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
              <Icon
                color={theme[activeTheme].colors.icon}
                name='lock'
                type='feather'/>
                <Text style={{fontFamily:"Balsamiq-Bold", color:theme[activeTheme].colors.text, marginLeft:10}}>Lock with Fingerprint</Text>
            </View>
          <View style={{justifyContent:"flex-end"}}>
        
        
        
            <Switch value={props.finger}
  
          color={theme[activeTheme].colors.icon}
            onValueChange={ props.fingerPrintLock }></Switch>

        </View>
        </View>
        

      </View>
      
    )
  }


  export default SettingsScreen