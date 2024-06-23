import {createAction, props} from '@ngrx/store';
import { Item } from '../models/item.interface';

export const addItem = createAction(
    'Add Item',
    props<{content: Item}>()
);

export const editItem = createAction(
    'Edit Item',
    props<{content: Item}>()
);

export const loadItems = createAction('Load Items');

export const loadItemsSuccess = createAction(
    'Items Load Sucess',
    props<{items: Item[]}>()
);

export const loadItemsFailure = createAction(
    'Items Load Failure',
    props<{error: string}>()
);