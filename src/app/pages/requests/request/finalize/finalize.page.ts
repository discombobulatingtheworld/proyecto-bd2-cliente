import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.page.html',
  styleUrls: ['./finalize.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FinalizePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
