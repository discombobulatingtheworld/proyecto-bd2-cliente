import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { RELEVANT_REQUESTS } from 'src/app/dummy/data';
import { SolicitudRelevante } from 'src/app/types/dtos/solicitud-relevante';

@Component({
  standalone: true,
  selector: 'app-requests-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class ActiveComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() { }
}
