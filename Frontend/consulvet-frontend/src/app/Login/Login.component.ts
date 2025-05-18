import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  isLoading=false;

  loginData = new FormGroup({
    nombre_usuario: new FormControl('', [Validators.required]),
    contraseña: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';

  onSubmit(): void {
    if (this.loginData.valid) {
      this.isLoading = true;
  
      const nombre_usuario = this.loginData.value.nombre_usuario ?? '';
      const contraseña = this.loginData.value.contraseña ?? '';
  
      this.loginService.login(nombre_usuario, contraseña)
        .pipe(
          catchError(error => {
            this.messageError(error);
            this.isLoading = false;
            return of(null);
          })
        )
        .subscribe({
          next: (response) => {
            if (response) {
              localStorage.setItem('username', response.nombre_usuario);
              localStorage.setItem('dni', response.dni);
              if (response.foto) {
                localStorage.setItem('foto_perfil', response.foto);
              } else {
                localStorage.removeItem('foto_perfil');
              }
              this.router.navigate(['/Profile']);
            }
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    } else {
      this.loginSnackBar('Introduce todos tus datos para poder iniciar sesión con tu cuenta');
    }
  }

  messageError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'El nombre de usuario o la contraseña son incorrectos';
    } else {
      this.errorMessage = 'Se ha producido un error de conexión. Por favor, inténtalo de nuevo';
    }
  }

  loginSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  goToRegister() {
    this.router.navigate(['/Register']);
  }
}