import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryDialogComponent } from './historyDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    FormsModule
  ],
  declarations: [HistoryDialogComponent]
})
export class HistoryDialogModule { }
