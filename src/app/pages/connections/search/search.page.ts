import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Conexion } from 'src/app/types/dtos/conexion';
import { CONNECTION_SEARCH_RESULTS } from 'src/app/dummy/data';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { ToastService } from 'src/app/services/utilities/toast.service';
import { Usuario } from 'src/app/types/dtos/usuario';

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
  protected searchResults: Usuario[] = [];
  private userId: number = 0;

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
    this.menuCtrl.enable(false);
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('/connections');
  }

  protected onSearch(event: any): void {
    this.usuarioService.searchUsers(this.searchTerm).subscribe({
      next: (searchResults) => {
        this.searchResults = searchResults;
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }

  protected onRequestConnection(connection: Usuario): void {
    this.usuarioService.requestConnection(this.userId, connection.id).subscribe({
      next: (response) => {
        this.toastService.presentToast('Solicitud enviada', 2000, 'success', 'bottom');
      },
      error: (error) => {
        this.toastService.presentToast(error, 2000, 'danger', 'bottom');
      }
    });
  }
}
