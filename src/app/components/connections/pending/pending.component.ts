import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PENDING_CONNECTIONS } from 'src/app/dummy/data';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { Conexion } from 'src/app/types/dtos/conexion';

@Component({
  standalone: true,
  selector: 'app-connections-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PendingComponent  implements OnInit {
  protected pendingConnections: Conexion[] = [];

  constructor(
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {
    this.getConnections();
  }

  getConnections(): void {
    this.usuarioService.getUserByToken().subscribe(({id}) => {
      this.usuarioService.getConexionesUsuario(id).subscribe((connections) => {
        console.log(connections)
        this.pendingConnections = connections.filter((connection) => !connection.aceptada);
      })
    });
  }

  protected onAcceptConnection(connection: Conexion): void {
    this.usuarioService.getUserByToken().subscribe(({id}) => {
      console.log({id, 'userid': connection.userId})
      this.usuarioService.acceptConnectionToUser(id, connection.userId).subscribe((request) => {
        console.log(request)
        this.getConnections();
      }
      
      )
    });
  }
}
