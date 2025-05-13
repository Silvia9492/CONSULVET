import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAnimalComponent } from './deleteAnimal.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule
  ],
  declarations: [DeleteAnimalComponent]
})
export class DeleteAnimalModule { }
