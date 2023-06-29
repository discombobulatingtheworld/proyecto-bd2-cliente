import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { SKILLS, USER_SKILLS } from 'src/app/dummy/data';
import { HabilidadesService } from 'src/app/services/Habilidades/habilidades.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModifyPage implements OnInit {

  protected title: string = 'Editar Habilidades';
  protected allSkills: Habilidad[] = [];
  protected mySkills: Habilidad[] = [];
  protected availableSkills: [Habilidad, boolean][] = [];
  protected userId: number = 0;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private habilidadService: HabilidadesService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.getUserId();
    this.getHabilidades();
    this.getHabilidadesUsuario();

    // el obtener las habilidades disponibles no funciona con las habilidades traidas de bd
    this.availableSkills = this.allSkills.map(s => [s, this.mySkills.filter(us => us.id === s.id).length > 0]);
  }

  getUserId(): void {
    this.userId = this.usuarioService.getUserIdByToken();
  }

  getHabilidades(): void {
    this.habilidadService.getHabilidades().subscribe((habilidades) => {
      this.allSkills = habilidades;
    })
  }

  getHabilidadesUsuario(): void {
    this.usuarioService.getHabilidadesUsuario(this.userId).subscribe((habilidades) => {
      this.mySkills = habilidades;
    })
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('/skills');
  }

  protected onSave(): void {
    this.navCtrl.navigateBack('/skills');
  }

  protected onFilter(): void {
    // TODO: Implementar filtro de habilidades
  }
}
