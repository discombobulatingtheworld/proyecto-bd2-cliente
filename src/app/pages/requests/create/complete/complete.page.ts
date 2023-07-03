import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CompletePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onReturnRequests() {
    this.navCtrl.navigateRoot('/requests/requests');
  }
}
