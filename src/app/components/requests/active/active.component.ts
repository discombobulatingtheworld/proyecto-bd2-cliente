import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ACTIVE_REQUESTS } from 'src/app/dummy/data';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';
import { RolUsuario } from 'src/app/types/rol-usuario';

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
    this.getSolicitudesActivas();
    this.userId = this.userService.getActiveUserId();
  }

  protected onSelectRequest(request: SolicitudActiva) {
    this.navCtrl.navigateForward('/requests/request/active', {
      state: {
        requestId: request.id
      }
    });
  }

  getSolicitudesActivas(): void {
    let userId: number = this.userService.getActiveUserId();
    this.solicitudesService.getSolicitudesActivas(userId).subscribe((solicitudes) => {
      this.activeRequests = solicitudes;
    });
  };

 getPassiveUserName(solicitud: SolicitudActiva): string { 
    if (solicitud.requesterId === this.userId) {
      return solicitud.providerName + ' ' + solicitud.providerLastName;
    }
    else if (solicitud.providerId === this.userId) {
      return solicitud.requesterName + ' ' + solicitud.requesterLastName;
    }
    else {
      return '';
    }
  }
}
