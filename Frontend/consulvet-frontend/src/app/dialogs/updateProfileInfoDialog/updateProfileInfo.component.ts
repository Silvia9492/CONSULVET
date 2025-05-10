import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CuidadoresService } from 'src/app/services/cuidadores.service';

@Component({
  selector: 'app-updateProfileInfo',
  templateUrl: './updateProfileInfo.component.html',
  styleUrls: ['./updateProfileInfo.component.css']
})
export class UpdateProfileInfoComponent implements OnInit {

  isLoading = false;

  // Definimos el formulario
  updateUserData = new FormGroup({
    dni: new FormControl({ value: '', disabled: true }, Validators.required),  // El dni es deshabilitado
    completeName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  // Método para actualizar el perfil
  updateUser() {
    if (!this.updateUserData.valid) {
      this.snackBar.open('Por favor, corrija los errores en el formulario', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      // Marcar todos los campos como tocados
      Object.keys(this.updateUserData.controls).forEach(key => {
        const control = this.updateUserData.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;

    const form = this.updateUserData.getRawValue();  // Obtiene todos los valores, incluyendo los deshabilitados

    // El cuerpo de la petición para el update
    const requestBody = {
      nombre_completo: form.completeName,
      fecha_nacimiento: this.formatDate(form.birthday),
      direccion: form.address,
      telefono: form.phoneNumber,
      email: form.email
    };

    // Realizamos la llamada al servicio para actualizar los datos
    const dni = form.dni ?? '';  // Usamos el DNI obtenido desde localStorage (ya está en el formulario)
    this.cuidadoresService.updateCuidador(dni, requestBody).subscribe({
      next: (res) => {
        this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.snackBar.open('Error al actualizar el perfil. Intenta nuevamente.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Función para formatear la fecha correctamente en el formato YYYY-MM-DD
  formatDate(date: any): string {
    const d = new Date(date);
    const month = ('' + (d.getMonth() + 1)).padStart(2, '0');
    const day = ('' + d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // En el constructor, inyectamos los servicios necesarios
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private cuidadoresService: CuidadoresService
  ) {}

  // Al iniciar el componente, cargamos el DNI desde localStorage y los datos del cuidador
  ngOnInit() {
    const dni = localStorage.getItem('dni');
    if (dni) {
      // Si encontramos el DNI en localStorage, lo seteamos en el formulario
      this.updateUserData.patchValue({ dni });

      // (Opcional) Cargar los datos del cuidador desde la API, si quieres precargar la info
      this.loadCuidadorData(dni);
    }
  }

  // Función para cargar los datos del cuidador desde el backend (si lo necesitas)
  loadCuidadorData(dni: string) {
    this.cuidadoresService.getCuidador(dni).subscribe({
      next: (data) => {
        this.updateUserData.patchValue({
          completeName: data.nombre_completo,
          birthday: data.fecha_nacimiento,
          address: data.direccion,
          phoneNumber: data.telefono,
          email: data.email
        });
      },
      error: (error) => {
        this.snackBar.open('Error al cargar los datos del cuidador.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.error(error);
      }
    });
  }
}
