import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/rest-api/usuarios.service';
import { Mensaje } from 'src/app/types/dtos/mensaje';

@Component({
  standalone: true,
  selector: 'app-request-chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  host: { style: 'width: 100%;' }
})
export class MessageComponent implements OnInit {
  @Input() public message!: Mensaje;
  protected userId: number = 5;

  constructor(
    private usuariosService: UsuariosService,
  ) { }

  ngOnInit() {
    this.userId = this.usuariosService.getActiveUserId();
  }

}
