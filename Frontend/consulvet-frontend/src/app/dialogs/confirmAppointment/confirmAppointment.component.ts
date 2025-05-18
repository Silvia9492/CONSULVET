import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmAppointment',
  templateUrl: './confirmAppointment.component.html',
  styleUrls: ['./confirmAppointment.component.css']
})
export class ConfirmAppointmentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmAppointmentComponent>) { }

  ngOnInit() {}

  confirm() {
    this.dialogRef.close(true);
  }
}