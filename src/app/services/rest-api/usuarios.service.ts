import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/types/dtos/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Conexion } from 'src/app/types/dtos/conexion';

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
    return this.http.get<Usuario>('http://localhost:3001/api/usuarios/' + userId, { headers });
  }

  getConexionesUsuario(id: number): Observable<Conexion[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Conexion[]>('http://localhost:3001/api/usuarios/' + id + '/conexiones', { headers });
  }

  acceptConnectionToUser(idUsuario: number, idOtherUser: number): Observable<Conexion> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.put<Conexion>(`http://localhost:3001/api/usuarios/${idUsuario}/conexiones/${idOtherUser}`, {}, { headers });
  }

  removeConexionUsuario(idUsuario: number, otherUserId: number): Observable<Conexion[]> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete<any>(`http://localhost:3001/api/usuarios/${idUsuario}/conexiones/${otherUserId}`, { headers });
  }

  getSolicitudesUsuario(id: number): Observable<Conexion[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Conexion[]>('http://localhost:3001/api/usuarios/' + id + '/conexiones', { headers });
  }

  getHabilidadesUsuario(id: number): Observable<Habilidad[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Habilidad[]>('http://localhost:3001/api/usuarios/' + id + '/habilidades', { headers });
  }

  deleteHabilidadUsuario(idUsuario: number, idHabilidad: number): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete<any>(`http://localhost:3001/api/usuarios/${idUsuario}/habilidades/${idHabilidad}`, { headers });
  }

  insertHabilidadUsuario(idUsuario: number, idHabilidad: number): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`http://localhost:3001/api/usuarios/${idUsuario}/habilidades`, {
      userId: idUsuario,
      skillId: idHabilidad
    }, { headers });
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    let token = sessionStorage.getItem('jwt');

    console.log({...usuario});
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.put<any>(`http://localhost:3001/api/usuarios/${usuario.id}`, 
    { 
      name: usuario.name,
      lastName: usuario.lastName,
      nick: usuario.nick,
      email: usuario.email
     },
    { headers });
  }
}
