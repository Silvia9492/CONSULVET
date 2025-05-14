import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profilePhotoDialog',
  templateUrl: './profilePhotoDialog.component.html',
  styleUrls: ['./profilePhotoDialog.component.css']
})
export class ProfilePhotoDialogComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: string | null = null;
  file: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<ProfilePhotoDialogComponent>,
    private http: HttpClient
  ) {}

  photoSelected(event: Event): void {
    this.imageChangedEvent = event;
  }

  private dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}


  imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64 || null;

  // Convertir el Base64 en Blob y luego en File
  if (this.croppedImage) {
    const blob = this.dataURItoBlob(this.croppedImage);
    this.file = new File([blob], 'perfil.jpg', { type: blob.type, lastModified: Date.now() });
  }
}


  confirmPhoto(): void {
    if (!this.file) return;

    const formData = new FormData();
    formData.append('foto', this.file);

    const userDni = localStorage.getItem('dni');

    this.http.post<{ foto: string }>(`http://localhost:8000/api/cuidadores/${userDni}/foto`, formData)
      .subscribe({
        next: response => {
          localStorage.setItem('foto_perfil', response.foto);
          this.dialogRef.close(response.foto);
        },
        error: err => console.error(err)
      });
  }

  cancelPhoto(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
