import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { FormValidators as CustomValidators } from 'src/app/helpers/validators';
import { LoginService } from 'src/app/services/Login/login.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class StartPage implements OnInit {
  protected processing: boolean = false;
  protected isAlertOpen: boolean = false;
  protected alertMessage: string = '';
  protected alertButtons: any = ['Ok'];

  protected registrationStartForm = this.formBuilder.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    nick: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    passwordConfirmation: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
  }, {
    validators: CustomValidators.ConfirmedValidator('password', 'passwordConfirmation')
  });

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private loginService: LoginService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack() {
    this.navCtrl.navigateBack('/authentication/login');
  }

  protected onNext() {
    if (this.registrationStartForm.invalid) {
      this.toastService.presentToast('Todos los campos son requeridos', 2000, 'danger', 'bottom');
      return;
    }
    this.loginService.setRegistro(this.registrationStartForm.value);
    this.navCtrl.navigateForward('/authentication/registration/skills');
  }

  protected loadCurrentForm() {
    let currentForm = this.loginService.getRegistro();
    try {
      this.registrationStartForm.patchValue(currentForm);
      this.registrationStartForm.controls['passwordConfirmation'].setValue(currentForm.password);
    }
    catch (e) {
      this.toastService.presentToast('Error al cargar los datos', 2000, 'danger', 'bottom');
    }
  }
}
