import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  protected processing: boolean = false;
  protected isAlertOpen: boolean = false;
  protected alertMessage: string = '';
  protected alertButtons: any = ['Ok'];

  protected loginForm = this.formBuilder.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  protected async login() {
    //this.navCtrl.navigateRoot('/home');
    this.navCtrl.navigateRoot('/requests/requests');
  }

  protected setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  protected onSubmit() {
    this.login();
  }

  protected onRegister() {
    this.navCtrl.navigateForward('/authentication/registration/start');
  }
}
