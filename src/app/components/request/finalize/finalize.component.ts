import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { SolicitudFinalizacionEstado, SolicitudFinalizacionEstadoMapping } from 'src/app/types/solicitud-finalizacion-estado';

@Component({
  standalone: true,
  selector: 'app-request-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  host: { style: 'height: 100%;' }
})
export class FinalizeComponent  implements OnInit {
  @Input() public request!: Solicitud;
  protected newMessage: string = '';

  public solicitudFinalizacionEstadoMapping = SolicitudFinalizacionEstadoMapping;
  public solicitudFinalizacionEstados: SolicitudFinalizacionEstado[] = Object.values(SolicitudFinalizacionEstado).filter((value) => typeof value === 'string') as SolicitudFinalizacionEstado[];

  protected processing: boolean = false;
  protected isAlertOpen: boolean = false;
  protected alertMessage: string = '';
  protected alertButtons: any = ['Ok'];

  protected requestFinalizationForm = this.formBuilder.group({
    status: new FormControl<SolicitudFinalizacionEstado>(SolicitudFinalizacionEstado.Solucionado, Validators.required),
    opinion: new FormControl<string>('', Validators.required),
  });

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

  }

  protected onSubmit(): void {
    this.navCtrl.navigateRoot('/requests/requests');
  }

}
