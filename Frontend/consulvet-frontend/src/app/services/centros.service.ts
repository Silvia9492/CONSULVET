import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Centro } from '../models/centro.model';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  private apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getCentrosPorTipo(tipo: string): Observable<Centro[]> {
    return this.http.get<Centro[]>(`${this.apiUrl}/centros/por-servicio/${tipo}`);
  }
}
