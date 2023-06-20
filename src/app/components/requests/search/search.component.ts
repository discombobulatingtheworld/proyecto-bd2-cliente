import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { RELEVANT_REQUESTS } from 'src/app/dummy/data';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';

@Component({
  standalone: true,
  selector: 'app-requests-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class SearchComponent  implements OnInit {
  protected relevantRequests: SolicitudRelevante[] = RELEVANT_REQUESTS;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  protected onSelectRequest(request: SolicitudRelevante) {
    this.navCtrl.navigateForward('/requests/request/details', {
      state: {
        requestId: request.id
      }
    });
  }
}
