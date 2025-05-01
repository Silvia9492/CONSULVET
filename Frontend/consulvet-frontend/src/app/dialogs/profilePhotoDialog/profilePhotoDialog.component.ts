import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profilePhotoDialog',
  templateUrl: './profilePhotoDialog.component.html',
  styleUrls: ['./profilePhotoDialog.component.css']
})
export class ProfilePhotoDialogComponent implements OnInit {

  selectedImage: string | null = null;

  constructor(public dialogRef: MatDialogRef<ProfilePhotoDialogComponent>) { }

  photoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  confirmPhoto(): void {
    this.dialogRef.close(this.selectedImage);
  }

  cancelPhoto(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
