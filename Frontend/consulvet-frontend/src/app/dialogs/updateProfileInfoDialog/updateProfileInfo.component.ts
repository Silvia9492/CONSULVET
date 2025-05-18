import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuidadoresService } from 'src/app/services/cuidadores.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updateProfileInfo',
  templateUrl: './updateProfileInfo.component.html',
  styleUrls: ['./updateProfileInfo.component.css']
})
export class UpdateProfileInfoComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private cuidadoresService: CuidadoresService,
    private dialogRef: MatDialogRef<UpdateProfileInfoComponent>
  ) {}

  //El dni se carga desde localStorage al iniciar el componente, para que esté disponible y la consulta a la base de datos funcione
  ngOnInit() {
    const dni = localStorage.getItem('dni');
    if (dni) {
      this.updateUserData.reset();
      this.updateUserData.patchValue({ dni });
      this.loadCarerData(dni);
    }
  }

  isLoading = false;

  //El dni se va a presentar deshabilitado; es un identificador único de persona que no puede modificarse
  updateUserData = new FormGroup({
    dni: new FormControl({ value: '', disabled: true }, Validators.required),
    completeName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  updateUser() {
    if (!this.updateUserData.valid) {
      this.snackBar.open('El formulario contiene errores. Por favor, completa tus datos correctamente antes de continuar', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      Object.keys(this.updateUserData.controls).forEach(key => {
        const control = this.updateUserData.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    //"Raw" permite obtener todos los valores, incluso los deshabilitados. Como el dni lo está, usamos getRawValue() en lugar de getValue() para que lo muestre
    const form = this.updateUserData.getRawValue();

    const requestBody = {
      nombre_completo: form.completeName,
      fecha_nacimiento: this.formatDate(form.birthday),
      direccion: form.address,
      telefono: form.phoneNumber,
      email: form.email
    };

    const dni = form.dni ?? '';
    this.cuidadoresService.updateCarer(dni, requestBody).subscribe({
      next: (response) => {
        this.snackBar.open('¡Tus datos han sido actualizados con éxito!', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        setTimeout(() => {
          this.dialogRef.close('datosActualizados');
        }, 2000);
      },
      error: (error) => {
        this.snackBar.open('Se ha producido un error al tratar de actualizar tus datos. Por favor, inténtalo de nuevo', '', {
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

  loadCarerData(dni: string) {
    this.cuidadoresService.getCarer(dni).subscribe({
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
        this.snackBar.open('Se ha producido un error al tratar de cargar tus datos personales', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.error(error);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}