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
import { MatDialog } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

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

  centrosFiltrados: Centro[] = [];

  veterinariosFiltrados: Veterinario[] = [];
  veterinarioSeleccionadoNombre: string = '';

  appointmentConfirmed: Boolean = false;

  constructor(private formbuilder: FormBuilder, private servicioService: ServiciosService, private animalService: AnimalesService,
    private veterinariosService: VeterinariosService, private centrosService: CentrosService, private confirmDialog: MatDialog) {
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

  confirm(): void {
    // Aquí puedes enviar la solicitud o cerrar el diálogo
    console.log(this.reasonFormGroup.value, this.dateFormGroup.value, this.centerFormGroup.value);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  };


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

    this.reasonFormGroup.get('reason')?.valueChanges.subscribe((codigoServicioSeleccionado) => {
      // Encontramos el tipo del servicio basado en el codigo_servicio seleccionado
      const servicioSeleccionado = this.services.find(s => s.codigo_servicio === codigoServicioSeleccionado);
      if (servicioSeleccionado) {
        this.cargarCentros(servicioSeleccionado.tipo);  // Le pasamos el tipo del servicio
      }
    });

    this.dateFormGroup.get('hourSelected')?.valueChanges.subscribe(() => {
      const selectedServiceCode = this.reasonFormGroup.value.reason;
      const selectedCentroId = this.centerFormGroup.value.center;
      const selectedHora = this.dateFormGroup.value.hourSelected;
      if (selectedServiceCode && selectedCentroId && selectedHora) {
        const servicioSeleccionado = this.services.find(s => s.codigo_servicio === selectedServiceCode);
        if (servicioSeleccionado) {
          this.filtrarVeterinarios(servicioSeleccionado.tipo, selectedCentroId, selectedHora);
        }
      }
    });
  
    // Cuando cambia el centro seleccionado, también filtramos los veterinarios
    this.centerFormGroup.get('center')?.valueChanges.subscribe((selectedCentroId) => {
      const selectedServiceCode = this.reasonFormGroup.value.reason;
      const selectedHora = this.dateFormGroup.value.hourSelected;
      if (selectedServiceCode && selectedCentroId && selectedHora) {
        const servicioSeleccionado = this.services.find(s => s.codigo_servicio === selectedServiceCode);
        if (servicioSeleccionado) {
          console.log('Llamando a filtrarVeterinarios');
          this.filtrarVeterinarios(servicioSeleccionado.tipo, selectedCentroId, selectedHora);
        }
      }
    });  
  }

  filtrarVeterinarios(servicio: string, centroId: number, horario: string): void {
    if (servicio && centroId && horario) {
      this.veterinariosService.getVeterinariosFiltrados(servicio, centroId, horario)
        .subscribe({
          next: (vets) => {
            this.veterinariosFiltrados = vets;
            console.log('Veterinarios filtrados:', vets);
          },
          error: (err) => console.error('Error al filtrar veterinarios:', err)
        });
    }
  }
  
  cargarCentros(tipoSeleccionado: string): void {
    if (!tipoSeleccionado) return;

  this.centrosService.getCentrosPorTipo(tipoSeleccionado).subscribe({
    next: (centros) => {
      this.centrosFiltrados = centros;
      console.log('Centros filtrados por servicio:', centros);
    },
    error: (err) => console.error('Error al cargar centros:', err)
    });
  }

  get resumenCita() {
    const { reason } = this.reasonFormGroup.value;
    const { patient } = this.reasonFormGroup.value;
    const { date, hourSelected } = this.dateFormGroup.value;
    const { center, veterinary } = this.centerFormGroup.value;
  
    // Si alguno no está presente, aún no mostramos el resumen
    if (!reason || !patient || !date || !hourSelected || !center || !veterinary) {
      return null;
    }
  
    const paciente = this.animales.find(a => a.codigo_paciente === patient);
    const motivo = this.services.find(s => s.codigo_servicio === reason);
    const centro = this.centrosFiltrados.find(c => c.codigo_centro === center);
    const veterinario = this.veterinariosFiltrados.find(v => v.codigo_veterinario === veterinary);
  
    // Aseguramos que se han encontrado los objetos
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
  
  openConfirmDialog() {
    const dialogRef = this.confirmDialog.open(ConfirmAppointmentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.appointmentConfirmed = true;
      }
    });
  }

  generatePDF() {
  const doc = new jsPDF();

  const logo = new Image();
  logo.src = 'assets/LogoConsulvet200x200.png';
  logo.onload = () => {
    // Logo
    doc.addImage(logo, 'PNG', 10, 10, 30, 30);

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(63, 81, 181);
    doc.text('Comprobante de Cita', 105, 25, { align: 'center' });

    // Línea separadora
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 40, 200, 40);

    // Contenido: etiquetas en negrita (negro), valores normales (negro)
    const datos = [
      { label: 'Paciente:', value: this.resumenCita?.paciente },
      { label: 'Motivo de consulta:', value: this.resumenCita?.motivo },
      { label: 'Fecha:', value: this.resumenCita?.fecha },
      { label: 'Horario:', value: this.resumenCita?.horario },
      { label: 'Centro:', value: this.resumenCita?.centro },
      { label: 'Veterinario:', value: this.resumenCita?.veterinario },
    ];

    let y = 55;
    for (const item of datos) {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // negro

      doc.setFont('helvetica', 'bold');
      const labelWidth = doc.getTextWidth(item.label);
      doc.text(item.label, 20, y);

      doc.setFont('helvetica', 'normal');
      doc.text(item.value || '', 20 + labelWidth + 1, y); // +1 para separación

      y += 10;
    }

    // Marco decorativo
    doc.setDrawColor(63, 81, 181);
    doc.rect(5, 5, 200, 287);

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      'Gracias por confiar en Consulvet - www.consulvet.com - Tel: 123-456-789',
      105,
      285,
      { align: 'center' }
    );

    doc.save('comprobante-cita.pdf');
  };
}
  
}
