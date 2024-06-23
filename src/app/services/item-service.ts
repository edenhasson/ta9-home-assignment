import { Injectable, inject } from '@angular/core';
import { Item } from '../models/item.interface';
import { HttpClient  } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  httpClient = inject(HttpClient);


  getItems(): Observable<Item[]> {
     return this.httpClient.get<{items: Item[]}>('../items.json').pipe(
      map(res => res.items)
     );
  }


  saveItems(items: Item[]): Observable<Item[]> {
    return of(items);
  }
}