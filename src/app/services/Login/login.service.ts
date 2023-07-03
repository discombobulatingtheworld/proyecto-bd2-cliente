import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UsuariosService } from '../rest-api/usuarios.service';
import { NavController } from '@ionic/angular';
import { ConfigService } from '../config/config.service';
import { HttpRequestHandlerService } from '../utilities/http-request-handler.service';
import { Observable } from 'rxjs';
import { Registro } from 'src/app/types/dtos/registro';

@Injectable({
  providedIn: 'root'
})


export class LoginService {
  private formRegistro: Registro = new Registro();

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private httpHandler: HttpRequestHandlerService
  ) { }

  auth(email: String, password: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let req = this.http.post<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/autenticacion/ingreso`, {
      email,
      password
    }, { headers });
    return this.httpHandler.handleRequest(req);
  }

  initRegistro(): Registro {
    this.formRegistro = new Registro();
    return this.formRegistro;
  }

  getRegistro(): Registro {
    return this.formRegistro;
  }

  setRegistro(registro: Registro) {
    this.formRegistro = registro;
  }

  register(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let req = this.http.post<HttpResponse<any>>(`${this.configService.getBackendUrl()}/api/autenticacion/registro`, {
      email: this.formRegistro.email,
      password: this.formRegistro.password,
      nick: this.formRegistro.nick,
      name: this.formRegistro.name,
      lastName: this.formRegistro.lastName,
      skills: this.formRegistro.skills
    }, { headers });
    return this.httpHandler.handleRequest(req);
  }

  logout() {
    sessionStorage.removeItem('jwt');
  }
}
