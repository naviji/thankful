
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
  Editor: { entryId: number };
  ImageShow: {image:string}
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

type ImageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ImageShow'
>;

type ImageScreenRouteProp = RouteProp<RootStackParamList, 'ImageShow'>;

export type ImageShowProps = {
  navigation: ImageScreenNavigationProp
  route: ImageScreenRouteProp
};






export interface IAppState{
    readonly entries: Entry[];
}

