import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { Habilidad } from 'src/app/types/dtos/habilidad';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  public title: string = '';
  public description: string = '';
  public location: string = '';

  constructor(
    private http: HttpClient,
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

  getSolicitud(): any {
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
}
