import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/types/dtos/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habilidad } from 'src/app/types/dtos/habilidad';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token: undefined | String = undefined;
  user: undefined | Usuario = undefined;

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

  getUserIdByToken(): number {
    let userId: number = 0;
    let token = sessionStorage.getItem('jwt');
    console.log(token);

    //const headers = { Authorization: `Bearer ${token}` };
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    this.http.post<any>('http://localhost:3001/api/autenticacion', { headers }).subscribe(
      response => {
        console.log('aca estoy');
        console.log(response);
        userId = response.userId;
      },
      error => {
        console.log(error)
      }
    )
    console.log(userId);
    return userId;
  }

  getHabilidadesUsuario(id: number): Observable<Habilidad[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Habilidad[]>('http://localhost:3001/api/usuarios/' + id + '/habilidades', { headers });
  }
}
