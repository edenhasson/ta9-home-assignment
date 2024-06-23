import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { ItemsState } from "./reducer";

export const selectItems = (state: AppState) => state.items;
export const selectAllItems = createSelector(
    selectItems,
    (state: ItemsState) => state.items
);