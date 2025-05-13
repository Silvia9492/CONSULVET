import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateAnimalsService } from 'src/app/services/update-animals.service';
import { Animal } from 'src/app/models/animal.model';
import { AnimalPhotoDialogComponent } from '../animalPhotoDialog/animalPhotoDialog.component';

@Component({
  selector: 'app-updateAnimal',
  templateUrl: './updateAnimal.component.html',
  styleUrls: ['./updateAnimal.component.css']
})
export class UpdateAnimalComponent implements OnInit {

  updateAnimalData = new FormGroup({
    nombre: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required),
    raza: new FormControl('', Validators.required),
    color_capa: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
  });

  animales: Animal[] = [];
  selectedAnimal: Animal | null = null;
  selectedPhoto: File | null = null; // ✅ Añadido para guardar la foto seleccionada

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateAnimalComponent>,
    private snackBar: MatSnackBar,
    private updateAnimalsService: UpdateAnimalsService
  ) {}

  ngOnInit() {
    const dniCuidador = localStorage.getItem('dni');

    if (!dniCuidador) {
      this.snackBar.open('No se encontró el DNI del cuidador', 'Cerrar', { duration: 3000 });
      return;
    }

    this.updateAnimalsService.getAnimalesPorCuidador(dniCuidador).subscribe({
      next: (data: Animal[]) => {
        this.animales = data;
      },
      error: (err) => {
        console.error('Error al obtener los animales', err);
        this.snackBar.open('Hubo un error al obtener los animales', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cargarDatosAnimal(animal: Animal) {
    this.selectedAnimal = animal;
    this.updateAnimalData.patchValue({
      nombre: animal.nombre,
      fecha_nacimiento: this.formatDate(animal.fecha_nacimiento),
      especie: animal.especie,
      raza: animal.raza,
      color_capa: animal.color_capa,
      sexo: animal.sexo,
    });
  }

  formatDate(date: any): string {
    const d = new Date(date);
    const month = ('' + (d.getMonth() + 1)).padStart(2, '0');
    const day = ('' + d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  updateAnimal() {
  if (this.updateAnimalData.valid && this.selectedAnimal) {
    const rawForm = this.updateAnimalData.value;

    // Verificar que todos los campos requeridos tengan valor
    if (!rawForm.nombre || !rawForm.fecha_nacimiento || !rawForm.especie || 
        !rawForm.raza || !rawForm.color_capa || !rawForm.sexo) {
      this.snackBar.open('Todos los campos son obligatorios', 'Cerrar', { duration: 3000 });
      return;
    }

    const formData = new FormData();

    // 👉 Simular método PUT para Laravel
    formData.append('_method', 'PUT');

    formData.append('nombre', rawForm.nombre.trim());

    // Asegúrate de que la fecha esté en el formato correcto
    let fechaFormateada: string;
    if (rawForm.fecha_nacimiento) {
      const dateObj = new Date(rawForm.fecha_nacimiento);
      fechaFormateada = !isNaN(dateObj.getTime())
        ? this.formatDate(dateObj)
        : String(rawForm.fecha_nacimiento);
    } else {
      fechaFormateada = '';
    }
    formData.append('fecha_nacimiento', fechaFormateada);

    formData.append('especie', rawForm.especie);
    formData.append('raza', rawForm.raza);
    formData.append('color_capa', rawForm.color_capa);
    formData.append('sexo', rawForm.sexo);

    // Solo incluye la foto si hay una seleccionada
    if (this.selectedPhoto) {
      formData.append('foto', this.selectedPhoto);
    }

    // Logs para depuración
    console.log('Enviando datos de animal (POST + _method PUT):', {
      nombre: rawForm.nombre,
      fecha_nacimiento: fechaFormateada,
      especie: rawForm.especie,
      raza: rawForm.raza,
      color_capa: rawForm.color_capa,
      sexo: rawForm.sexo,
      foto: this.selectedPhoto ? this.selectedPhoto.name : 'No hay foto seleccionada'
    });

    // ⚠️ IMPORTANTE: usar POST aquí para que Laravel acepte archivos + _method
    this.updateAnimalsService.updateAnimal(this.selectedAnimal.codigo_paciente, formData).subscribe({
      next: () => {
        this.snackBar.open('Animal actualizado exitosamente', 'Cerrar', { duration: 3000 });
        this.selectedPhoto = null;

        // Refrescar lista de animales
        const dniCuidador = localStorage.getItem('dni');
        if (dniCuidador) {
          this.updateAnimalsService.getAnimalesPorCuidador(dniCuidador).subscribe({
            next: (data: Animal[]) => {
              this.animales = data;
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al actualizar el animal', err);
        let errorMsg = 'Hubo un error al actualizar el animal';
        if (err.error && err.error.message) {
          errorMsg += ': ' + err.error.message;
        }
        this.snackBar.open(errorMsg, 'Cerrar', { duration: 5000 });
      }
    });
  } else {
    this.snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', { duration: 3000 });
  }
}


  updateAnimalPhoto() {
    const dialogRef = this.dialog.open(AnimalPhotoDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.file) { // Corregido para usar result.file
        this.selectedPhoto = result.file;
        console.log('Foto seleccionada:', result.file);
        // No mostrar snackbar aquí, solo indicar que se ha seleccionado la foto
      }
    });
  }

  onAnimalSelected(animal: Animal) {
    this.selectedAnimal = animal;
    this.updateAnimalData.patchValue({
      nombre: animal.nombre,
      fecha_nacimiento: this.formatDate(animal.fecha_nacimiento),
      especie: animal.especie,
      raza: animal.raza,
      color_capa: animal.color_capa,
      sexo: animal.sexo
    });
  }
}