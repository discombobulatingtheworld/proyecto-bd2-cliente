import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { USER_SKILLS } from 'src/app/dummy/data';
import { HabilidadesService } from 'src/app/services/Habilidades/habilidades.service';

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
    private habilidadService: HabilidadesService
  ) { }

  ngOnInit() {
    //this.skills = USER_SKILLS;
    this.getHabilidades();
  }

  getHabilidades(): void {
    this.habilidadService.getHabilidades().subscribe((habilidades) => {
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
