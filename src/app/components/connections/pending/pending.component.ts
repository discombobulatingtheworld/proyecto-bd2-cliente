import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PENDING_CONNECTIONS } from 'src/app/dummy/data';
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

  constructor() { }

  ngOnInit() {
    this.pendingConnections = PENDING_CONNECTIONS;
  }

  protected onAcceptConnection(connection: Conexion): void {
    // TODO: Implementar
  }
}
