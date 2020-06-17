import {Entry} from '../types'
import {Action} from 'redux'

const LOAD = 'entries/LOAD';
const UPDATE = 'entries/UPDATE';
const CREATE = 'entries/CREATE';
const REMOVE = 'entries/REMOVE';


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

export const loadEntries = (entries: Entry[]): {type: string, entries: Entry[]} => ({type: LOAD, entries})
export const createEntry = (entry: Entry): {type: string, entry: Entry} => ({type: CREATE, entry})
export const updateEntry = (entry: Entry): {type: string, entry: Entry} => ({type: UPDATE, entry})
export const removeEntry = (entryId: Number): {type: string, entryId: Number} => ({type: REMOVE, entryId})

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
            return entries.filter(x=>(x.id!==action.entryId))
        default:
            console.log("Unknown action!")
            return entries;
    }
}

export default reducer;