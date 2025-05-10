import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuidador } from '../models/cuidador.model';

@Injectable({
  providedIn: 'root'
})
export class CuidadoresService {

  private apiUrl = 'http://localhost:8000/api/cuidadores';

  constructor(private http: HttpClient) { }

  getCuidador(dni: string): Observable<Cuidador> {
    return this.http.get<Cuidador>(`${this.apiUrl}/${dni}`);
  }

  updateCuidador(dni: string, datos: any): Observable<Cuidador> {
    return this.http.put<Cuidador>(`${this.apiUrl}/${dni}`, datos);
  }
}
