import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChangePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
