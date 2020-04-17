import React, { useState } from "react";
import { Icon, Text } from "react-native-elements";
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import Carousel from "react-native-snap-carousel";

import { Entry } from "../types";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadEntries } from "../reducers/entries";

const data: Array<Entry> = [
  // {
  //   id: -1,
  //   date: new Date("April 15, 2020 11:15:30"),
  //   content:
  //     "test",
  // },
  // {
  //   id: 0,
  //   date: new Date("April 17, 2020 12:15:30"),
  //   content:
  //     "Sed blandit finibus diam, eget finibus purus interdum at. Aenean ac dictum eros, fermentum ultricies est. Proin at ipsum sit amet dui sollicitudin bibendum. Sed felis felis, pharetra in odio et, egestas dapibus quam.",
  // },
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

const JournalEntry = (props: any) => {
  const entry: Entry = props.entry;
  const { type } = entry;
  // const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        flex: 1,
        // minHeight: height/1.23, // replace with dimensions
        backgroundColor: "white",
        padding: 16,
        elevation: 4,
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 7,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "700" }}>
        {isToday(entry.date)
          ? "Today"
          : isYesterday(entry.date)
          ? "Yesterday"
          : entry.date.toDateString()}
      </Text>
      {entry.type != null ? (
        <Text style={{ flex:1 ,fontSize: 38, marginBottom: 60 , textAlign: 'center' ,textAlignVertical: 'center'}}>What are you grateful for today?</Text>
      ) : (
        <Text style={{ fontSize: 20, marginTop: 10 }}>{entry.content.length > 600 ? entry.content.slice(0, 600) + '...' : entry.content}</Text>
      )}
    </View>
  );
};

export default function Home({ navigation }) {
  // const [entries, setEntires] = useState(data);
  const { width, height } = Dimensions.get("window");
  //   const entries: Array<Entry> = useSelector(state => state.entries);
  // const windowHeight = useWindowDimensions().height;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadEntries(data));
  }, []);

  let entries = useSelector((state) => state.entries).sort(
    (a, b) => b.date - a.date
  );

  if (entries.length && !isToday(entries[0].date)) {
    entries = [
      { id: entries.length + 1, date: Date.now(), type: "today" },
      ...entries,
    ];
  }

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Editor", {
            entryId: item.id,
            entryDate: item.date,
          })
        }
        key={item.id}
        style={{
          flex: 1,
        }}
      >
        <JournalEntry entry={item} />
      </TouchableOpacity>
    );
  };

  // const sliderWidth = width;
  // const itemWidth = width - 30;
  return (
    <View style={{ flex: 1, backgroundColor: "steelblue" }}>
      <Carousel
        data={entries}
        renderItem={_renderItem}
        sliderWidth={width/1 }
        itemWidth={width/1.2 }
        // layout={'stack'}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "pink", width: width }}>
        {entries.length && !isToday(entries[0].date) ? (
          <View style={{ flex: 1, marginTop: 10 }}>
            <View
              style={{
                flex: 1,
                minHeight: 40,
                backgroundColor: "#fafafafa",
                // padding: 16,
                // borderWidth: 3,
                alignItems: "center",
                elevation: 4,
                // marginBottom: 10,
                marginHorizontal: 7,
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 20, padding: 8 }}>
                What are you grateful for today?
              </Text>

              <Icon
                raised
                iconStyle={
                  {
                    // width: 40,
                    // height: 40,
                    // padding: 4,
                  }
                }
                onPress={() =>
                  navigation.navigate("Editor", {
                    entryId: entries.length + 1,
                    entryDate: Date.now(),
                  })
                }
                name="create"
              />
            </View>
          </View>
        ) : null}
        <View style={{ flex: 1, marginTop: 10 }}>
          {entries.map((entry) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Editor", {
                    entryId: entry.id,
                    entryDate: entry.date,
                  })
                }
                key={entry.id}
              >
                <JournalEntry entry={entry} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
