import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CONNECTIONS } from 'src/app/dummy/data';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { Conexion } from 'src/app/types/dtos/conexion';

@Component({
  standalone: true,
  selector: 'app-connections-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ActiveComponent implements OnInit {
  protected connections: Conexion[] = [];

  constructor(
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {
    this.getConnections();
  }

  getConnections(): void {
    this.usuarioService.getUserByToken().subscribe(({id}) => {
      this.usuarioService.getConexionesUsuario(id).subscribe((connections) => {
        this.connections = connections.filter((connection) => connection.aceptada);
      })
    });
  }

  protected onRemoveConnection(connection: Conexion): void {
    this.usuarioService.getUserByToken().subscribe(({ id }) => {
      this.usuarioService.removeConexionUsuario(id, connection.userId).subscribe((response) => {
        this.getConnections();
      })
    });
  }
}
