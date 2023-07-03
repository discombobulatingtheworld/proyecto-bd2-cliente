import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { SKILLS, USER_SKILLS } from 'src/app/dummy/data';
import { HabilidadesService } from 'src/app/services/Habilidades/habilidades.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

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
    private usuarioService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.userId = this.usuarioService.getActiveUserId()
  }

  getHabilidades(): void {
    this.habilidadService.getHabilidades().subscribe({
      next: (response) => {
          this.allSkills = response;
      },
      error: (error) => {
        this.toastService.presentToast(error , 2000, 'danger', 'bottom');
      }
    });
  }

  getHabilidadesUsuario(): void {
    this.usuarioService.getHabilidadesUsuario(this.userId).subscribe({
      next: (habilidades) => {
        this.mySkills = habilidades;
        this.availableSkills = this.allSkills.map(s => [s, habilidades.filter(us => us.id === s.id).length > 0]);
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.getHabilidades();
    this.getHabilidadesUsuario();
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('/skills');
  }

  protected onSave(): void {  
    this.availableSkills.forEach(([skill, checked]) => {
      if (checked && !this.mySkills.some(us => us.id === skill.id)) {
        this.usuarioService.insertHabilidadUsuario(this.userId, skill.id).subscribe({
          next: (response) => {
            this.toastService.presentToast('Habilidades modificadas', 2000, 'success', 'bottom');
          },
          error: (error) => {
            this.toastService.presentToast(error, 2000);
          }
        });
      } else if (!checked && this.mySkills.some(us => us.id === skill.id)) {
        this.usuarioService.deleteHabilidadUsuario(this.userId, skill.id).subscribe({
          next: (response) => {
            this.toastService.presentToast('Habilidades modificadas', 2000, 'success', 'bottom');
          },
          error: (error) => {
            this.toastService.presentToast(error, 2000);
          }
        });
      }
      this.navCtrl.navigateBack('/skills');
    });
  }

  protected onFilter(): void {
    // TODO: Implementar filtro de habilidades
  }
}
