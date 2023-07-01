import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/types/dtos/usuario';
import { PROFILES } from 'src/app/dummy/data';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../../../services/rest-api/usuarios.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {
  protected title: string = 'Perfil';
  protected profile?: Usuario;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private httpClient: HttpClient,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.getPerfilInit();
  }


  getPerfilInit() {
    this.usuariosService.getUserByToken().subscribe(
      response => {
        this.profile = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  protected onEdit() {
    this.navCtrl.navigateForward('profile/modify');
  }

  protected onLogout() {
    this.navCtrl.navigateRoot('');
  }

  protected onModifyPassword() {
    this.navCtrl.navigateForward('profile/password');
  }
}
