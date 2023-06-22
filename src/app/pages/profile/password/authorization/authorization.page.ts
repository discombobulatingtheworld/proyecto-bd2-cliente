import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AuthorizationPage implements OnInit {
  protected title: string = 'Modificar contraseña';

  protected authorizePasswordModificationForm = this.formBuilder.group({
    authorizationCode: new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{3}$')])
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

  protected onBack() {
    this.navCtrl.navigateBack('profile');
  }

  protected onAuthorize() {
    this.navCtrl.navigateForward('profile/password/change');
  }

  protected onAuthorizationCodeChange() {
    this.authorizePasswordModificationForm.controls.authorizationCode.setValue(this.authorizePasswordModificationForm.controls.authorizationCode.value!.replace(/[^0-9]/g, '').replace(/(.{3})/g, '$1-').slice(0, -1));
  }
}
