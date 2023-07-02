import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { SolicitudFinalizacion } from 'src/app/types/dtos/solicitud-finalizacion';
import { SolicitudFinalizacionEstado, SolicitudFinalizacionEstadoMapping } from 'src/app/types/solicitud-finalizacion-estado';

@Component({
  standalone: true,
  selector: 'app-request-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  host: { style: 'height: 100%;' }
})
export class FinalizeComponent implements OnInit {
  @Input() public request: Solicitud | undefined;
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
    private userService: UsuariosService,
    private solicitudService: SolicitudesService
  ) { }

  ngOnInit() {

  }

  protected onSubmit(): void {
    let solicitudFinalizacion: SolicitudFinalizacion = new SolicitudFinalizacion();
    solicitudFinalizacion.requestId = this.request?.id || 0;
    solicitudFinalizacion.userId = this.userService.getActiveUserId();

    if (this.requestFinalizationForm.value.status == SolicitudFinalizacionEstado.Solucionado) {
      solicitudFinalizacion.status = SolicitudFinalizacionEstado.Solucionado;
    } else if (this.requestFinalizationForm.value.status == SolicitudFinalizacionEstado.Cancelado) {
      solicitudFinalizacion.status = SolicitudFinalizacionEstado.Cancelado;
    }

    if (this.requestFinalizationForm.value.opinion != null) {
      solicitudFinalizacion.opinion = this.requestFinalizationForm.value.opinion;
    }

    this.solicitudService.finalizeSolicitud(solicitudFinalizacion).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    
    this.navCtrl.navigateRoot('/requests/requests');
  }

}
