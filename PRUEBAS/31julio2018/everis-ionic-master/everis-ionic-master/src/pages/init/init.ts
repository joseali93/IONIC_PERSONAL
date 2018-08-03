import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TutorialPage } from './../tutorial/tutorial';

@Component({
  selector: 'page-init',
  templateUrl: 'init.html'
})
export class InitPage {

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Usamos la función setTimeout solo para demorar 
      // el inicio de la app y mostrar el splash
      setTimeout(() => {
        this.navCtrl.setRoot(TutorialPage);
      }, 2000);
    });
  }

}