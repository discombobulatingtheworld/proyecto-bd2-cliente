import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from '../rest-api/usuarios.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(
    private http: HttpClient,
    private userService: UsuariosService,
    private navCtrl: NavController,
  ) { }

  auth(email: String, password: String): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>('http://localhost:3001/api/autenticacion/ingreso', {
      email,
      password
    }, { headers }).subscribe(
      response => {
        console.log(response);

        if (response.message) {
          alert(response.message);
        } else {
          const accessToken = response.accessToken;
          this.userService.setUserToken(accessToken);
          this.navCtrl.navigateRoot('/requests/requests');
        }
      },
      error => {
        alert('Email o contraseña incorrectos');
        // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
      }
    );
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
