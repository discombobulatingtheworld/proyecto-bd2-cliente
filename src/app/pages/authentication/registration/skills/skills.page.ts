import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { SKILLS } from 'src/app/dummy/data';
import { Habilidad } from 'src/app/types/dtos/habilidad';
import { LoginService } from 'src/app/services/Login/login.service';
import { ToastService } from 'src/app/services/utilities/toast.service';
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

  protected availableSkills: [Habilidad, boolean][] = new Array<[Habilidad, boolean]>();


  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private loginService: LoginService,
    private toastService: ToastService,
    private habilidadesService: HabilidadesService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.loadSkills();
  }

  protected onBack() {
    this.navCtrl.navigateBack('/authentication/registration/start');
  }

  protected onNext() {
    let currentForm = this.loginService.getRegistro();
    currentForm.skills = this.availableSkills.filter((habilidad) => habilidad[1]).map((habilidad) => habilidad[0].id);
    this.loginService.setRegistro(currentForm);
    this.loginService.register().subscribe({
      next: (response) => {
        this.navCtrl.navigateForward('/authentication/registration/complete');
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  protected onFilterSkills() {

  }

  protected loadSkills() {
    this.habilidadesService.getHabilidades().subscribe({
      next: (habilidades) => {
        this.availableSkills = habilidades.map((habilidad) => [habilidad, false]);
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }
}
