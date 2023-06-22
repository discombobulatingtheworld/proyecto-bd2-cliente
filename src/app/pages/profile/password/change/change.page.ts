import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { FormValidators as CustomValidators } from 'src/app/helpers/validators';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ChangePage implements OnInit {
  protected title: string = 'Modificar contraseña';

  protected passwordChangeForm = this.formBuilder.group({
    newPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl<string>('', Validators.required)
  },{
    validators: CustomValidators.ConfirmedValidator('newPassword', 'confirmNewPassword')
  });

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack(): void {
    this.navCtrl.navigateRoot('profile');
  }

  protected onPasswordChange(): void {
    this.navCtrl.navigateRoot('profile');
  }

}
