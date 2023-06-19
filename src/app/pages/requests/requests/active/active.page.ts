import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-active',
  templateUrl: './active.page.html',
  styleUrls: ['./active.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ActivePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
