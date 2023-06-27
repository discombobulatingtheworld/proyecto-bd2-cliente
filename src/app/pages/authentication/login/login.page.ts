import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { LoginService } from '../../../services/Login/login.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { Observable } from 'rxjs';

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
    private userService: UsuariosService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  // protected async login() {
  //       this.navCtrl.navigateRoot('/requests/requests');
  // }

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
      return alert('Por favor, ingrese un email y una contraseña válidos.');
    }
    const email: String = this.loginForm.value.email;
    const password: String = this.loginForm.value.password;
    const observable: Observable<any> = this.LoginService.auth(email, password);
    observable.subscribe(response => {
      if (response.message) {
        alert(response.message);
      } else {
        const accessToken = response.accessToken;
        this.userService.setUserToken(accessToken);

        this.navCtrl.navigateRoot('/requests/requests');
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
    this.navCtrl.navigateForward('/authentication/registration/start');
  }
}
