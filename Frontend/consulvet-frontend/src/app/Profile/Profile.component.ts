import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePhotoDialogComponent } from '../dialogs/profilePhotoDialog/profilePhotoDialog.component';
import { AppointmentDialogComponent } from '../dialogs/appointmentDialog/appointmentDialog.component';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {

  userPhotoUrl: string | null = null;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openPhotoDialog(): void {
    const dialogRef = this.dialog.open(ProfilePhotoDialogComponent, {
      width: '500px',
      maxWidth: '90vw'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userPhotoUrl = result;
      }
    });
  }

  openAppointment(): void {
    this.dialog.open(AppointmentDialogComponent, {
      width: '80%',
      height: '60%'
    });
  }
}
