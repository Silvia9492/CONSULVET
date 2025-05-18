import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnimalPhotoDialogComponent } from '../animalPhotoDialog/animalPhotoDialog.component';
import { AddAnimalService } from 'src/app/services/add-animal.service';

@Component({
  selector: 'app-addNewAnimal',
  templateUrl: './addNewAnimal.component.html',
  styleUrls: ['./addNewAnimal.component.css']
})
export class AddNewAnimalComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddNewAnimalComponent>,
    private addAnimalService: AddAnimalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

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
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.file) {
        this.selectedPhotoFile = result.file;
        this.selectedPhotoPreview = result.preview;
      }
    });
  }

  registerNewAnimal() {
    if (this.newAnimalData.valid) {
      const dniCuidador = localStorage.getItem('dni');

        if (!dniCuidador) {
          this.snackBar.open('No hemos podido cotejar tus datos', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
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
            this.snackBar.open('¡Tu nuevo animal se ha registrado con éxito!', '', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            setTimeout(() => {
              this.dialogRef.close('animalAñadido');
            }, 2000);
          },
          error: error => {
            this.snackBar.open('Se ha producido un error durante el registro', '', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        });
    } else {
      this.snackBar.open('Por favor, completa todos los campos antes de continuar', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}