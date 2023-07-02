import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';
import { SolicitudCreacion } from 'src/app/types/dtos/solicitud-creacion';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(
    private http: HttpClient,
  ) { }

  getSolicitudesRelevantes(id: number): Observable<SolicitudRelevante[]> {
    let token = sessionStorage.getItem('jwt');
    console.log(token);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<SolicitudRelevante[]>(`http://localhost:3001/api/usuarios/1/solicitudes/relevantes`, { headers });
  }

  getSolicitudesActivas(id: number): Observable<SolicitudActiva[]> {
    let token = sessionStorage.getItem('jwt');
    console.log(token);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<SolicitudActiva[]>('http://localhost:3001/api/usuarios/' + id + '/solicitudes/activas', { headers });
  }

  insertSolicitud(solicitud: SolicitudCreacion): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`http://localhost:3001/api/solicitudes`, {
      solicitud
    } ,{ headers });
  }
}
