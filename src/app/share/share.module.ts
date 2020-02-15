import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MoveBoxComponent } from '../component/move-box/move-box.component';

const Modules = [
  FormsModule,
  DragDropModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule
]

@NgModule({
  declarations: [
    MoveBoxComponent
  ],
  imports: [
    CommonModule,
    ...Modules
  ],
  exports: [
    MoveBoxComponent,
    Modules
  ]
})
export class ShareModule { }
