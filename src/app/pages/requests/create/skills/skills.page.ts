import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { SKILLS } from 'src/app/dummy/data';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { HabilidadesService } from 'src/app/services/Habilidades/habilidades.service';

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

  protected availableSkills: Habilidad[] = [];

  protected title: string = '';
  protected description: string = '';
  protected location: string = '';

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private solicitudesService: SolicitudesService,
    private usuarioService: UsuariosService,
    private habilidadesService: HabilidadesService
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.getHabilidadesUsuario();
    const { title, description, location } = this.solicitudesService.getSolicitudCrear();
    this.title = title;
    this.description = description;
    this.location = location;
  }

  getHabilidadesUsuario(): void {
    this.usuarioService.getUserByToken().subscribe((response) => {
      this.habilidadesService.getHabilidades().subscribe((habilidades) => {
        this.availableSkills = habilidades;
      })
    }, (error) => {
      console.log(error);
    });
  }

  protected onBack() {
    this.navCtrl.navigateBack('/requests/create/details');
  }

  protected onFilterSkills() {
  }

  protected onSkillSelected(skill: Habilidad, event: any) {
    this.usuarioService.getUserByToken().subscribe(({ id }) => {
      this.solicitudesService.crearSolicitud(id, skill).subscribe((response) => {
        this.navCtrl.navigateForward('/requests/create/complete');
      }, (error) => {
        alert('Error al crear la solicitud');
      });
    }, (error) => {
      alert('Error al obtener el usuario');
    });
  }
}
