import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnimalPhotoDialogComponent } from '../animalPhotoDialog/animalPhotoDialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  getNombre() {
    return this.updateAnimalData.get('nombre');
  }

   getFechaNacimiento() {
    return this.updateAnimalData.get('fecha_nacimiento');
  }

   getEspecie() {
    return this.updateAnimalData.get('especie');
  }

   getRaza() {
    return this.updateAnimalData.get('raza');
  }

   getColorCapa() {
    return this.updateAnimalData.get('color_capa');
  }

   getSexo() {
    return this.updateAnimalData.get('sexo');
  }

  formatDate(date: any): string {
    const d = new Date(date);
    const month = ('' + (d.getMonth() + 1)).padStart(2, '0');
    const day = ('' + d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  updateAnimal(){

  }

  updateAnimalPhoto(){
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

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<UpdateAnimalComponent>, private http: HttpClient) { }

  ngOnInit() {
  }

}
