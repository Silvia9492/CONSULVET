import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';  // Importamos el servicio
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importar MatSnackBar
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Usamos FormGroup y FormControl para crear el formulario
  loginData = new FormGroup({
    nombre_usuario: new FormControl('', [Validators.required]),
    contraseña: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';  // Variable para manejar los errores de forma global

  constructor(
    private loginService: LoginService, // Inyectamos el servicio de login
    private router: Router,
    private snackBar: MatSnackBar  // Inyectamos MatSnackBar
  ) {}

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.loginData.valid) {
      const nombre_usuario = this.loginData.value.nombre_usuario ?? '';  // Asignar un string vacío si es null o undefined
      const contraseña = this.loginData.value.contraseña ?? '';  // Lo mismo para contraseña

      // Llamamos al servicio de login
      this.loginService.login(nombre_usuario, contraseña)
        .pipe(
          catchError(error => {
            // Manejo de errores usando messageError (sin snackbar)
            this.messageError(error);  // Llamamos a la función de manejo de errores
            return of(null); // Devolver un observable vacío o de valor por defecto
          })
        )
        .subscribe(
          (response) => {
            if (response) {
              console.log('Login exitoso', response);
              // Mostrar mensaje de éxito en el snackbar
              this.loginSnackBar('Login exitoso');
              // Redirigir después del login exitoso
              this.router.navigate(['/dashboard']);
            }
          }
        );
    } else {
      // Mostrar mensaje de error cuando el formulario no es válido
      this.loginSnackBar('Por favor, completa todos los campos.');
    }
  }

  // Función para manejar los errores (usando messageError)
  messageError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
    } else {
      this.errorMessage = 'Error de conexión. Inténtalo nuevamente.';
    }
  }

  // Función simplificada para mostrar el snackbar
  loginSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,  // Duración del snackbar en milisegundos
      horizontalPosition: 'center',  // Posición horizontal
      verticalPosition: 'top',  // Posición vertical
    });
  }
}
