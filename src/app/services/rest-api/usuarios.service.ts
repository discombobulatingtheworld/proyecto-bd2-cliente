import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/types/dtos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  token: undefined | String = undefined;
  user: undefined | Usuario = undefined;

  constructor() { }

  // POR AHORA SOLO GUARDA EL TOKEN EN EL SESSION STORAGE
  setUserToken(accessToken: String) {
    this.token = accessToken;
    sessionStorage.setItem('jwt', accessToken as string);
  }

  clearUserToken() {
    this.user = undefined;
    this.token = undefined;
  }
}
