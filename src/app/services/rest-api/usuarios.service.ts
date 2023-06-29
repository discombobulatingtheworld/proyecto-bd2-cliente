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
  protected userId: number = 0;

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

  getUserId(): number {
    this.getUserIdByToken();
    return this.userId;
  }

  getUserIdByToken(): void {
    let token = sessionStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    this.http.post<any>('http://localhost:3001/api/autenticacion', {}, { headers }).subscribe(
      response => {
        this.userId = response.userId;
      },
      error => {
        console.log(error)
      }
    )
  }

  getHabilidadesUsuario(id: number): Observable<Habilidad[]> {
    let token = sessionStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Habilidad[]>('http://localhost:3001/api/usuarios/' + id + '/habilidades', { headers });
  }
}
