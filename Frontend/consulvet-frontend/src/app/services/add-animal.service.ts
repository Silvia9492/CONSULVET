import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AddAnimalService {

  private apiUrl = 'http://localhost:8000/api/animales';

  constructor(private http: HttpClient) { }

  registerAnimal(animalFormData: FormData): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animalFormData);
  }
}