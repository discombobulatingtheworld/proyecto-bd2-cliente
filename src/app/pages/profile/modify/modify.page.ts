import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/types/dtos/usuario';
import { PROFILES } from 'src/app/dummy/data';
import { ControlValidators as CustomControlValidators } from 'src/app/helpers/validators';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';

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
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.getPerfilInit();
  }

  getPerfilInit() {
    this.usuariosService.getUserByToken().subscribe(
      response => {
        this.profile = response;
        this.profileModificationForm.setValue({
          name: response.name,
          lastName: response.lastName,
          nick: response.nick,
          email: response.email
        });
      },
      error => {
        console.log(error)
      }
    )
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onSave(): void {
    if (this.profileModificationForm.value.name != null && this.profileModificationForm.value.lastName != null &&
      this.profileModificationForm.value.nick != null && this.profileModificationForm.value.email != null && this.profile != null) {

      this.profile.name = this.profileModificationForm.value.name;
      this.profile.lastName = this.profileModificationForm.value.lastName;
      this.profile.nick = this.profileModificationForm.value.nick;
      this.profile.email = this.profileModificationForm.value.email;

      this.usuariosService.updateUsuario(this.profile).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    }

    this.navCtrl.navigateRoot('profile');
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('profile');
  }
}
