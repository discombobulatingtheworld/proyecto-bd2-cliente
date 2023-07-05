import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MESSAGES } from 'src/app/dummy/data';
import { Mensaje } from 'src/app/types/dtos/mensaje';
import { Solicitud } from 'src/app/types/dtos/solicitud';
import { MessageComponent } from './message/message.component';
import { SolicitudesService } from 'src/app/services/Solicitudes/solicitudes.service';
import { Subscription, interval } from 'rxjs';
import { ToastService } from 'src/app/services/utilities/toast.service';
import { IonContent } from "@ionic/angular";

@Component({
  standalone: true,
  selector: 'app-request-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, MessageComponent],
  host: { style: 'height: 100%;' }

})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() public request: Solicitud | undefined;
  @ViewChild(IonContent, { static: false }) public messagelist!: IonContent;
  protected messages: Mensaje[] = [];
  protected newMessage: string = '';
  private timeInterval: Subscription | undefined;

  constructor(
    private solicitudService: SolicitudesService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadMessages();
    this.timeInterval = interval(5000).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: () => {
        this.toastService.presentToast('Error al cargar los mensajes', 1000, 'danger', 'bottom');
      }
    });
  }

  ngOnDestroy() {
    this.timeInterval?.unsubscribe();
  }

  protected loadMessages(): void {
    this.solicitudService.getSolicitudChat(this.request?.id as number).subscribe({
      next: (response) => {
        this.messagelist.getScrollElement().then((element) => {
          let scroll = false;
          if (element.scrollTop + element.clientHeight === element.scrollHeight) {
            scroll = true;
          }

          if (response.messages.length > this.messages.length) {
            response.messages.forEach((message) => {
              if (!this.messages.some((m) => {
                if (m.messageId === message.messageId) {
                  m = message;
                  return true;
                }
                return false;
              })) {
                this.messages.push(message);
              }
            });
          }

          if (scroll) {
            setTimeout(() => {
              this.messagelist.scrollToBottom(300);
            }, 100);
          }
        });
      },
    });
  }

  protected onSendMessage(): void {
    if (this.newMessage.length > 0) {
      this.solicitudService.sendMessage(this.request?.id as number, this.newMessage).subscribe({
        next: (response) => {
          this.newMessage = '';
          setTimeout(() => {
            this.messagelist.scrollToBottom(100);
          }, 100);
          this.loadMessages();
        },
        error: (error) => {
          this.toastService.presentToast(error, 2000, 'danger', 'bottom');
        }
      });
    }
  }
}
