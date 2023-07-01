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
    this.getHabilidades();
    this.getHabilidadesUsuario();
  }

  getHabilidades(): void {
    this.habilidadService.getHabilidades().subscribe((habilidades) => {
      this.allSkills = habilidades;
    })
  }

  getHabilidadesUsuario(): void {
    this.usuarioService.getUserByToken().subscribe((response) => {
      this.usuarioService.getHabilidadesUsuario(response.id).subscribe((habilidades) => {
        this.mySkills = habilidades;
        this.availableSkills = this.allSkills.map(s => [s, habilidades.filter(us => us.id === s.id).length > 0]);
      })
    }, (error) => {
      console.log(error);
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('/skills');
  }

  protected onSave(): void {
    this.usuarioService.getUserByToken().subscribe(({ id }) => {
      this.availableSkills.forEach(([skill, checked]) => {
        if (checked && !this.mySkills.includes(skill)) {
          this.usuarioService.insertHabilidadUsuario(id, skill.id).subscribe((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          })
        } else if (!checked && this.mySkills.includes(skill)) {
          this.usuarioService.deleteHabilidadUsuario(id, skill.id).subscribe(
            (response) => {

            }, (error) => {
              console.log(error);
            });
        }
        this.navCtrl.navigateBack('/skills');
      })
    }, (error) => {
      console.log(error);
    });
  }

  protected onFilter(): void {
    // TODO: Implementar filtro de habilidades
  }
}
