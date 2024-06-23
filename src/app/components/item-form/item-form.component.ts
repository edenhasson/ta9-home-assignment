import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { addItem, editItem } from '../../state/actions';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [MatSidenavModule, ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnInit{
  fb = inject(FormBuilder);
  store = inject(Store);
  dialogRef = inject(MatDialogRef<ItemFormComponent>);
  data = inject(MAT_DIALOG_DATA);
  
  addItemForm!: FormGroup;
  onSubmit() {
    if(this.addItemForm.valid){
      this.data.isNew ?
      this.store.dispatch(addItem({content: this.addItemForm.value})) :
      this.store.dispatch(editItem({content: {...this.data.item,...this.addItemForm.value}}));
      this.dialogRef.close();
    }
  }
  ngOnInit(): void {
    this.addItemForm = this.fb.group({
        name: [(this.data?.item?.name ? this.data.item.name : ''), [Validators.required]],
        color: [(this.data?.item?.color ? this.data.item.color : ''), [Validators.required]],
        description: [(this.data?.item?.description ? this.data.item.description : ''), [Validators.required]],
    })  
  }
}
