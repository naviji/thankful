import {Entry} from '../types'
import {Action} from 'redux'

const LOAD = 'entries/LOAD';
const UPDATE = 'entries/UPDATE';
const CREATE = 'entries/CREATE';
const REMOVE = 'entries/REMOVE';
const IMAGE_ADD = 'image/ADD';
const IMAGE_DELETE = 'image/DELETE';


export interface LoadEntryAction extends Action<'entries/LOAD'> {
    entries: Entry[];
}

export interface UpdateEntryAction extends Action<'entries/UPDATE'> {
    entry: Entry;
}

export interface CreateEntryAction extends Action<'entries/CREATE'> {
    entry: Entry;
}

export interface RemoveEntryAction extends Action<'entries/REMOVE'> {
    entryId: Number;
}

export type EntryActions = 
    | LoadEntryAction
    | UpdateEntryAction
    | CreateEntryAction
    | RemoveEntryAction

export const loadEntries = (entries: Array<Entry>) => ({type: LOAD, entries})
export const createEntry = (entry: Entry) => ({type: CREATE, entry})
export const updateEntry = (entry: Entry) => ({type: UPDATE, entry})
export const removeEntry = (entryId: Number) => ({type: REMOVE, entryId})
export const addImage = (entry: Entry) => ({type: IMAGE_ADD, entry})
export const deleteImage = (entryId: number) => ({type: IMAGE_DELETE, entryId})

const _dateSort = (a: Entry, b: Entry) => b.date.valueOf() - a.date.valueOf()

const reducer = (entries:Array<Entry>=[], action: EntryActions) => {
    console.log(action.type);
    switch (action.type) {
        case LOAD:
            return action.entries.sort(_dateSort)
        case CREATE:
            return [...entries, action.entry].sort(_dateSort)
        case UPDATE:
            return entries.map(x => x.id === action.entry.id ? 
                action.entry : x).sort(_dateSort)
        case REMOVE:
            console.log(action.entryId)
            
            return entries.filter(x =>( x.id !== action.entryId))
        default:
            console.log("Unknown action!")
            return entries;
    }
}

export default reducer;