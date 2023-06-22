import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { ActiveComponent } from 'src/app/components/connections/active/active.component';
import { PendingComponent } from 'src/app/components/connections/pending/pending.component';
import { Conexion } from 'src/app/types/dtos/conexion';
import { CONNECTIONS } from 'src/app/dummy/data';

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

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.connections = CONNECTIONS;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  protected onSegmentChange(event: any) {
    this.activeComponent = event.detail.value;
  }

  protected onSearchConnections() {
    this.navCtrl.navigateForward('/connections/search');
  }
}
