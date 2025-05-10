import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-animalPhotoDialog',
  templateUrl: './animalPhotoDialog.component.html',
  styleUrls: ['./animalPhotoDialog.component.css']
})
export class AnimalPhotoDialogComponent implements OnInit {

  selectedImage: string | null = null;
  file: File | null = null;

  constructor(public dialogRef: MatDialogRef<AnimalPhotoDialogComponent>, private http: HttpClient) { }

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
    //Esta ruta no va a ser exactamente así, tiene que recuperar el dato de la tabla Animales
    const idAnimal = localStorage.getItem('codigo_paciente');

    //Aquí va a ir la ruta para asociar la foto al animal
    this.http.post<{ foto: string }>(`http://localhost:8000/api/animales/${idAnimal}/foto`, formData)
      .subscribe({
        next: response => {
          localStorage.setItem('foto', response.foto); // persistimos
          this.dialogRef.close(response.foto); // devolvemos el nombre del archivo
        },
        error: err => console.error(err)
      });
  }

   cancelPhoto(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    /*Esto igual no hace falta
    this.selectedImage = localStorage.getItem('foto_perfil');
    */
  }

}
