import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/login';

  constructor(private http: HttpClient) { }

  // Método para hacer la solicitud de login
  login(nombre_usuario: string, contraseña: string): Observable<any> {
    // Crear el cuerpo de la solicitud
    const body = { nombre_usuario, contraseña };

    // Hacer la solicitud POST
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}
