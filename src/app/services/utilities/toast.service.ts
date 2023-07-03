import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastController
  ) { }

  public async presentToast(message: string, duration: number = 8000, color: string = 'primary', position: string = 'bottom'): Promise<void> {
    const toast = await this.toast.create({
      message: message,
      duration: duration,
      color: color,
      position: 'top'
    });

    await toast.present();
  }
}
