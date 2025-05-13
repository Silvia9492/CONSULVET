import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HistorialService } from 'src/app/services/historial.service';
import { Atienden } from 'src/app/models/atienden.model';
import { Animal } from 'src/app/models/animal.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-historyDialog',
  templateUrl: './historyDialog.component.html',
  styleUrls: ['./historyDialog.component.css']
})
export class HistoryDialogComponent implements OnInit {
  
  historial: MatTableDataSource<Atienden> = new MatTableDataSource<Atienden>();
  nombreAnimal: FormControl = new FormControl('');
  animales: Animal[] = [];  // 🆕 Lista de animales del cuidador

  cuidadorDni: string = '';
  displayedColumns: string[] = ['fecha', 'motivo', 'diagnóstico', 'tratamiento', 'pruebas', 'observaciones'];
  isLoading: boolean = false;
  errorMessage: string = '';
  
  constructor(
    private historialService: HistorialService,
    public dialogRef: MatDialogRef<HistoryDialogComponent>
  ) {}

  ngOnInit() {
    const storedDni = localStorage.getItem('dni');
    if (storedDni) {
      this.cuidadorDni = storedDni;
      console.log('DNI del cuidador recuperado:', this.cuidadorDni);

      // 🆕 Obtener animales del cuidador
      this.historialService.getAnimalesPorCuidador(this.cuidadorDni).subscribe({
        next: (animales) => {
          this.animales = animales;
        },
        error: (err) => {
          console.error('Error al cargar animales:', err);
        }
      });

    } else {
      console.error('No se encontró el DNI del cuidador en localStorage');
      this.errorMessage = 'No se encontró información del cuidador. Por favor, inicie sesión nuevamente.';
    }
  }

  obtenerHistorial(): void {
    const nombre = this.nombreAnimal.value?.trim();
    
    if (!nombre) {
      this.errorMessage = 'Por favor, seleccione un animal';
      return;
    }
    
    if (!this.cuidadorDni) {
      this.errorMessage = 'No se encontró el DNI del cuidador';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Consultando historial - Nombre:', nombre, 'DNI:', this.cuidadorDni);
    
    // 🛠️ Aseguramos orden correcto: (dni, nombre)
    this.historialService.obtenerHistorial(this.cuidadorDni, nombre)
      .subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data);
          this.historial.data = data;
          this.isLoading = false;
          
          if (data.length === 0) {
            this.errorMessage = 'No se encontraron registros para este animal';
          }
        },
        error: (error) => {
          console.error('Error al obtener el historial:', error);
          this.isLoading = false;
          
          if (error.status === 404) {
            this.errorMessage = 'No se encontró ningún historial para ese animal';
          } else {
            this.errorMessage = 'Error al obtener los datos. Por favor, inténtelo de nuevo.';
          }
        }
      });
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }
}
