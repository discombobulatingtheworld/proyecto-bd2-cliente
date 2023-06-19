import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Validators as CustomValidators } from 'src/app/helpers/validators';

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
    birthDate: new FormControl<Date>(new Date(), Validators.required),
  },{
    validators: CustomValidators.ConfirmedValidator('password', 'passwordConfirmation')
  });

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  protected onBack() {
    this.navCtrl.navigateBack('/authentication/login');
  }

  protected onNext() {
    this.navCtrl.navigateForward('/authentication/registration/skills');
  }
}
