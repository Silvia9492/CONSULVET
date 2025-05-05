import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule} from '@angular/flex-layout';
import { LoginModule } from './Login/Login.module';
import { RegisterModule } from './Register/Register.module';
import { ProfileModule } from './Profile/Profile.module';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfilePhotoDialogModule } from './dialogs/profilePhotoDialog/profilePhotoDialog.module';
import { AppointmentDialogModule } from './dialogs/appointmentDialog/appointmentDialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmAppointmentModule } from './dialogs/confirmAppointment/confirmAppointment.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
    LoginModule,
    RegisterModule,
    ProfileModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    ProfilePhotoDialogModule,
    AppointmentDialogModule,
    MatDialogModule,
    ConfirmAppointmentModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
