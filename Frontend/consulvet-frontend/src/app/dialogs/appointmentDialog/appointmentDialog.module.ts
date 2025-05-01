import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDialogComponent } from './appointmentDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatOptionModule
  ],
  declarations: [AppointmentDialogComponent]
})
export class AppointmentDialogModule { }
