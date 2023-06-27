import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, HttpClientModule],
})
export class AppComponent {
  public appPages = [
    { title: 'Solicitudes', url: '/requests/requests', icon: 'construct' },
    { title: 'Conexiones', url: '/connections', icon: 'people' },
    { title: 'Perfil', url: '/profile/details', icon: 'person' },
    { title: 'Habilidades', url: '/skills/list', icon: 'medal' },
  ];
  public labels = [/*'Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'*/];
  constructor() {}
}
