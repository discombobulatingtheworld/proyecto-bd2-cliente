import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/types/dtos/usuario';
import { PROFILES } from 'src/app/dummy/data';
import { ControlValidators as CustomControlValidators } from 'src/app/helpers/validators';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ModifyPage implements OnInit {
  protected title: string = 'Modificar perfil';
  protected profile?: Usuario;

  protected processing: boolean = false;
  protected isAlertOpen: boolean = false;
  protected alertMessage: string = '';
  protected alertButtons: any = ['Ok'];

  protected profileModificationForm = this.formBuilder.group({
    name: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    nick: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    birthDate: new FormControl<string>('', [Validators.required, CustomControlValidators.validDateStr]),
  });

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.profile = PROFILES[0];
    this.profileModificationForm.setValue({
      name: this.profile.name,
      lastName: this.profile.lastName,
      nick: this.profile.nick,
      email: this.profile.email,
      birthDate: formatDate(this.profile.birthDate, 'dd/MM/yyyy', 'en-US')
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onSave(): void {
    this.navCtrl.navigateRoot('profile');
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('profile');
  }
}
