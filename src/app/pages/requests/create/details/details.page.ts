import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DetailsPage implements OnInit {
  protected processing: boolean = false;
  protected isAlertOpen: boolean = false;
  protected alertMessage: string = '';
  protected alertButtons: any = ['Ok'];

  protected requestCreationDetailsForm = this.formBuilder.group({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    location: new FormControl<string>('', Validators.required),
  });


  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private solicitudesService: SolicitudesService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack() {
    this.navCtrl.navigateBack('/requests/requests');
  }

  protected onNext() {
    const titleForm = this.requestCreationDetailsForm.get('title');
    const descriptionForm = this.requestCreationDetailsForm.get('description');
    const locationForm = this.requestCreationDetailsForm.get('location');

    if(titleForm === null || descriptionForm === null || locationForm === null || titleForm?.invalid || descriptionForm?.invalid || locationForm?.invalid) {
      this.toastService.presentToast('Todos los campos son requeridos', 2000, 'danger', 'bottom');
      return;
    }

    const title = titleForm.value;
    const description = descriptionForm.value;
    const location = locationForm.value;

    if (title && description && location) {
      this.solicitudesService.empezarSolicitud(
        title,
        description,
        location
      );
      this.navCtrl.navigateForward('/requests/create/skills');
    }
  }

}
