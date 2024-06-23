import { createReducer, on } from "@ngrx/store";
import { Item } from "../models/item.interface";
import { addItem, editItem, loadItems, loadItemsFailure, loadItemsSuccess } from "./actions";


export enum Status {
    Pending = 'pending',
    Loading = 'loading',
    Error = 'error',
    Success = 'success'
}

export interface ItemsState {
    items: Item[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ItemsState = {
    items: [],
    error: null,
    status: 'pending'
};

export const itemReducer = createReducer(
    initialState,
    on(addItem, (state, {content}) =>({
            ...state,
            items: [...state.items, {id: Date.now().toString(), name: content.name, color: content.color, description: content.description, createDate: new Date(), lastUpdate: new Date(), createdBy: content.name}]
        })),
    on(editItem, (state, {content}) => ({
        ...state,
        items: state.items.map(item => item.id === content.id ? {...content, lastUpdate: new Date()} : item)
    })),
    on(loadItems, (state) => ({...state, status: Status.Loading})),
    on(loadItemsSuccess, (state, {items}) => ({
        ...state,
        items: items,
        error: null,
        status: Status.Success
    })),
    on(loadItemsFailure, (state, {error}) => ({
        ...state,
        error,
        status: Status.Error
    }))
)