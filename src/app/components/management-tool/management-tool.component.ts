import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { loadItems } from '../../state/actions';
import { selectAllItems } from '../../state/selectors';
import { CommonModule, formatDate } from '@angular/common';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Item } from '../../models/item.interface';
import { CardItemComponent } from '../card-item/card-item.component';
import { ItemFormComponent } from '../item-form/item-form.component';



@Component({
  selector: 'app-management-tool',
  standalone: true,
  imports: [CommonModule, AgGridAngular, ItemFormComponent, MatDialogModule, MatButtonModule, CardItemComponent],
  templateUrl: './management-tool.component.html',
  styleUrl: './management-tool.component.scss'
})
export class ManagementToolComponent implements OnInit {
  store = inject(Store);
  readonly dialog = inject(MatDialog);
  allItems$ = this.store.select(selectAllItems);
  @ViewChild('grid') grid!: AgGridAngular;
  searchString = '';
  themeClass = "ag-theme-quartz";
  pagination = true;
  paginationPageSize = 4;
  paginationPageSizeSelector = [4, 10, 20];
  isEditButtonDisabled: boolean = true;
  isGridShown: boolean = true;
  filteredItems!: Item[];
  rowData: Item[] = [];
  colDef: ColDef[] = [
    { field: 'color', headerName: 'Color' },
    { field: 'name', headerName: 'Name' },
    { field: 'createDate', headerName: 'Creation Date', cellRenderer: this.dateCellRenderer },
    { field: 'lastUpdate', headerName: 'Last Update', cellRenderer: this.dateCellRenderer },
    { field: 'createdBy', headerName: 'Created By' }
  ];


  ngOnInit(): void {
    this.store.dispatch(loadItems());
  }

  dateCellRenderer(params: any) {
    return formatDate(params.value, 'short', 'en-US');
  }

  onItemSearch(event: Event) {
    const str = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchString = str;
  }

  filterItems(items: Item[], str: string) {
    if(str.length) {
      return items.filter(item =>
        item.name.toLowerCase().includes(str) ||
        item.color.toLowerCase().includes(str) ||
        item.description.toLowerCase().includes(str)
      );
    } 
    return items
    
  }
  
  onSelectionChanged(): void {
    const selectedRows = this.grid?.api!.getSelectedRows();
    this.isEditButtonDisabled =  !(selectedRows?.length > 0);
  }
  
  openDialog(isNew: boolean, item?: Item) {
    let selectedData;
    if(!isNew) {
      selectedData = this.grid?.api?.getSelectedRows()[0];
    }
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.width = '40vw';
    dialogConfig.maxWidth = '80vw';
    dialogConfig.height = '80vh';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.data = {isNew, item : item ? item :selectedData}
    const dialogRef = this.dialog.open(ItemFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //...
    });
  }

  viewToggle(): boolean {
    this.isGridShown = !this.isGridShown;
    this.isEditButtonDisabled = this.isGridShown; 
    return this.isGridShown;
  }
}
