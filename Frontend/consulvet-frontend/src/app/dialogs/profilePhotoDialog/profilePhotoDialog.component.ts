import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profilePhotoDialog',
  templateUrl: './profilePhotoDialog.component.html',
  styleUrls: ['./profilePhotoDialog.component.css']
})
export class ProfilePhotoDialogComponent implements OnInit {

  selectedImage: string | null = null;
  file: File | null = null;

  constructor(public dialogRef: MatDialogRef<ProfilePhotoDialogComponent>, private http: HttpClient) { }

  photoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.[0] || null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.file = selectedFile;
      };
      reader.readAsDataURL(selectedFile);
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
          localStorage.setItem('foto_perfil', response.foto); // persistimos
          this.dialogRef.close(response.foto); // devolvemos el nombre del archivo
        },
        error: err => console.error(err)
      });
  }

  cancelPhoto(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.selectedImage = localStorage.getItem('foto_perfil');
  }

}