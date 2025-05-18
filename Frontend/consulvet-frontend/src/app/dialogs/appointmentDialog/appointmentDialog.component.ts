import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicio } from 'src/app/models/servicio.model';
import { Animal } from 'src/app/models/animal.model';
import { AnimalesService } from 'src/app/services/animales.service';
import { VeterinariosService } from 'src/app/services/veterinarios.service';
import { Veterinario } from 'src/app/models/veterinario.model';
import { Centro } from 'src/app/models/centro.model';
import { CentrosService } from 'src/app/services/centros.service';
import { ConfirmAppointmentComponent } from '../confirmAppointment/confirmAppointment.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-appointmentDialog',
  templateUrl: './appointmentDialog.component.html',
  styleUrls: ['./appointmentDialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {
  //VARIABLES:
  //Grupos del formulario para presentar en el stepper
  reasonFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  centerFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  //Motivo de consulta (= servicios en la base de datos)
  services: Servicio[] = [];
  selectedService: number | null = null;

  //Paciente
  animals: Animal[] = [];

  //Centro al que acude (filtrado por el motivo de consulta)
  filteredCenters: Centro[] = [];

  //Veterinario que le va a atender (filtrado por el motivo de consulta y el centro al que acude)
  filteredVeterinaries: Veterinario[] = [];
  selectedVeterinaryName: string = '';

  //Confirmación de cita
  appointmentConfirmed: Boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private servicioService: ServiciosService,
    private animalService: AnimalesService,
    private veterinariosService: VeterinariosService,
    private centrosService: CentrosService,
    private confirmDialog: MatDialog,
    private dialogRef: MatDialogRef<AppointmentDialogComponent>
  ) {
    this.reasonFormGroup = this.formbuilder.group({
      reason: ['', Validators.required],
      patient: ['', Validators.required],
    });
    this.dateFormGroup = this.formbuilder.group({
      date: ['', Validators.required],
      hourSelected: ['', Validators.required]
    });
    this.centerFormGroup = this.formbuilder.group({
      center: ['', Validators.required],
      veterinary: ['', Validators.required]
    });
    this.confirmFormGroup = this.formbuilder.group({
    });
  }

  /*El motivo de consulta, horario y centro asociado se tienen que cargar en ngOnInit e ir guardándose para que al llegar a la selección
  del veterinario, los filtros para mostrar los que cumplan con todo lo seleccionado por el usuario se apliquen correctamente
  Si no, la información para filtrar no estaría disponible.*/
  ngOnInit() {
    this.servicioService.getServices().subscribe((services: Servicio[]) => {
      this.services = services;
    });

    const username = localStorage.getItem('username');
    if(username){
    this.animalService.getAnimalsByUsername(username).subscribe({
      next: (data) => this.animals = data,
      error: (error) => console.error('Lo sentimos, no hemos podido cargar tus animales', error)
      });
    }

    this.reasonFormGroup.get('reason')?.valueChanges.subscribe((codigoServicioSeleccionado) => {
      const servicioSeleccionado = this.services.find(s => s.codigo_servicio === codigoServicioSeleccionado);
      if (servicioSeleccionado) {
        this.loadCenters(servicioSeleccionado.tipo);
      }
    });

    this.dateFormGroup.get('hourSelected')?.valueChanges.subscribe(() => {
      const selectedServiceCode = this.reasonFormGroup.value.reason;
      const selectedCentroId = this.centerFormGroup.value.center;
      const selectedHora = this.dateFormGroup.value.hourSelected;
      if (selectedServiceCode && selectedCentroId && selectedHora) {
        const servicioSeleccionado = this.services.find(s => s.codigo_servicio === selectedServiceCode);
        if (servicioSeleccionado) {
          this.filterVeterinaries(servicioSeleccionado.tipo, selectedCentroId, selectedHora);
        }
      }
    });

    this.centerFormGroup.get('center')?.valueChanges.subscribe((selectedCentroId) => {
      const selectedServiceCode = this.reasonFormGroup.value.reason;
      const selectedHora = this.dateFormGroup.value.hourSelected;
      if (selectedServiceCode && selectedCentroId && selectedHora) {
        const servicioSeleccionado = this.services.find(s => s.codigo_servicio === selectedServiceCode);
        if (servicioSeleccionado) {
          this.filterVeterinaries(servicioSeleccionado.tipo, selectedCentroId, selectedHora);
        }
      }
    });  
  }

  /*Función propia del Datepicker de Material para manejar los días hábiles que queremos que se muestren
    - He excluido el domingo por ser día festivo (es día de urgencias, pero mi app solo contempla consultas ordinarias)*/
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  };

  filterVeterinaries(servicio: string, centroId: number, horario: string): void {
    if (servicio && centroId && horario) {
      this.veterinariosService.getFilteredVeterinaries(servicio, centroId, horario)
        .subscribe({
          next: (vets) => {
            this.filteredVeterinaries = vets;
          },
          error: (error) => console.error('Lo sentimos, no hemos podido cargar los veterinarios:', error)
        });
    }
  }
  
  loadCenters(tipoSeleccionado: string): void {
    if (!tipoSeleccionado) return;
      this.centrosService.getCentersByType(tipoSeleccionado).subscribe({
      next: (centros) => {
        this.filteredCenters = centros;
      },
      error: (error) => console.error('Lo sentimos, no hemos podido cargar los centros:', error)
    });
  }

  get summaryAppointment() {
    const { reason } = this.reasonFormGroup.value;
    const { patient } = this.reasonFormGroup.value;
    const { date, hourSelected } = this.dateFormGroup.value;
    const { center, veterinary } = this.centerFormGroup.value;
  
    //El resumen de cita no se muestra hasta que todos los campos estén rellenos
    if (!reason || !patient || !date || !hourSelected || !center || !veterinary) {
      return null;
    }
  
    const paciente = this.animals.find(a => a.codigo_paciente === patient);
    const motivo = this.services.find(s => s.codigo_servicio === reason);
    const centro = this.filteredCenters.find(c => c.codigo_centro === center);
    const veterinario = this.filteredVeterinaries.find(v => v.codigo_veterinario === veterinary);
  
    if (!paciente || !motivo || !centro || !veterinario) {
      return null;
    }
  
    return {
      paciente: paciente.nombre,
      motivo: motivo.tipo,
      fecha: new Date(date).toLocaleDateString(),
      horario: hourSelected,
      centro: `${centro.nombre} - ${centro.direccion}`,
      veterinario: veterinario.nombre_completo
    };
  }  
  
  //Llamamos al componente que maneja la lógica para la confirmación de una cita
  openConfirmDialog() {
    const dialogRef = this.confirmDialog.open(ConfirmAppointmentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.appointmentConfirmed = true;
      }
    });
  }

  //Generamos un pdf con los datos resumen de la cita, para que el cuidador lo descargue si quiere y lo tenga a modo de volante de cita
  generatePDF() {
    const doc = new jsPDF();

    const logo = new Image();
    logo.src = 'assets/LogoConsulvet200x200.png';
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 10, 10, 30, 30);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(63, 81, 181);
      doc.text('Volante de Cita', 105, 25, { align: 'center' });

      doc.setDrawColor(200, 200, 200);
      doc.line(10, 40, 200, 40);

      const datos = [
        { label: 'Paciente:', value: this.summaryAppointment?.paciente },
        { label: 'Motivo de consulta:', value: this.summaryAppointment?.motivo },
        { label: 'Fecha:', value: this.summaryAppointment?.fecha },
        { label: 'Horario:', value: this.summaryAppointment?.horario },
        { label: 'Centro:', value: this.summaryAppointment?.centro },
        { label: 'Veterinario:', value: this.summaryAppointment?.veterinario },
      ];

      let y = 55;
      for (const item of datos) {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        doc.setFont('helvetica', 'bold');
        const labelWidth = doc.getTextWidth(item.label);
        doc.text(item.label, 20, y);

        doc.setFont('helvetica', 'normal');
        doc.text(item.value || '', 20 + labelWidth + 1, y);

        y += 10;
      }

      doc.setDrawColor(63, 81, 181);
      doc.rect(5, 5, 200, 287);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        'Gracias por confiar en Consulvet - www.consulvet.com - Tel: (+34) 123-456-789',
        105,
        285,
        { align: 'center' }
      );

      doc.save('volante-cita.pdf');
    };
  }

  closeStepper(){
    this.dialogRef.close();
  }
}