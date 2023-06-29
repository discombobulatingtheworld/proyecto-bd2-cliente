import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { Observable } from 'rxjs';


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
}


