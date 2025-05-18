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

  getAnimalsByCarer(dniCuidador: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/animales/cuidador?cuidador_dni=${dniCuidador}`);
  }
}