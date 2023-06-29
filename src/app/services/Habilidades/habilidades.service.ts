import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { Observable } from 'rxjs';
import { HabilidadesCategoria } from 'src/app/types/dtos/habilidades-categoria';


@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  constructor(
    private http: HttpClient,
  ) { }

  getHabilidades(): Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>('http://localhost:3001/api/habilidades');
  }

  getHabilidadesCategoria(): Observable<HabilidadesCategoria[]> {
    return this.http.get<HabilidadesCategoria[]>('http://localhost:3001/api/habilidades/categorias');
  }
}


