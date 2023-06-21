import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MESSAGES } from 'src/app/dummy/data';
import { Mensaje } from 'src/app/types/dtos/mensaje';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { MessageComponent } from './message/message.component';

@Component({
  standalone: true,
  selector: 'app-request-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, MessageComponent],
  host: { style: 'height: 100%;' }

})
export class ChatComponent  implements OnInit {
  @Input() public request!: Solicitud;
  protected messages: Mensaje[] = [];
  protected newMessage: string = '';

  constructor() { }

  ngOnInit() {
    this.messages = MESSAGES.filter(m => m.requestId === this.request.id);
  }

  protected onSendMessage(): void {

  }
}
