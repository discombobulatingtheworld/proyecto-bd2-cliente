import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MESSAGES } from 'src/app/dummy/data';
import { Mensaje } from 'src/app/types/dtos/mensaje';
import { Solicitud } from 'src/app/types/dtos/solicitud';

@Component({
  standalone: true,
  selector: 'app-request-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FinalizeComponent  implements OnInit {
  @Input() public request!: Solicitud;

  constructor() { }

  ngOnInit() {

  }

}
