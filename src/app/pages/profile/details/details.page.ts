import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/types/dtos/usuario';
import { PROFILES } from 'src/app/dummy/data';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../../../services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

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
    private usuariosService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }


  getPerfilInit() {
    this.usuariosService.getUserByToken().subscribe({
      next: (usuario) => {
        this.profile = usuario;
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.getPerfilInit();
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
