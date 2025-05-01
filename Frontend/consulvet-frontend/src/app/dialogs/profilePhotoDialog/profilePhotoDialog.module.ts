import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePhotoDialogComponent } from './profilePhotoDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [ProfilePhotoDialogComponent]
})
export class ProfilePhotoDialogModule { }
