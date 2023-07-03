import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { ActiveComponent } from 'src/app/components/connections/active/active.component';
import { PendingComponent } from 'src/app/components/connections/pending/pending.component';
import { Conexion } from 'src/app/types/dtos/conexion';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.page.html',
  styleUrls: ['./connections.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ActiveComponent, PendingComponent]
})
export class ConnectionsPage implements OnInit {
  protected title: string = 'Conexiones';
  protected activeComponent: string = 'active';
  protected connections: Conexion[] = [];
  protected userId: number = 0;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private usuarioService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.userId = this.usuarioService.getActiveUserId()
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.getConnections();
  }

  protected onSegmentChange(event: any) {
    this.activeComponent = event.detail.value;
  }

  protected onSearchConnections() {
    this.navCtrl.navigateForward('/connections/search');
  }

  getConnections(): void {
    this.usuarioService.getConexionesUsuario(this.userId).subscribe({
      next: (connections) => {
        this.connections = connections;
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }
}
