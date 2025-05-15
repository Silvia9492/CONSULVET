import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePhotoDialogComponent } from '../dialogs/profilePhotoDialog/profilePhotoDialog.component';
import { AppointmentDialogComponent } from '../dialogs/appointmentDialog/appointmentDialog.component';
import { HistoryDialogComponent } from '../dialogs/historyDialog/historyDialog.component';
import { Router } from '@angular/router';
import { AddNewAnimalComponent } from '../dialogs/addNewAnimalDialog/addNewAnimal.component';
import { UpdateProfileInfoComponent } from '../dialogs/updateProfileInfoDialog/updateProfileInfo.component';
import { UpdateAnimalComponent } from '../dialogs/updateAnimalDialog/updateAnimal.component';
import { DeleteAnimalComponent } from '../dialogs/deleteAnimalDialog/deleteAnimal.component';
import { MostrarAnimalesService } from '../services/mostrar-animales.service';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {

  userPhotoUrl: string | null = null;
  animales: Animal[] = [];

  constructor(private dialog: MatDialog, private router: Router, private mostrarAnimalesService: MostrarAnimalesService) { }

  ngOnInit() {
    // Cargar la foto del perfil desde localStorage
    const storedFoto = localStorage.getItem('foto_perfil');
    if (storedFoto) {
      if (storedFoto.startsWith('http')) {
        this.userPhotoUrl = storedFoto;
      } else {
        this.userPhotoUrl = `http://localhost:8000/uploads/perfiles/${storedFoto}`;
      }
    } else {
      this.userPhotoUrl = '';
    }

    // Obtener el DNI del cuidador desde localStorage
    const dniCuidador = localStorage.getItem('dni');

    if (!dniCuidador) {
      console.error('No se encontró el DNI del cuidador en el localStorage');
      return; // Si no encontramos el DNI, no continuamos
    }
    this.loadAnimalData(dniCuidador);
    }

    loadAnimalData(dniCuidador: string) {
    this.mostrarAnimalesService.getAnimalesPorCuidador(dniCuidador).subscribe({
      next: (animales) => {
        this.animales = animales;
      },
      error: (error) => {
        console.error('Error al obtener los animales:', error);
      }
    });
  }

  openPhotoDialog(): void {
    const dialogRef = this.dialog.open(ProfilePhotoDialogComponent, {
      width: '500px',
      maxWidth: '90vw'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const fullImageUrl = `http://localhost:8000/uploads/perfiles/${result}`;
        this.userPhotoUrl = fullImageUrl;
        localStorage.setItem('foto_perfil', result);
      }
    });
  }

  openAppointment(): void {
    this.dialog.open(AppointmentDialogComponent, {
      width: '80%',
      height: '60%'
    });
  }

  goToLogin() {
    localStorage.removeItem('username');
    localStorage.removeItem('dni');
    localStorage.removeItem('foto_perfil');
    this.router.navigate(['/Login']);
  }

  openHistoryDialog(): void {
    const dialogRef = this.dialog.open(HistoryDialogComponent, {
      width: '80%',
      height: 'auto'  // El tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }

  openUpdateProfileInfoDialog(): void {
    this.dialog.open(UpdateProfileInfoComponent, {
      width: '20%',
      height: '750px'
    });
  }

  openAddAnimalDialog(): void {
  const dialogRef =this.dialog.open(AddNewAnimalComponent, {
    width: '20%',
    height: '782px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'animalAñadido') {
      const dni = localStorage.getItem('dni');
      if (dni) {
        this.loadAnimalData(dni);
      } else {
        console.error('No se encontró el DNI en localStorage');
      }
    }
  });
}


  openUpdateAnimalDialog(): void {
    const dialogRef = this.dialog.open(UpdateAnimalComponent, {
      width: '20%',
      height: '850px'
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result === 'animalActualizado') {
      const dni = localStorage.getItem('dni');
      if (dni) {
        this.loadAnimalData(dni);
      } else {
        console.error('No se encontró el DNI en localStorage');
      }
    }
  });
}

  openDeleteAnimalDialog(): void {
    const dialogRef = this.dialog.open(DeleteAnimalComponent, {
      width: '500px'
    });
  }
}
