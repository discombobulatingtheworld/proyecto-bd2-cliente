import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { FormValidators as CustomValidators } from 'src/app/helpers/validators';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/utilities/toast.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ChangePage implements OnInit {
  protected title: string = 'Modificar contraseña';
  protected authCode: number = 0;
  protected userId: number = 0;

  protected passwordChangeForm = this.formBuilder.group({
    newPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl<string>('', Validators.required)
  },{
    validators: CustomValidators.ConfirmedValidator('newPassword', 'confirmNewPassword')
  });

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.userId = this.usuariosService.getActiveUserId()
    let navigation = this.router.getCurrentNavigation()
    this.authCode = navigation?.extras.state?.['authCode'];
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack(): void {
    this.navCtrl.navigateRoot('profile');
  }

  protected onPasswordChange(): void {
    this.usuariosService.changePassword(this.userId, this.authCode, this.passwordChangeForm.controls['newPassword'].value).subscribe({
      next: (response) => {
        this.toastService.presentToast('Contraseña modificada', 2000, 'success', 'bottom');
        this.navCtrl.navigateRoot('profile');
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }
}