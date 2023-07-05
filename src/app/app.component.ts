import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginService } from './services/Login/login.service';
import { UsuariosService } from './services/rest-api/usuarios.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [HttpClientModule, IonicModule, RouterLink, RouterLinkActive, CommonModule],
  // providers: [HttpClientModule]
})

export class AppComponent {
  public appPages = [
    { title: 'Solicitudes', url: '/requests/requests', icon: 'construct' },
    { title: 'Conexiones', url: '/connections', icon: 'people' },
    { title: 'Perfil', url: '/profile/details', icon: 'person' },
    { title: 'Habilidades', url: '/skills/list', icon: 'medal' },
  ];
  public labels = [/*'Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'*/];

  public title: string = 'AyudaYa';
  public userName: string = 'Usuario';
  public userEmail: string = 'Email';

  constructor(
    private loginService: LoginService,
  ) {
    this.loginService.userEmail$.subscribe({
      next: (email) => {
        this.userEmail = email;
      }
    });
    this.loginService.userName$.subscribe({
      next: (name) => {
        this.userName = name;
      }
    });
    this.loginService.loadLocalUser();
  }
}
