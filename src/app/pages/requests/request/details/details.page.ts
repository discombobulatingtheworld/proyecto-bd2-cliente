import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { REQUESTS } from 'src/app/dummy/data';
import { Router } from '@angular/router';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetailsPage implements OnInit {
  private requestId!: number;
  protected request: Solicitud | undefined;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private solicitudesService: SolicitudesService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.requestId = this.router.getCurrentNavigation()?.extras.state?.['requestId'];
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.getSolicitud();
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('/requests/requests');
  }

  protected onAccept(): void {
    this.solicitudesService.acceptSolicitud(this.requestId).subscribe({
      next: (response) => {
        this.navCtrl.navigateForward('/requests/request/active', { state: { requestId: this.requestId } });
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  getSolicitud(): void {
    this.solicitudesService.getSolicitud(this.requestId).subscribe({
      next: (solicitud) => {
        this.request = solicitud;
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }
}
