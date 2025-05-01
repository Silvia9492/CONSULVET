import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  private apiUrl = 'http://localhost:8000/api/animales/usuario/{username}';

  constructor(private http: HttpClient) { }

  getAnimalesByUsername(username: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`http://localhost:8000/api/animales/usuario/${username}`);
  }
}
