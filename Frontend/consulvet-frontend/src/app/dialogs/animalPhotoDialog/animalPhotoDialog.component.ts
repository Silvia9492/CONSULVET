import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-animalPhotoDialog',
  templateUrl: './animalPhotoDialog.component.html',
  styleUrls: ['./animalPhotoDialog.component.css']
})
export class AnimalPhotoDialogComponent implements OnInit {

  selectedImage: string | null = null;
  file: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AnimalPhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  photoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.[0];

    if (selectedFile) {
      this.file = selectedFile;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  confirmPhoto(): void {
    if (this.file && this.selectedImage) {
      this.dialogRef.close({
        file: this.file,
        preview: this.selectedImage
      });
    }
  }

  cancelPhoto(): void {
    this.dialogRef.close();
  }
}
