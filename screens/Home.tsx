
import React from 'react';
import { ScrollView ,Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

interface Entry {
    id: number,
    date: object,
    content: string
}

const entries: Array<Entry> = [
    {
        id: 1,
        date: new Date(),
        content: "Sed blandit finibus diam, eget finibus purus interdum at. Aenean ac dictum eros, fermentum ultricies est. Proin at ipsum sit amet dui sollicitudin bibendum. Sed felis felis, pharetra in odio et, egestas dapibus quam."
    },
    { id: 2,
        date: new Date(),
        content: "Nam nec tortor ex. Praesent congue a nisl et feugiat. Nullam lacus nisl, scelerisque sit amet nunc vitae, sagittis lacinia arcu. Aenean at nisi lorem. Suspendisse potenti. Vestibulum vitae risus enim. Mauris porttitor risus urna, vitae vehicula risus condimentum a."
    },
    { id: 3,
        date: new Date(),
        content: "Cras et tellus maximus, auctor odio vitae, tristique augue. Donec vitae velit ut leo lobortis tempor. Sed ullamcorper nisl in sapien facilisis efficitur. Vivamus volutpat tempus magna, vitae interdum odio. Nulla egestas nisl dui, eu egestas magna consectetur eleifend. Pellentesque id nisi nisi. Praesent vitae venenatis turpis. Sed tristique odio nisi, at pulvinar nisi blandit quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus urna, iaculis non maximus in, condimentum quis felis. Morbi fermentum vulputate mi, at volutpat dui scelerisque non. In volutpat odio dolor, nec rutrum enim tincidunt a. Duis a odio ac nulla euismod dictum. Aliquam sem dolor, finibus ut ligula sit amet, sagittis feugiat diam. Curabitur commodo enim in nunc maximus, scelerisque efficitur massa cursus. \
        \n\nUt in felis eget ligula laoreet ultrices. Pellentesque aliquet tortor sit amet purus interdum euismod. Duis a erat erat. Sed blandit aliquet semper. Vestibulum euismod eget ex id cursus. Proin lorem odio, malesuada quis sagittis nec, vehicula vel nisi. Mauris metus dolor, scelerisque sit amet risus non, interdum rutrum risus. Fusce id diam lobortis, scelerisque metus vel, aliquam erat. Nunc sit amet nisi et lorem scelerisque venenatis a a eros."
    },
    { id: 4,
        date: new Date(),
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet purus consequat neque pellentesque commodo et in elit. Etiam sagittis quis ligula eu auctor. Vivamus interdum mauris eget ligula euismod vestibulum. Vestibulum tortor lectus, tristique ut nibh ultricies, suscipit eleifend leo. Nullam nisi nisi, placerat vitae commodo quis, pulvinar ut nulla. Vestibulum quis semper massa. Suspendisse velit lectus, dictum at ex in, lacinia ornare libero."
    },
]

const JournalEntry = (props: any) =>  {
    const entry: Entry = props.entry;
    return (
        <View style={{minHeight: 100,
        backgroundColor: 'white',
        padding: 5,
        elevation: 4,
        marginBottom: 10,
        marginHorizontal: 7,
        }}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>
                {entry.date.toLocaleString()}
            </Text>
            <Text>
                {entry.content}
            </Text>
        </View>
    )
}

export default function Home() {
    const {width, height} = Dimensions.get('window')
    // const windowHeight = useWindowDimensions().height;
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#eee', width: width}}>
        {
            entries.map(entry => <JournalEntry key={entry.id} entry={entry}/> )
        }
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visible: {
      borderColor: 'red',
      borderWidth: 2,
    //   flexDirection: 'row',
  }
});
