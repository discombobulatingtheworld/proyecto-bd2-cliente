import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { SolicitudCreacion } from 'src/app/types/dtos/solicitud-creacion';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { SolicitudAceptacion } from 'src/app/types/dtos/solicitud-aceptacion';
import { UsuariosService } from '../rest-api/usuarios.service';
import { SolicitudFinalizacion } from 'src/app/types/dtos/solicitud-finalizacion';
import { Chat } from 'src/app/types/dtos/chat';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  public title: string = '';
  public description: string = '';
  public location: string = '';

  constructor(
    private http: HttpClient,
    private userService: UsuariosService
  ) { }

  getSolicitudesRelevantes(id: number): Observable<SolicitudRelevante[]> {
    let token = sessionStorage.getItem('jwt');
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

  empezarSolicitud(title: string, description: string, location: string): void {
    this.title = title;
    this.description = description;
    this.location = location;
  }

  getSolicitudCrear(): any {
    return {
      title: this.title,
      description: this.description,
      location: this.location
    };
  }

  crearSolicitud(id: number, skill: Habilidad): Observable<any> {
    let token = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const solicitud = {
      "title": this.title,
      "description": this.description,
      "location": this.location,
      "requesterId": id,
      "skill": skill.id
    }
    return this.http.post('http://localhost:3001/api/solicitudes', solicitud, { headers });
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
  
  getSolicitudChat(id: number): Observable<Chat> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<any>(`http://localhost:3001/api/solicitudes/${id}/chat`, { headers });
  }

  sendMessage(id: number, message: string): Observable<void> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post<void>(`http://localhost:3001/api/solicitudes/${id}/chat/mensajes`, {
      contents: message
    }, { headers });
  }
}
