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
  protected userId: number = 0;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.getHabilidadesUsuario();
  }

  getHabilidadesUsuario(): void {
    this.usuarioService.getUserByToken().subscribe((response) => {
      this.usuarioService.getHabilidadesUsuario(response.id).subscribe((habilidades) => {
        this.skills = habilidades;
      })
    }, (error) => {
      console.log(error);
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  protected onEdit() {
    this.navCtrl.navigateForward('skills/modify');
  }

  protected onDelete(skill: Habilidad) {
    this.usuarioService.getUserByToken().subscribe((response) => {
      this.usuarioService.deleteHabilidadUsuario(response.id, skill.id).subscribe((response) => {
        this.getHabilidadesUsuario();
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }
}
