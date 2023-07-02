import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Solicitud } from 'src/app/types/dtos/solicitud';

@Component({
  standalone: true,
  selector: 'app-request-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  host: { style: 'height: 100%;' }
})
export class DetailsComponent  implements OnInit {
  @Input() public request: Solicitud | undefined;

  constructor() { }

  ngOnInit() {}

}
