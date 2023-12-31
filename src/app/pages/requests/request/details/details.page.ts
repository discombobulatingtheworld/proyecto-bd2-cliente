import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { REQUESTS } from 'src/app/dummy/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetailsPage implements OnInit {
  private requestId!: number;
  protected request!: Solicitud;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    this.requestId = this.router.getCurrentNavigation()?.extras.state?.['requestId'];
    this.request = REQUESTS.find(request => request.id === this.requestId)!;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  protected onBack(): void {
    this.navCtrl.navigateBack('/requests/requests');
  }

  protected onAccept(): void {
    //this.navCtrl.navigateForward('/requests/request/active', { state: { requestId: this.requestId } });
  }
}
