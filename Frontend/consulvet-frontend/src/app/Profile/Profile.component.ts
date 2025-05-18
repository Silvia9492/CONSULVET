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

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private mostrarAnimalesService: MostrarAnimalesService
  ) { }

  userPhotoUrl: string | null = null;
  animals: Animal[] = [];

  modalTitle = '';
  modalContent = '';
  isModalVisible = false;

  //La foto de perfil se carga desde localStorage al iniciar el componente para que esté disponible para mostrarse en el perfil del usuario cuando éste inicia sesión
  ngOnInit() {
    const storedFoto = localStorage.getItem('foto_perfil');
    if (storedFoto) {
      if (storedFoto.startsWith('http')) {
        this.userPhotoUrl = storedFoto;
      } else {
        this.userPhotoUrl = `http://localhost:8000/uploads/perfiles/${storedFoto}`; //ruta de la carpeta donde se van a guardar las fotos de los usuarios
      }
    } else {
      this.userPhotoUrl = '';
    }

    //Mismo razonamiento para el DNI
    const dniCuidador = localStorage.getItem('dni');

    if (!dniCuidador) {
      console.error('No hemos podido cotejar tu dni');
      return;
    }
    this.loadAnimalData(dniCuidador);
    }

    loadAnimalData(dniCuidador: string) {
      this.mostrarAnimalesService.getAnimalsByCarer(dniCuidador).subscribe({
        next: (animales) => {
          this.animals = animales;
        },
        error: (error) => {
          console.error('Se ha producido un error al tratar de cargar tus animales:', error);
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
    this.dialog.open(HistoryDialogComponent, {
      width: '80%',
      height: 'auto'
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
        console.error('No hemos podido cotejar tu dni');
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
        console.error('No hemos podido cotejar tu dni');
        }
      }
    });
  }

  openDeleteAnimalDialog(): void {
    const dialogRef = this.dialog.open(DeleteAnimalComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const dniCuidador = localStorage.getItem('dni');
        if (dniCuidador) {
          this.loadAnimalData(dniCuidador);
        }
      }
    });
  }

//TEXTOS PARA LOS ENLACES DEL PIE DE PÁGINA. El modal mostrará uno u otro en función del enlace que se haya pulsado
  aboutUs = `
    <span class="consulvet">Consulvet</span> nace de nuestra experiencia dentro el ámbito veterinario, con el objetivo de optimizar la atención al cliente en clínicas y hospitales veterinarios.
    Queremos facilitar que los cuidadores puedan solicitar consulta veterinaria de manera rápida y sencilla, sin depender de llamadas telefónicas ni de horarios
    de atención al cliente. Nuestro compromiso es mejorar el día a día en los centros veterinarios, aligerando carga de trabajo en aquellas tareas que se pueden automatizar,
    a la par que garantizamos una experiencia actual y cómoda para todos los cuidadores de animales.
  `;

  contact = `
    <span class="phone"><i class="fa fa-phone"></i></span> Teléfono: <a href="tel:+34123456789">(+34) 123 456 789</a><br>
    <span class="mail"><i class="fa fa-envelope"></i></span> Email: <a href="mailto:info@consulvet.com">info@consulvet.com</a>
  `;

  privacyPolicy = `
    Tu privacidad es muy importante para nosotros. Tus datos serán tratados de forma confidencial y solo se utilizarán para gestionar tus consultas veterinarias.
    Tu información personal no será compartida con terceros, salvo consentimiento explícito.
  `;

  openModal(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}