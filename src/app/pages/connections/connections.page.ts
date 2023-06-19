import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.page.html',
  styleUrls: ['./connections.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConnectionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
