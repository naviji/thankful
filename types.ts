
import { StackNavigationProp } from '@react-navigation/stack';

import { RouteProp } from '@react-navigation/native';


export interface Entry {
    id: number,
    date: Date,
    image?: Array<string>,
    content: string
}

export type RootStackParamList = {
  Home: undefined;
  Editor: { entryId: number, backgroundColor:string, textColor:string, iconColor:string };
  Wait:undefined;
};

type WaitNavigationProps = StackNavigationProp<RootStackParamList, 'Wait'>
export type WaitNavProps={
  navigation:WaitNavigationProps
};

type EditorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Editor'
>;

type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>;

export type EditorProps = {
  navigation: EditorScreenNavigationProp
  route: EditorScreenRouteProp
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type HomeProps = {
  navigation: HomeScreenNavigationProp
  route: HomeScreenRouteProp
};



export interface IAppState{
    readonly entries: Entry[];
}

