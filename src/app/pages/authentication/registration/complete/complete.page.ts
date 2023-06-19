import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

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
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  protected onReturnLogin() {
    this.navCtrl.navigateRoot('/authentication/login');
  }
}
