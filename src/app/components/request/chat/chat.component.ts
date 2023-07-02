import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MESSAGES } from 'src/app/dummy/data';
import { Mensaje } from 'src/app/types/dtos/mensaje';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { MessageComponent } from './message/message.component';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';

@Component({
  standalone: true,
  selector: 'app-request-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, MessageComponent],
  host: { style: 'height: 100%;' }

})
export class ChatComponent  implements OnInit {
  @Input() public request: Solicitud | undefined;
  protected messages: Mensaje[] = [];
  protected newMessage: string = '';

  constructor(
    private solicitudService: SolicitudesService,
  ) { }

  ngOnInit() {
    this.loadMessages();
    setInterval(() => this.loadMessages(), 1000);
  }

  protected loadMessages(): void {
    this.solicitudService.getSolicitudChat(this.request?.id as number).subscribe(
      response => {
        this.messages = response.messages;
      }
    );
  }

  protected onSendMessage(): void {
    if (this.newMessage.length > 0) {
      this.solicitudService.sendMessage(this.request?.id as number, this.newMessage).subscribe(
        response => {
          this.newMessage = '';
          this.loadMessages();
        }
      );
    }
  }
}
