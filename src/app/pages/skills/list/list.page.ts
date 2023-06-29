import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { USER_SKILLS } from 'src/app/dummy/data';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';

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

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    //this.skills = USER_SKILLS;
    this.getHabilidadesUsuario();
  }

  // getHabilidadesUsuario hardcodeado, falta obtener el id del usuario en sesion 
  getHabilidadesUsuario(): void {
    this.usuarioService.getHabilidadesUsuario(1).subscribe((habilidades) => {
      this.skills = habilidades;
    })
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  protected onEdit() {
    this.navCtrl.navigateForward('skills/modify');
  }

  protected onDelete(skill: Habilidad) {
    // TODO: Implementar borrado de habilidad
  }
}
