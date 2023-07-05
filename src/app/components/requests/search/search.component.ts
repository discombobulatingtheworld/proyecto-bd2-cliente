import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonicModule, NavController } from '@ionic/angular';
import { RELEVANT_REQUESTS } from 'src/app/dummy/data';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { Subscription, interval } from 'rxjs';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  standalone: true,
  selector: 'app-requests-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [IonicModule, CommonModule],
  host: { style: 'height: 100%;' }
})
export class SearchComponent implements OnInit, OnDestroy {
  protected relevantRequests: SolicitudRelevante[] = [];
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
    this.userId = this.userService.getActiveUserId()
    this.getSolicitudesRelevantes();
    this.timeInterval = interval(5000).subscribe({
      next: () => {
        this.getSolicitudesRelevantes();
      },
      error: () => {
        this.toastService.presentToast('Error al cargar las solicitudes', 1000, 'danger', 'bottom');
      }
    });
  }

  ngOnDestroy() {
    this.timeInterval?.unsubscribe();
  }

  protected onSelectRequest(request: SolicitudRelevante) {
    this.navCtrl.navigateForward('/requests/request/details', {
      state: {
        requestId: request.id
      }
    });
  }

  protected getSolicitudesRelevantes(): void {
    this.solicitudesService.getSolicitudesRelevantes(this.userId).subscribe({
      next: (response) => {
        this.requestslist.getScrollElement().then((element) => {
          let scroll = false;
          if (element.scrollTop + element.clientHeight === element.scrollHeight) {
            scroll = true;
          }

          const responseMap = new Map(response.map(item => [item.id, item]));

          response.forEach(newItem => {
            const oldItemIndex = this.relevantRequests.findIndex(item => item.id === newItem.id);
            if (oldItemIndex > -1) {
              this.relevantRequests[oldItemIndex] = newItem;
            } else {
              this.relevantRequests.push(newItem);
            }
          });
          for (let i = this.relevantRequests.length - 1; i >= 0; i--) {
            if (!responseMap.has(this.relevantRequests[i].id)) {
              this.relevantRequests.splice(i, 1);
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
  }
}
