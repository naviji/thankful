import {Entry} from '../types'
import { State } from 'react-native-gesture-handler';

const LOAD = 'entries/LOAD';
const UPDATE = 'entries/UPDATE';
const CREATE = 'entries/CREATE';
const REMOVE = 'entries/REMOVE';
// const TOGGLE_SELECT = 'entries/TOGGLE_SELECT';


export const loadEntries = (entries: Array<Entry>) => ({type: LOAD, entries})
export const createEntry = (entry: Entry) => ({type: CREATE, entry})
export const updateEntry = (entry: Entry) => ({type: UPDATE, entry})
export const removeEntry = (entryId: number) => ({type: UPDATE, entryId})

const reducer = (entries:Array<Entry>=[], action) => {
    console.log(action.type);
    switch (action.type) {
        case LOAD:
            return action.entries
        case CREATE:
            return [...entries, action.entry]
        case UPDATE:
            return entries.map(x => x.id === action.entry.id ? 
                action.entry : x)
        case REMOVE:
            return entries.filter(x => x !== action.entryId)
        default:
            console.log("Unknown action!")
            return entries;
    }
}

export default reducer;