import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AppState,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Button, colors } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";
import { updateEntry, createEntry, removeEntry } from "../reducers/entries";
import { EditorProps, IAppState, Entry } from "../types";

import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase("paperNote.db")

export default function Editor({ route, navigation }: EditorProps) {
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

  let entries = useSelector((state: IAppState) => state.entries);

  const entry: Entry | undefined = entries.find((x) => x.id === entryId);
  if (entry === undefined) {
    throw new Error("Entry not found!");
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <View
        style={{
          flex: 0,
          backgroundColor: "steelblue",
          paddingHorizontal: 20,
          minHeight: 40,
          borderBottomColor: "black",
          borderBottomWidth: 3,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "700", color: "white" }}>
          Today
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "700", color: "white" }}>
          I am thankful for
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          defaultValue={entry.content}
          value={entry.content}
          // onChange={(e) => dispatch(updateEntry({...entry, content: e.nativeEvent.text}))}
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
          multiline
          //    textBreakStrategy="balanced"
          style={{
            flex: 6,
            // alignItems: 'stretch',
            textAlignVertical: "top",
            // backgroundColor: 'pink',
            padding: 10,
            fontSize: 20,
            fontWeight: "300",
          }}
        />

        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Button
            onPress={() => navigation.navigate("Home")}
            buttonStyle={{
              width: 100,
              height: 40,
              backgroundColor: "black",
              marginHorizontal: 10,
              marginBottom: 10,
              // position: 'absolute',
            }}
            title="Save"
          />
        </View>
      </View>

      <View
        style={{
          flex: 0,
          padding: 20,
          borderTopColor: "black",
          borderTopWidth: 3,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "200", textAlign: "center" }}>
          "Gratitude is the quickest way to happiness"
        </Text>
      </View>
    </SafeAreaView>
  );
}
