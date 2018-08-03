import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InitPage } from '../pages/init/init';

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any = null;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      this.rootPage = InitPage;
    });
  }
}

