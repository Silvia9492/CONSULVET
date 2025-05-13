import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateAnimalsService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // GET para obtener animales del cuidador
getAnimalesPorCuidador(dniCuidador: string): Observable<Animal[]> {
  // Se pasan los datos como parámetros de la URL
  return this.http.get<Animal[]>(`${this.apiUrl}/animales/cuidador?cuidador_dni=${dniCuidador}`);
}


updateAnimal(codigo_paciente: number, formData: FormData): Observable<Animal> {
  return this.http.post<Animal>(`${this.apiUrl}/animal/${codigo_paciente}`, formData);
  }
}
