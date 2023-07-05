import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonicModule, NavController } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
import { ACTIVE_REQUESTS } from 'src/app/dummy/data';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';
import { RolUsuario } from 'src/app/types/rol-usuario';

@Component({
  standalone: true,
  selector: 'app-requests-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
  imports: [IonicModule, CommonModule],
  host: { style: 'height: 100%;' }
})
export class ActiveComponent implements OnInit, OnDestroy {
  protected activeRequests: SolicitudActiva[] = [];
  @ViewChild(IonContent, { static: false }) public requestslist!: IonContent;
  protected userId!: number;
  private timeInterval: Subscription | undefined;

  constructor(
    private navCtrl: NavController,
    private solicitudesService: SolicitudesService,
    private userService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.userId = this.userService.getActiveUserId();
    this.getSolicitudesActivas();
    this.timeInterval = interval(5000).subscribe({
      next: () => {
        this.getSolicitudesActivas();
      },
      error: () => {
        this.toastService.presentToast('Error al cargar las solicitudes', 1000, 'danger', 'bottom');
      }
    });
  }

  ngOnDestroy() {
    this.timeInterval?.unsubscribe();
  }

  protected onSelectRequest(request: SolicitudActiva) {
    this.navCtrl.navigateForward('/requests/request/active', {
      state: {
        requestId: request.id
      }
    });
  }

  protected getSolicitudesActivas(): void {
    this.solicitudesService.getSolicitudesActivas(this.userId).subscribe({
      next: (response) => {
        this.requestslist.getScrollElement().then((element) => {
          let scroll = false;
          if (element.scrollTop === element.scrollHeight - element.clientHeight) {
            scroll = true;
          }

          const responseMap = new Map(response.map(item => [item.id, item]));

          response.forEach(newItem => {
            const oldItemIndex = this.activeRequests.findIndex(item => item.id === newItem.id);
            if (oldItemIndex > -1) {
              this.activeRequests[oldItemIndex] = newItem;
            } else {
              this.activeRequests.push(newItem);
            }
          });
          for (let i = this.activeRequests.length - 1; i >= 0; i--) {
            if (!responseMap.has(this.activeRequests[i].id)) {
              this.activeRequests.splice(i, 1);
            }
          }

          if (scroll) {
            setTimeout(() => {
              this.requestslist.scrollToBottom(0);
            }, 100);
          }
        });
      }
    });
  };

  protected getPassiveUserName(solicitud: SolicitudActiva): string {
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
