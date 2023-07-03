import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { SKILLS } from 'src/app/dummy/data';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { HabilidadesService } from 'src/app/services/Habilidades/habilidades.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SkillsPage implements OnInit {
  protected processing: boolean = false;
  protected isAlertOpen: boolean = false;
  protected alertMessage: string = '';
  protected alertButtons: any = ['Ok'];
  protected userId: number = 0;

  protected availableSkills: Habilidad[] = [];

  protected title: string = '';
  protected description: string = '';
  protected location: string = '';

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private solicitudesService: SolicitudesService,
    private usuarioService: UsuariosService,
    private habilidadesService: HabilidadesService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.userId = this.usuarioService.getActiveUserId()
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.getHabilidadesUsuario();
    const { title, description, location } = this.solicitudesService.getSolicitudCrear();
    this.title = title;
    this.description = description;
    this.location = location;
  }

  getHabilidadesUsuario(): void {
    this.habilidadesService.getHabilidades().subscribe({
      next: (habilidades) => {
        this.availableSkills = habilidades;
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  protected onBack() {
    this.navCtrl.navigateBack('/requests/create/details');
  }

  protected onFilterSkills() {
      // TODO: Implementar filtro de habilidades
  }

  protected onSkillSelected(skill: Habilidad, event: any) {
    this.solicitudesService.crearSolicitud(this.userId, skill).subscribe({
      next: (response) => {
        this.navCtrl.navigateForward('/requests/create/complete');
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }
}
