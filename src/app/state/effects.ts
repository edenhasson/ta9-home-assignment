import { Injectable, inject } from "@angular/core";
import { Store} from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addItem, editItem, loadItems, loadItemsFailure, loadItemsSuccess } from "./actions";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { ItemService } from "../services/item-service";
import { selectAllItems } from "./selectors";
@Injectable()
export class ItemsEffect {
    actions$ = inject(Actions);
    store = inject(Store);
    itemService = inject(ItemService);

    loadItems$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadItems),
            switchMap(() => 
            this.itemService.getItems().pipe(
                map(items => loadItemsSuccess({items: items})),
                catchError(error => of(loadItemsFailure({error})))
            ))
        )
    );

    saveItems$ = createEffect(()=> 
        this.actions$.pipe(
            ofType(addItem,editItem),
            withLatestFrom(this.store.select(selectAllItems)),
            switchMap(([action,items]) => this.itemService.saveItems(items))
        ),
        {dispatch: false}
    );
}