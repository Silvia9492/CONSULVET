import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePhotoDialogComponent } from './profilePhotoDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    ImageCropperModule,
    MatIconModule
  ],
  declarations: [ProfilePhotoDialogComponent]
})
export class ProfilePhotoDialogModule { }
