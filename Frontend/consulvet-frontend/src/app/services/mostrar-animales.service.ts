import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../models/animal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MostrarAnimalesService {

   private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAnimalesPorCuidador(dniCuidador: string): Observable<Animal[]> {
  // Se pasan los datos como parámetros de la URL
  return this.http.get<Animal[]>(`${this.apiUrl}/animales/cuidador?cuidador_dni=${dniCuidador}`);
  }
}
