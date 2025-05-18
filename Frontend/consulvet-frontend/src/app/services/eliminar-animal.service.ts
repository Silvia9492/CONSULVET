import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class EliminarAnimalService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAnimalsByCarer(dniCuidador: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/animales/cuidador?cuidador_dni=${dniCuidador}`);
  }

  deleteAnimal(codigo_paciente: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/animal/${codigo_paciente}`);
  }
}