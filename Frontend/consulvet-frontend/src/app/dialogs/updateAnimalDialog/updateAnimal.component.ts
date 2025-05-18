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

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdateAnimalComponent>,
    private snackBar: MatSnackBar,
    private updateAnimalsService: UpdateAnimalsService
  ) {}

  updateAnimalData = new FormGroup({
    nombre: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required),
    raza: new FormControl('', Validators.required),
    color_capa: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
  });

  animals: Animal[] = [];
  selectedAnimal: Animal | null = null;
  selectedPhoto: File | null = null;

  //Se carga el dni del cuidador desde localStorage al iniciar el componente para que éste esté disponible y se puedan recoger sus animales de la base de datos
  ngOnInit() {
    const carerDNI = localStorage.getItem('dni');

    if (!carerDNI) {
      this.snackBar.open('No hemos podido cotejar tus datos', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    this.updateAnimalsService.getAnimalsByCarer(carerDNI).subscribe({
      next: (data: Animal[]) => {
        this.animals = data;
      },
      error: (error) => {
        console.error('Error al obtener los animales', error);
        this.snackBar.open('Se ha producido un error al cargar tus animales', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
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
    if (!rawForm.nombre || !rawForm.fecha_nacimiento || !rawForm.especie || 
        !rawForm.raza || !rawForm.color_capa || !rawForm.sexo) {
      this.snackBar.open('Debes rellenar todos los campos para continuar', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    const formData = new FormData();

    //Laravel no puede gestionar directamente el método put junto con el uso de formData. Por ello, se declara la ruta como post y se simula el put con un formData.append
    formData.append('_method', 'PUT');
    formData.append('nombre', rawForm.nombre.trim());

    let formatDate: string;
    if (rawForm.fecha_nacimiento) {
      const dateObj = new Date(rawForm.fecha_nacimiento);
      formatDate = !isNaN(dateObj.getTime())
        ? this.formatDate(dateObj)
        : String(rawForm.fecha_nacimiento);
    } else {
      formatDate = '';
    }
    formData.append('fecha_nacimiento', formatDate);
    
    formData.append('especie', rawForm.especie);
    formData.append('raza', rawForm.raza);
    formData.append('color_capa', rawForm.color_capa);
    formData.append('sexo', rawForm.sexo);

    if (this.selectedPhoto) {
      formData.append('foto', this.selectedPhoto);
    }

    this.updateAnimalsService.updateAnimal(this.selectedAnimal.codigo_paciente, formData).subscribe({
      next: () => {
        this.snackBar.open('¡Tu animal se ha actualizado con éxito!', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        setTimeout(() => {
          this.dialogRef.close('animalActualizado');
          this.selectedPhoto = null;
        }, 2000);

        const carerDni = localStorage.getItem('dni');
        if (carerDni) {
          this.updateAnimalsService.getAnimalsByCarer(carerDni).subscribe({
            next: (data: Animal[]) => {
              this.animals = data;
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al actualizar el animal', error);
        let errorMessage = 'Se ha producido un error al tratar de actualizar tu animal';
        if (error.error && error.error.message) {
          errorMessage += ': ' + error.error.message;
        }
        this.snackBar.open(errorMessage, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
    }else {
      this.snackBar.open('Por favor, completa todos los campos antes de continuar', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  updateAnimalPhoto() {
    const dialogRef = this.dialog.open(AnimalPhotoDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.file) {
        this.selectedPhoto = result.file;
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

  cancel(): void {
    this.dialogRef.close();
  }
}