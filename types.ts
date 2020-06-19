
import { StackNavigationProp } from '@react-navigation/stack';

import { RouteProp } from '@react-navigation/native';


export interface Entry {
    id: number,
    date: Date,
    image: Array<string>,
    content: string
}

export interface State {
  style: {theme: string},
  entries: Entry[]
}

export type RootStackParamList = {
  Home: undefined;
  Editor: { entryId: number };
  Wait: undefined;
  Settings: undefined;
};

type WaitNavigationProp = StackNavigationProp<RootStackParamList, 'Wait'>

export type WaitNavProps={
  navigation:WaitNavigationProp
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

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type HomeProps = {
  navigation: HomeScreenNavigationProp
  route: HomeScreenRouteProp
};

type SettingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>
type SettingScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>;
export type SettingProps = {
  navigation: SettingScreenNavigationProp
  route: SettingScreenRouteProp
}



export interface IAppState{
    readonly entries: Entry[];
}

