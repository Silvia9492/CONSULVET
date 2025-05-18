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

  constructor(
    private dialogRef: MatDialogRef<DeleteAnimalComponent>,
    private snackBar: MatSnackBar,
    private eliminarAnimalService: EliminarAnimalService
  ) { }

  animals: Animal[] = [];
  selectedAnimal: string | null = null;
  reason: string = '';
  otherReason: string = '';

  ngOnInit() {
    const dni = localStorage.getItem('dni');
    if (dni) {
      this.eliminarAnimalService.getAnimalsByCarer(dni).subscribe(animales => {
        this.animals = animales;
      });
    }
  }

  confirm(): void {
    if (!this.selectedAnimal) return;

    this.eliminarAnimalService.deleteAnimal(this.selectedAnimal).subscribe({
      next: () => {
        this.snackBar.open('Tu animal ha sido eliminado correctamente', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 2000);
      },
      error: () => {
        this.snackBar.open('Se ha producido un error al eliminar tu animal', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}