import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { HttpRequestHandlerService } from '../utilities/http-request-handler.service';
import { Observable, Subject, tap } from 'rxjs';
import { Registro } from 'src/app/types/dtos/registro';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})


export class LoginService {
  private formRegistro: Registro = new Registro();
  public userName$: Observable<string>;
  public userEmail$: Observable<string>;
  public userId$: Observable<number>;
  private userNameSubject: Subject<string>;
  private userEmailSubject: Subject<string>;
  private userIdSubject: Subject<number>;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private httpHandler: HttpRequestHandlerService,
  ) {
    this.userNameSubject = new Subject<string>();
    this.userEmailSubject = new Subject<string>();
    this.userIdSubject = new Subject<number>();
    this.userName$ = this.userNameSubject.asObservable();
    this.userEmail$ = this.userEmailSubject.asObservable();
    this.userId$ = this.userIdSubject.asObservable();
  }

  auth(email: String, password: String): Observable<{ accessToken: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let req = this.http.post<HttpResponse<{ accessToken: string }>>(`${this.configService.getBackendUrl()}/api/autenticacion/ingreso`, {
      email,
      password
    }, { headers });
    return this.httpHandler.handleRequest(req).pipe(
      tap({
        next: (response) => {
          sessionStorage.setItem('jwt', response.accessToken as string);

          var decodedToken = this.jwtHelper.decodeToken(response.accessToken as string);

          this.userNameSubject.next(decodedToken['fullName']);
          this.userEmailSubject.next(decodedToken['email']);
          this.userIdSubject.next(decodedToken['userId']);
        }
      })
    );
  }

  loadLocalUser() {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      var decodedToken = this.jwtHelper.decodeToken(token);
      this.userNameSubject.next(decodedToken['fullName']);
      this.userEmailSubject.next(decodedToken['email']);
      this.userIdSubject.next(decodedToken['userId']);
    }
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
    this.userNameSubject.next("");
    this.userEmailSubject.next("");
    this.userIdSubject.next(0);
  }
}
