import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnimalPhotoDialogComponent } from '../animalPhotoDialog/animalPhotoDialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

    getNombre() {
    return this.newAnimalData.get('nombre');
  }

   getFechaNacimiento() {
    return this.newAnimalData.get('fecha_nacimiento');
  }

   getEspecie() {
    return this.newAnimalData.get('especie');
  }

   getRaza() {
    return this.newAnimalData.get('raza');
  }

   getColorCapa() {
    return this.newAnimalData.get('color_capa');
  }

   getSexo() {
    return this.newAnimalData.get('sexo');
  }

  formatDate(date: any): string {
    const d = new Date(date);
    const month = ('' + (d.getMonth() + 1)).padStart(2, '0');
    const day = ('' + d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

    registerNewAnimal(){

    }

    addAnimalPhoto(){
      const dialogRef = this.dialog.open(AnimalPhotoDialogComponent, {
        width: '500px',
        data: { /* puedes pasar datos si necesitas */ }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Resultado del diálogo:', result);
          // Aquí podrías guardar la foto o hacer algo con el resultado
        }
      });
    }

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AddNewAnimalComponent>, private http: HttpClient) {
   }

  ngOnInit() {
  }

}
