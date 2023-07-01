import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { SKILLS } from 'src/app/dummy/data';
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

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private habilidadService: HabilidadesService
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.getHabilidades()
  }

  getHabilidades(): void {
    this.habilidadService.getHabilidades().subscribe((habilidades) => {
      this.availableSkills = habilidades;
    })
  }

  protected onBack() {
    this.navCtrl.navigateBack('/requests/create/details');
  }

  protected onFilterSkills() {
  }

  protected onSkillSelected(skill: Habilidad, event: any) {
    this.navCtrl.navigateForward('/requests/create/complete');
  }
}
