import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ACTIVE_REQUESTS } from 'src/app/dummy/data';
import { SolicitudActiva } from 'src/app/types/dtos/solicitud-activa';

@Component({
  standalone: true,
  selector: 'app-requests-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class ActiveComponent implements OnInit {
  protected activeRequests: SolicitudActiva[] = ACTIVE_REQUESTS;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  protected onSelectRequest(request: SolicitudActiva) {
    //this.navCtrl.navigateForward('/requests/detail');
  }
}
