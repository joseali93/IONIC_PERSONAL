import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  readonly OK: number = 0;
  readonly CANCEL: number = -1;

  constructor(
    public alertCtrl: AlertController) {
  }

  public show(message: string, title?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: ((evt) => {
              return resolve(this.OK);
            })
          }
        ]
      });

      alert.present();
    })
  }

  public confirm(message: string, title?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        enableBackdropDismiss: false,
        buttons: [
         {
            text: 'Cancelar',
            role: 'cancel',
            handler: ((evt) => {
              return resolve(this.CANCEL);
            })
          }, {
            text: 'Aceptar',
            handler: ((evt) => {
              return resolve(this.OK);
            })
          }
        ]
      });

      alert.present();
    });
  }

}