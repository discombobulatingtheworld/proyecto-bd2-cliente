import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/types/dtos/usuario';
import { PROFILES } from 'src/app/dummy/data';
import { ControlValidators as CustomControlValidators } from 'src/app/helpers/validators';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

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
  });

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  getPerfilInit() {
    this.usuariosService.getUserByToken().subscribe({
      next: (usuario) => {
        this.profile = usuario;
        this.profileModificationForm.setValue({
          name: usuario.name,
          lastName: usuario.lastName,
          nick: usuario.nick,
          email: usuario.email
        });
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.getPerfilInit();
  }

  protected onSave(): void {
    if (this.profileModificationForm.value.name != null && this.profileModificationForm.value.lastName != null &&
      this.profileModificationForm.value.nick != null && this.profileModificationForm.value.email != null && this.profile != null) {

      this.profile.name = this.profileModificationForm.value.name;
      this.profile.lastName = this.profileModificationForm.value.lastName;
      this.profile.nick = this.profileModificationForm.value.nick;
      this.profile.email = this.profileModificationForm.value.email;

      this.usuariosService.updateUsuario(this.profile).subscribe({
        next: (usuario) => {
          this.toastService.presentToast('Perfil actualizado', 2000, 'success', 'bottom');
          this.navCtrl.navigateRoot('profile');
        },
        error: (error) => {
          this.toastService.presentToast(error, 2000, 'danger', 'bottom');
        }
      });
    }
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('profile');
  }
}
