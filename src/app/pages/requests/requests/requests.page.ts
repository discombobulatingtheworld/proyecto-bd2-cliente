import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from 'src/app/components/requests/search/search.component';  
import { ActiveComponent } from 'src/app/components/requests/active/active.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SearchComponent, ActiveComponent]
})
export class RequestsPage implements OnInit {
  protected title: string = 'Solicitudes';
  protected activeComponent: string = 'search';

  constructor() { }

  ngOnInit() {
  }

  protected onFilterRequests() {

  }

  protected onSegmentChange(event: any) {
    this.activeComponent = event.detail.value;
  }
}
