import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EliminarAnimalService } from 'src/app/services/eliminar-animal.service';
import { Animal } from 'src/app/models/animal.model';

@Component({
  selector: 'app-deleteAnimal',
  templateUrl: './deleteAnimal.component.html',
  styleUrls: ['./deleteAnimal.component.css']
})
export class DeleteAnimalComponent implements OnInit {

  animales: Animal[] = [];
  animalSeleccionado: string | null = null;
  motivo: string = '';
  otroMotivo: string = '';

  constructor(private dialogRef: MatDialogRef<DeleteAnimalComponent>, private snackBar: MatSnackBar, private eliminarAnimalService: EliminarAnimalService) { }

  ngOnInit() {
    const dni = localStorage.getItem('dni');
    if (dni) {
      this.eliminarAnimalService.getAnimalesPorCuidador(dni).subscribe(animales => {
        this.animales = animales;
      });
    }
  }

  confirmar(): void {
    if (!this.animalSeleccionado) return;

    this.eliminarAnimalService.eliminarAnimal(this.animalSeleccionado).subscribe({
      next: () => {
        this.snackBar.open('Animal eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true); // opcional, puedes devolver un flag si necesitas refrescar fuera
      },
      error: () => {
        this.snackBar.open('Error al eliminar el animal', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
