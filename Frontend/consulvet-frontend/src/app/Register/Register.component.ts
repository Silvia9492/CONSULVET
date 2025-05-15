import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;

  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    const validLength = value.length >= 8;

    const passwordValid = hasUpper && hasLower && hasNumber && hasSpecialChar && validLength;

    return !passwordValid ? {
      passwordRequirements: {
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecialChar,
        validLength
      }
    } : null;
  }

  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const verifyPassword = control.get('verifyPassword')?.value;
    
    return password && verifyPassword && password !== verifyPassword 
      ? { passwordMissmatch: true } 
      : null;
  }

  userData = new FormGroup({
    dni: new FormControl('', Validators.required),
    completeName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, RegisterComponent.passwordValidator]),
    verifyPassword: new FormControl('', [Validators.required])
  },
  { validators: RegisterComponent.passwordMatchValidator });


  get passwordControl() {
    return this.userData.get('password');
  }

  get verifyPasswordControl() {
    return this.userData.get('verifyPassword');
  }

  get passwordMissmatch() {
    return this.userData.hasError('passwordMissmatch') && 
           this.verifyPasswordControl?.touched;
  }

  registerUser() {
    if (!this.userData.valid) {
      this.snackBar.open('Por favor, corrija los errores en el formulario', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
  
      Object.keys(this.userData.controls).forEach(key => {
        const control = this.userData.get(key);
        control?.markAsTouched();
      });
      return;
    }
  
    this.isLoading = true;
  
    const form = this.userData.value;
  
    const requestBody = {
      dni: form.dni,
      nombre_completo: form.completeName,
      fecha_nacimiento: this.formatDate(form.birthday),
      direccion: form.address,
      telefono: form.phoneNumber,
      email: form.email,
      username: form.userName,
      password: form.password
    };
  
    this.http.post('http://localhost:8000/api/register', requestBody).subscribe({
      next: () => {
        this.loginService.login(requestBody.username ?? '', requestBody.password ?? '')
          .pipe(
            catchError(error => {
              this.snackBar.open('Registro ok, pero fallo al iniciar sesión automáticamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              return of(null);
            })
          )
          .subscribe(response => {
            if (response) {
              localStorage.setItem('username', response.nombre_usuario);
              localStorage.setItem('dni', response.dni);

              this.snackBar.open('¡Bienvenida/o! Tu cuenta ha sido creada.', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
  
        this.router.navigate(['/Profile']);
      }
       });
      },
      error: (error) => {
        this.snackBar.open('Error al registrar usuario. Intenta nuevamente.', 'Cerrar', {
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

  formatDate(date: any): string {
    const d = new Date(date);
    const month = ('' + (d.getMonth() + 1)).padStart(2, '0');
    const day = ('' + d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  
  goToLogin() {
    this.router.navigate(['/Login']);
  }

  constructor(private snackBar: MatSnackBar, private router: Router, private http: HttpClient, private loginService: LoginService) { }

  ngOnInit() {
  }

}
