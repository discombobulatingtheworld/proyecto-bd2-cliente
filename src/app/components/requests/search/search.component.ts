import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { RELEVANT_REQUESTS } from 'src/app/dummy/data';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';

@Component({
  standalone: true,
  selector: 'app-requests-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class SearchComponent  implements OnInit {
  protected relevantRequests: SolicitudRelevante[] = [];
  protected userId!: number;

  constructor(
    private navCtrl: NavController,
    private solicitudesService: SolicitudesService,
    private userService: UsuariosService
  ) { }

  ngOnInit() {
    this.getUserId();
    this.getSolicitudesRelevantes();
   }

  protected onSelectRequest(request: SolicitudRelevante) {
    this.navCtrl.navigateForward('/requests/request/details', {
      state: {
        requestId: request.id
      }
    });
  }

  getUserId(): void {
    this.userId = this.userService.getUserId();
    console.log(this.userId);
  }

  getSolicitudesRelevantes(): void {
    this.solicitudesService.getSolicitudesRelevantes(this.userId).subscribe((solicitudes) => {
      this.relevantRequests = solicitudes;
    });
  }
}
