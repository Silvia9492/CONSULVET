import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnimalPhotoDialogComponent } from '../animalPhotoDialog/animalPhotoDialog.component';
import { AddAnimalService } from 'src/app/services/add-animal.service';

@Component({
  selector: 'app-addNewAnimal',
  templateUrl: './addNewAnimal.component.html',
  styleUrls: ['./addNewAnimal.component.css']
})
export class AddNewAnimalComponent implements OnInit {

  newAnimalData = new FormGroup({
    nombre: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required),
    raza: new FormControl('', Validators.required),
    color_capa: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
  });

  selectedPhotoFile: File | null = null;
  selectedPhotoPreview: string | null = null;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddNewAnimalComponent>,
    private http: HttpClient,
    public addAnimalService: AddAnimalService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  formatDate(date: any): string {
    const d = new Date(date);
    const month = ('' + (d.getMonth() + 1)).padStart(2, '0');
    const day = ('' + d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  addAnimalPhoto() {
    const dialogRef = this.dialog.open(AnimalPhotoDialogComponent, {
      width: '500px',
      data: {}  // No se pasa código de paciente en este momento
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.file) {
        this.selectedPhotoFile = result.file;
        this.selectedPhotoPreview = result.preview;
        console.log('Foto seleccionada:', this.selectedPhotoFile);
      }
    });
  }

  registerNewAnimal() {
  if (this.newAnimalData.valid) {
      const dniCuidador = localStorage.getItem('dni');

      if (!dniCuidador) {
        this.snackBar.open('No se ha encontrado el DNI del cuidador', 'Cerrar', { duration: 3000 });
        return;
      }

      const formData = new FormData();
        formData.append('nombre', this.newAnimalData.get('nombre')?.value || '');
        formData.append('fecha_nacimiento', this.formatDate(this.newAnimalData.get('fecha_nacimiento')?.value || ''));
        formData.append('especie', this.newAnimalData.get('especie')?.value || '');
        formData.append('raza', this.newAnimalData.get('raza')?.value || '');
        formData.append('color_capa', this.newAnimalData.get('color_capa')?.value || '');
        formData.append('sexo', this.newAnimalData.get('sexo')?.value || '');
        formData.append('cuidador_dni', dniCuidador);
        if (this.selectedPhotoFile) {
          formData.append('foto', this.selectedPhotoFile);
        }

      this.addAnimalService.registerAnimal(formData).subscribe({
        next: response => {
          console.log('Animal registrado con éxito', response);
          this.snackBar.open('Animal registrado con éxito', 'Cerrar', { duration: 3000 });
          this.dialogRef.close('animalAñadido');
        },
        error: error => {
          console.error('Error al registrar el animal', error);
          this.snackBar.open('Hubo un error al registrar el animal', 'Cerrar', { duration: 3000 });
        }
      });
  } else {
    this.snackBar.open('Por favor, completa todos los campos requeridos', 'Cerrar', { duration: 3000 });
  }
}
}