import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAppointmentComponent } from './confirmAppointment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [ConfirmAppointmentComponent]
})
export class ConfirmAppointmentModule { }
