import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { SolicitudCreacion } from 'src/app/types/dtos/solicitud-creacion';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { SolicitudAceptacion } from 'src/app/types/dtos/solicitud-aceptacion';
import { UsuariosService } from '../rest-api/usuarios.service';
import { SolicitudFinalizacion } from 'src/app/types/dtos/solicitud-finalizacion';
import { Chat } from 'src/app/types/dtos/chat';
import { ConfigService } from '../config/config.service';
import { HttpRequestHandlerService } from '../utilities/http-request-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  public title: string = '';
  public description: string = '';
  public location: string = '';

  constructor(
    private http: HttpClient,
    private userService: UsuariosService,
    private configService: ConfigService,
    private httpHandler: HttpRequestHandlerService
  ) { }

  getSolicitudesRelevantes(id: number): Observable<SolicitudRelevante[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    let req = this.http.get<HttpResponse<SolicitudRelevante[]>>(`${this.configService.getBackendUrl()}/api/usuarios/1/solicitudes/relevantes`, { headers });
    return this.httpHandler.handleRequest(req);
  }

  getSolicitudesActivas(id: number): Observable<SolicitudActiva[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    let req = this.http.get<HttpResponse<SolicitudActiva[]>>(`${this.configService.getBackendUrl()}/api/usuarios/` + id + '/solicitudes/activas', { headers });
    return this.httpHandler.handleRequest(req);
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
    let req = this.http.post<HttpResponse<void>>(`${this.configService.getBackendUrl()}/api/solicitudes`, solicitud, { headers });
    return this.httpHandler.handleRequest(req);
  }

  insertSolicitud(solicitud: SolicitudCreacion): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    let req = this.http.post<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/solicitudes`, {
      solicitud
    }, { headers });
    return this.httpHandler.handleRequest(req);
  }

  getSolicitud(id: number): Observable<Solicitud> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.get<HttpResponse<Solicitud>>(`${this.configService.getBackendUrl()}/api/solicitudes/${id}`, { headers });
    return this.httpHandler.handleRequest(req);
  }

  acceptSolicitud(id: number): Observable<any> {
    let token = sessionStorage.getItem('jwt');
    let providerId = this.userService.getActiveUserId();

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.put<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/solicitudes/${id}/aceptar`,
      new SolicitudAceptacion()
        .set('solicitudId', id)
        .set('providerId', providerId)
      , { headers });
    return this.httpHandler.handleRequest(req);
  }

  finalizeSolicitud(solicitud: SolicitudFinalizacion): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.put<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/solicitudes/${solicitud.requestId}/finalizar`,
      {
        requestId: solicitud.requestId,
        userId: solicitud.userId,
        status: solicitud.status,
        opinion: solicitud.opinion
      }
      , { headers });
    return this.httpHandler.handleRequest(req);
  }
  
  getSolicitudChat(id: number): Observable<Chat> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.get<HttpResponse<Chat>>(`${this.configService.getBackendUrl()}/api/solicitudes/${id}/chat`, { headers });
    return this.httpHandler.handleRequest(req);
  }

  sendMessage(id: number, message: string): Observable<void> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.post<HttpResponse<void>>(`${this.configService.getBackendUrl()}/api/solicitudes/${id}/chat/mensajes`, {
      contents: message
    }, { headers });
    return this.httpHandler.handleRequest(req);
  }
}
