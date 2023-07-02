import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';
import { SolicitudCreacion } from 'src/app/types/dtos/solicitud-creacion';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { SolicitudAceptacion } from 'src/app/types/dtos/solicitud-aceptacion';
import { UsuariosService } from '../rest-api/usuarios.service';
import { SolicitudFinalizacion } from 'src/app/types/dtos/solicitud-finalizacion';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(
    private http: HttpClient,
    private userService: UsuariosService
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
    }, { headers });
  }

  getSolicitud(id: number): Observable<Solicitud> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<Solicitud>(`http://localhost:3001/api/solicitudes/${id}`, { headers });
  }

  acceptSolicitud(id: number): Observable<any> {
    let token = sessionStorage.getItem('jwt');
    let providerId = this.userService.getActiveUserId();

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.put<any>(`http://localhost:3001/api/solicitudes/${id}/aceptar`,
      new SolicitudAceptacion()
        .set('solicitudId', id)
        .set('providerId', providerId)
      , { headers });
  }

  finalizeSolicitud(solicitud: SolicitudFinalizacion): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.put<any>(`http://localhost:3001/api/solicitudes/${solicitud.requestId}/finalizar`,
      {
        requestId: solicitud.requestId,
        userId: solicitud.userId,
        status: solicitud.status,
        opinion: solicitud.opinion
      }
      , { headers });
  }
}
