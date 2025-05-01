import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicio } from 'src/app/models/servicio.model';
import { Animal } from 'src/app/models/animal.model';
import { AnimalesService } from 'src/app/services/animales.service';

@Component({
  selector: 'app-appointmentDialog',
  templateUrl: './appointmentDialog.component.html',
  styleUrls: ['./appointmentDialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {
  reasonFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  centerFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  services: Servicio[] = [];
  selectedService: number | null = null;

  animales: Animal[] = [];

  constructor(private formbuilder: FormBuilder, private servicioService: ServiciosService, private animalService: AnimalesService) {
    this.reasonFormGroup = this.formbuilder.group({
      reason: ['', Validators.required],
      patient: ['', Validators.required],
    });
    this.dateFormGroup = this.formbuilder.group({
      date: ['', Validators.required],
      hour: ['', Validators.required]
    });
    this.centerFormGroup = this.formbuilder.group({
      center: ['', Validators.required],
      veterinary: ['', Validators.required]
    });
    this.confirmFormGroup = this.formbuilder.group({
    });
  }

  confirm(): void {
    // Aquí puedes enviar la solicitud o cerrar el diálogo
    console.log(this.reasonFormGroup.value, this.dateFormGroup.value, this.centerFormGroup.value);
  }


  ngOnInit() {
    this.servicioService.getServicios().subscribe((services: Servicio[]) => {
      this.services = services;  // Guardamos los servicios en la variable
    });

    const username = localStorage.getItem('username');
    if(username){
    this.animalService.getAnimalesByUsername(username).subscribe({
      next: (data) => this.animales = data,
      error: (err) => console.error('Error al obtener animales', err)
      });
    }
  }
}
