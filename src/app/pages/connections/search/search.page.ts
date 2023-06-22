import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Conexion } from 'src/app/types/dtos/conexion';
import { CONNECTION_SEARCH_RESULTS } from 'src/app/dummy/data';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
  protected title: string = 'Buscar conexiones';
  protected searchTerm: string = '';
  protected searchResults: Conexion[] = [];

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('/connections');
  }

  protected onSearch(event: any): void {
    this.searchResults = CONNECTION_SEARCH_RESULTS.filter((connection: Conexion) => {
      return (connection.name.toLowerCase() + ' ' + connection.lastName.toLowerCase()).includes(this.searchTerm.toLowerCase());
    });
  }

  protected onRequestConnection(connection: Conexion): void {
    // TODO: Implementar
  }
}
