import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/types/dtos/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Conexion } from 'src/app/types/dtos/conexion';
import { ConfigService } from '../config/config.service';
import { HttpRequestHandlerService } from '../utilities/http-request-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  token: undefined | String = undefined;
  user: undefined | Usuario = undefined;
  // protected userId: number = 0;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private httpHandler: HttpRequestHandlerService
  ) { }

  // POR AHORA SOLO GUARDA EL TOKEN EN EL SESSION STORAGE
  setUserToken(accessToken: String) {
    this.token = accessToken;
    sessionStorage.setItem('jwt', accessToken as string);
  }

  clearUserToken() {
    this.user = undefined;
    this.token = undefined;
  }

  getUserByToken(): Observable<Usuario> {
    let token = sessionStorage.getItem('jwt');

    if (token === null) {
      return new Observable<Usuario>(observer => {
        observer.next(undefined);
        observer.complete();
      });
    }

    var decodedToken = this.jwtHelper.decodeToken(token);
    var userId = decodedToken['userId'];

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    let req = this.http.get<HttpResponse<Usuario>>(`${this.configService.getBackendUrl()}/api/usuarios/` + userId, { headers });
    return this.httpHandler.handleRequest(req);
  }

  getActiveUserId(): number {
    let token = sessionStorage.getItem('jwt');

    if (token === null) {
      return 0;
    }

    var decodedToken = this.jwtHelper.decodeToken(token);
    var userId = decodedToken['userId'];

    return userId;
  }

  getConexionesUsuario(id: number): Observable<Conexion[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    let req = this.http.get<HttpResponse<Conexion[]>>(`${this.configService.getBackendUrl()}/api/usuarios/` + id + '/conexiones', { headers });
    return this.httpHandler.handleRequest(req);
  }

  acceptConnectionToUser(idUsuario: number, idOtherUser: number): Observable<Conexion> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.put<HttpResponse<Conexion>>(`${this.configService.getBackendUrl()}/api/usuarios/${idUsuario}/conexiones/${idOtherUser}`, {}, { headers });
    return this.httpHandler.handleRequest(req);
  }

  removeConexionUsuario(idUsuario: number, otherUserId: number): Observable<Conexion[]> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    let req = this.http.delete<HttpResponse<Conexion[]>>(`${this.configService.getBackendUrl()}/api/usuarios/${idUsuario}/conexiones/${otherUserId}`, { headers });
    return this.httpHandler.handleRequest(req);
  }

  getSolicitudesUsuario(id: number): Observable<Conexion[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    let req = this.http.get<HttpResponse<Conexion[]>>(`${this.configService.getBackendUrl()}/api/usuarios/` + id + '/conexiones', { headers });
    return this.httpHandler.handleRequest(req);
  }

  getHabilidadesUsuario(id: number): Observable<Habilidad[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    let req = this.http.get<HttpResponse<Habilidad[]>>(`${this.configService.getBackendUrl()}/api/usuarios/` + id + '/habilidades', { headers });
    return this.httpHandler.handleRequest(req);
  }

  deleteHabilidadUsuario(idUsuario: number, idHabilidad: number): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    let req = this.http.delete<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/usuarios/${idUsuario}/habilidades/${idHabilidad}`, { headers });
    return this.httpHandler.handleRequest(req);
  }

  insertHabilidadUsuario(idUsuario: number, idHabilidad: number): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    let req = this.http.post<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/usuarios/${idUsuario}/habilidades`, {
      userId: idUsuario,
      skillId: idHabilidad
    }, { headers });
    return this.httpHandler.handleRequest(req);
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    let req = this.http.put<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/usuarios/${usuario.id}`, 
    { 
      name: usuario.name,
      lastName: usuario.lastName,
      nick: usuario.nick,
      email: usuario.email
     },
    { headers });
    return this.httpHandler.handleRequest(req);
  }

  requestPasswordChange(id: number): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.post<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/usuarios/${id}/password`, {}, { headers });
    return this.httpHandler.handleRequest(req);
  }

  changePassword(id: number, authCode: number, password: string): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.put<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/usuarios/${id}/password`, {
      userId: id,
      password: password,
      authCode: authCode
    }, { headers });

    return this.httpHandler.handleRequest(req);
  }

  searchUsers(search: string): Observable<Usuario[]> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.post<HttpResponse<Usuario[]>>(`${this.configService.getBackendUrl()}/api/usuarios/search/`, {
      email: '',
      nick: '',
      fullName: search,
      skills: []
    }, { headers });

    return this.httpHandler.handleRequest(req);
  }

  requestConnection(idUsuario: number, idOtherUser: number): Observable<Conexion> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let req = this.http.post<HttpResponse<Conexion>>(`${this.configService.getBackendUrl()}/api/usuarios/${idUsuario}/conexiones`, {
      activeUserId: idUsuario,
      passiveUserId: idOtherUser
    }, { headers });

    return this.httpHandler.handleRequest(req);
  }
}
