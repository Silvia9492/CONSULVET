import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atienden } from '../models/atienden.model';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

   getAnimalesPorCuidador(dniCuidador: string): Observable<Animal[]> {
    // Se pasan los datos como parámetros de la URL
    return this.http.get<Animal[]>(`${this.apiUrl}/animales/cuidador?cuidador_dni=${dniCuidador}`);
  }

  obtenerHistorial(dni: string, nombreAnimal: string): Observable<Atienden[]> {
    return this.http.get<Atienden[]>(`${this.apiUrl}/historial/${dni}/${nombreAnimal}`);
  }
}
