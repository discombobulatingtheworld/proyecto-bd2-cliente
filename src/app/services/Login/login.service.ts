import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  auth(email: String, password: String): Observable<any> {
    //TODO: SET ENV VARIABLES
    // return this.http.post<any>(`${process.env['API']}/autenticacion/ingreso`, { 
    return this.http.post<any>(`http://localhost:3001/api/autenticacion/ingreso`, { 
      email,
      password
    })
  }
  //TODO: REGISTER
  // register(user: String, password: String, rol: Number): Observable<any> {
  //   return this.http.post<any>('http://localhost:3000/register', { 
  //     user: user,
  //     password: password,
  //     rol: rol
  //   });
  // }
}
