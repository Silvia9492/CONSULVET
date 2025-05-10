import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalPhotoDialogComponent } from './animalPhotoDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  declarations: [AnimalPhotoDialogComponent]
})
export class AnimalPhotoDialogModule { }
