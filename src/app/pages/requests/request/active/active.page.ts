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
  ) { }

  ngOnInit() {
    this.requestId = this.router.getCurrentNavigation()?.extras.state?.['requestId'];
    this.solicitudesService.getSolicitud(this.requestId).subscribe(
      response => {
        this.request = response;
      }
    );
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('/requests/requests');
  }

  protected onSegmentChange(event: any) {
    this.activeComponent = event.detail.value;
  }

}
