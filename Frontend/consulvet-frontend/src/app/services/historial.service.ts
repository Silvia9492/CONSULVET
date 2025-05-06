import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atienden } from '../models/atienden.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private apiUrl = 'http://localhost:8000/api/historial';

  constructor(private http: HttpClient) { }

  obtenerHistorial(nombre: string, cuidadorDni: string): Observable<Atienden[]> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('cuidador_dni', cuidadorDni);

    return this.http.get<Atienden[]>(this.apiUrl, { params });
  }
}
