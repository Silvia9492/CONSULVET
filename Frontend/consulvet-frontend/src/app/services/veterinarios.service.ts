import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veterinario } from '../models/veterinario.model'

@Injectable({
  providedIn: 'root'
})
export class VeterinariosService {

  private apiUrl = 'http://localhost:8000/api/veterinarios';

  constructor(private http: HttpClient) { }

  getFilteredVeterinaries(servicio: string, centroId: number, horario: string): Observable<Veterinario[]> {
    const params = new HttpParams()
      .set('servicio', servicio)
      .set('centroId', centroId.toString())
      .set('horario', horario);
  
    return this.http.get<Veterinario[]>(`${this.apiUrl}/filtrar`, { params });
  }  
}