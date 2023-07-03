import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListPage implements OnInit {
  protected title: string = 'Habilidades';
  protected skills: Habilidad[] = [];
  protected userId: number = 0;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private usuarioService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.userId = this.usuarioService.getActiveUserId()
  }

  getHabilidadesUsuario(): void {
    this.usuarioService.getHabilidadesUsuario(this.userId).subscribe({
      next: (habilidades) => {
        this.skills = habilidades;
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.getHabilidadesUsuario();
  }

  protected onEdit() {
    this.navCtrl.navigateForward('skills/modify');
  }

  protected onDelete(skill: Habilidad) {
    this.usuarioService.deleteHabilidadUsuario(this.userId, skill.id).subscribe({
      next: (response) => {
        this.toastService.presentToast('Habilidad eliminada', 2000, 'success', 'bottom');
        this.getHabilidadesUsuario();
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }
}
