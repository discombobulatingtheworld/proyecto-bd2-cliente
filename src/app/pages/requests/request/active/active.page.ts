import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { FinalizeComponent } from 'src/app/components/request/finalize/finalize.component';
import { ChatComponent } from 'src/app/components/request/chat/chat.component';
import { DetailsComponent } from 'src/app/components/request/details/details.component';
import { REQUESTS } from 'src/app/dummy/data';
import { Router } from '@angular/router';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.page.html',
  styleUrls: ['./active.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DetailsComponent, ChatComponent, FinalizeComponent]
})
export class ActivePage implements OnInit {
  private requestId!: number;
  public request: Solicitud | undefined;
  protected activeComponent: string = 'details';

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

  protected onSegmentChange(event: any) {
    this.activeComponent = event.detail.value;
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
