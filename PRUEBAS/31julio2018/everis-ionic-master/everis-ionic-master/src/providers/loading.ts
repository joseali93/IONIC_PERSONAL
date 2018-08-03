import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadingProvider {

  instance: Loading = null;

  constructor(public loadingCtrl: LoadingController) {
  }

  public show() {
    //console.log('Showing loading');
    this.instance = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true,
      dismissOnPageChange: false,
      content: 'Cargando...'
    });

    this.instance.present();
  }

  public dismiss() {
    //console.log('Dismissing loading');
    if (this.instance !== null) {
      this.instance.dismiss();
    }
  }

}
