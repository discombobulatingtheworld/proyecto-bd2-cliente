import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { LoginService } from '../../../services/Login/login.service';
import { ToastService } from 'src/app/services/utilities/toast.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';

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
    private menuCtrl: MenuController,
    private LoginService: LoginService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected async login() {
    if (
      this.loginForm.invalid ||
      this.loginForm.value.email === '' ||
      this.loginForm.value.password === '' ||
      this.loginForm.value.email === null ||
      this.loginForm.value.password === null ||
      this.loginForm.value.email === undefined ||
      this.loginForm.value.password === undefined
    ) {
      this.toastService.presentToast('Todos los campos son requeridos', 2000, 'danger', 'bottom');
      return;
    }
    const email: String = this.loginForm.value.email;
    const password: String = this.loginForm.value.password;

    this.LoginService.auth(email, password).subscribe({
      next: (_) => {
        this.navCtrl.navigateRoot('/requests/requests');
      },
      error: (err) => {
        this.toastService.presentToast(err, 2000, 'danger', 'bottom');
      }
    });
  }

  protected setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  protected onSubmit() {
    this.login();
  }

  protected onRegister() {
    this.LoginService.initRegistro();
    this.navCtrl.navigateForward('/authentication/registration/start');
  }
}
