import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PENDING_CONNECTIONS } from 'src/app/dummy/data';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';
import { Conexion } from 'src/app/types/dtos/conexion';

@Component({
  standalone: true,
  selector: 'app-connections-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PendingComponent implements OnInit {
  protected pendingConnections: Conexion[] = [];
  protected userId: number = 0;

  constructor(
    private usuarioService: UsuariosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.userId = this.usuarioService.getActiveUserId()
    this.getConnections();
  }

  protected getConnections(): void {
    this.usuarioService.getConexionesUsuario(this.userId).subscribe({
      next: (connections) => {
        this.pendingConnections = connections.filter((connection) => !connection.aceptada);
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  protected onAcceptConnection(connection: Conexion): void {
    this.usuarioService.acceptConnectionToUser(this.userId, connection.userId).subscribe({
      next: (request) => {
        this.getConnections();
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }
}
