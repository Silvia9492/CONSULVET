import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePhotoDialogComponent } from '../dialogs/profilePhotoDialog/profilePhotoDialog.component';
import { AppointmentDialogComponent } from '../dialogs/appointmentDialog/appointmentDialog.component';
import { HistoryDialogComponent } from '../dialogs/historyDialog/historyDialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {

  userPhotoUrl: string | null = null;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    const storedFoto = localStorage.getItem('foto_perfil');
    if (storedFoto) {
      if (storedFoto.startsWith('http')) {
        this.userPhotoUrl = storedFoto;
      } else {
        this.userPhotoUrl = `http://localhost:8000/uploads/perfiles/${storedFoto}`;
      }
    }else {
    this.userPhotoUrl = '';
    }
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
      width: '600px',  // El tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }
}