import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { SKILLS, USER_SKILLS } from 'src/app/dummy/data';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModifyPage implements OnInit {
  protected title: string = 'Editar Habilidades';

  protected availableSkills: [Habilidad, boolean][] = [];
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.availableSkills = SKILLS.map(s => [s, USER_SKILLS.filter(us => us.id === s.id).length > 0]);
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
