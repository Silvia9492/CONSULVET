import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private apiUrl = 'http://localhost:8000/api/login';

  constructor(private http: HttpClient) { }

  login(nombre_usuario: string, contraseña: string): Observable<any> {
    const body = { nombre_usuario, contraseña };
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}