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
  
  constructor(
    private historialService: HistorialService,
    private dialogRef: MatDialogRef<HistoryDialogComponent>
  ) {}

  history: MatTableDataSource<Atienden> = new MatTableDataSource<Atienden>();
  animalName: FormControl = new FormControl('');
  animals: Animal[] = [];

  carerDni: string = '';
  displayedColumns: string[] = ['fecha', 'motivo', 'diagnóstico', 'tratamiento', 'pruebas', 'observaciones'];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit() {
    const storedDni = localStorage.getItem('dni');
    if (storedDni) {
      this.carerDni = storedDni;

      this.historialService.getAnimalsByCarer(this.carerDni).subscribe({
        next: (animales) => {
          this.animals = animales;
        },
        error: (error) => {
          console.error('Error al cargar los animales:', error);
        }
      });

    } else {
      this.errorMessage = 'No hemos encontrado tus datos. Por favor, inicia sesión nuevamente';
    }
  }

  obtenerHistorial(): void {
    const name = this.animalName.value?.trim();
    
    if (!name) {
      this.errorMessage = 'Debes seleccionar un animal para continuar';
      return;
    }
    
    if (!this.carerDni) {
      this.errorMessage = 'No hemos podido cotejar tu dni';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';

    this.historialService.getHistory(this.carerDni, name)
      .subscribe({
        next: (data) => {
          this.history.data = data;
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
            this.errorMessage = 'Error al obtener los datos de historial para este animal. Por favor, inténtalo de nuevo.';
          }
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}