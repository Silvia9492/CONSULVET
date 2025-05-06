//REVISAR: SIGUE SIN FUNCIONAR EL CONTROL DEL FORM FIELD Y ADEMÁS DIO ERROR AL CONECTARSE A LA BASE DE DATOS

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HistorialService } from 'src/app/services/historial.service';
import { Atienden } from 'src/app/models/atienden.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-historyDialog',
  templateUrl: './historyDialog.component.html',
  styleUrls: ['./historyDialog.component.css']
})
export class HistoryDialogComponent implements OnInit {

  historial: MatTableDataSource<Atienden> = new MatTableDataSource<Atienden>();
  nombreAnimal: FormControl = new FormControl
  cuidadorDni: string = '';

  constructor(private historialService: HistorialService, public dialogRef: MatDialogRef<HistoryDialogComponent> ) { }

  ngOnInit() {
    const storedDni = localStorage.getItem('dni');
    if (storedDni) {
      this.cuidadorDni = storedDni;
    } else {
      console.error('No se encontró el DNI del cuidador en localStorage');
    }
  }

  obtenerHistorial(): void {
    if (this.nombreAnimal && this.cuidadorDni) {
      this.historialService.obtenerHistorial(this.nombreAnimal.value, this.cuidadorDni).subscribe(
        (data) => {
          this.historial.data = data;
        },
        (error) => {
          console.error('Error al obtener el historial:', error);
        }
      );
    } else {
      console.error('Por favor, proporciona tanto el nombre del animal como el DNI del cuidador');
    }
  }

  // Método para cerrar el diálogo
  cerrarDialogo(): void {
    this.dialogRef.close();
  }
}
