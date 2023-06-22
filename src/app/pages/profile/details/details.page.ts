import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/types/dtos/usuario';
import { PROFILES } from 'src/app/dummy/data';

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
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.profile = PROFILES[0];
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
