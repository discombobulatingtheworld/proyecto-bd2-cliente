import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AuthorizationPage implements OnInit {
  protected title: string = 'Modificar contraseña';
  protected userId: number = 0;

  protected authorizePasswordModificationForm = this.formBuilder.group({
    authorizationCode: new FormControl<number>(0, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  });

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.userId = this.usuariosService.getActiveUserId()
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.usuariosService.requestPasswordChange(this.userId).subscribe({
      next: (response) => {
        this.toastService.presentToast('Código de autorización enviado', 2000, 'success', 'bottom');
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  protected onBack() {
    this.navCtrl.navigateBack('profile');
  }

  protected onAuthorize() {
    let authCode = this.authorizePasswordModificationForm.controls.authorizationCode.value;
    this.navCtrl.navigateForward('profile/password/change', { 
      state: { 
        authCode: authCode 
      } 
    });
  }

  protected onAuthorizationCodeChange() {
    //this.authorizePasswordModificationForm.controls.authorizationCode.setValue(this.authorizePasswordModificationForm.controls.authorizationCode.value!.replace(/[^0-9]/g, '').replace(/(.{3})/g, '$1-').slice(0, -1));
  }
}
