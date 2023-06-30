import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ACTIVE_REQUESTS } from 'src/app/dummy/data';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';

@Component({
  standalone: true,
  selector: 'app-requests-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class ActiveComponent implements OnInit {
  protected activeRequests: SolicitudActiva[] = [];
  protected userId!: number;

  constructor(
    private navCtrl: NavController,
    private solicitudesService: SolicitudesService,
    private userService: UsuariosService
  ) { }

  ngOnInit() {
    this.getUserId();
    this.getSolicitudesActivas();
   }

  protected onSelectRequest(request: SolicitudActiva) {
    this.navCtrl.navigateForward('/requests/request/active', {
      state: {
        requestId: request.id
      }
    });
  }

  getUserId(): void {
    this.userId = this.userService.getUserId();
    console.log(this.userId);
  }

  getSolicitudesActivas(): void {
    this.solicitudesService.getSolicitudesActivas(this.userId).subscribe((solicitudes) => {
      this.activeRequests = solicitudes;
    });
  }
}
