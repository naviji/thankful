

export interface Entry {
    id: number,
    date: Date,
    content: string
    type?: string
}

export type RootStackParamList = {
  Home: undefined;
  Editor: { entryId: number, entryDate: Date };
};