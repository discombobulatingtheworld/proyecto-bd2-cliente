import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CONNECTIONS } from 'src/app/dummy/data';
import { Conexion } from 'src/app/types/dtos/conexion';

@Component({
  standalone: true,
  selector: 'app-connections-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ActiveComponent  implements OnInit {
  protected connections: Conexion[] = [];

  constructor() { }

  ngOnInit() {
    this.connections = CONNECTIONS;
  }

  protected onRemoveConnection(connection: Conexion): void {
    // TODO: Implementar
  }
}
