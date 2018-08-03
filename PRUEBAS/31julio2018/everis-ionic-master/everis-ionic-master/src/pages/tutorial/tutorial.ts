import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  constructor(public navCtrl: NavController) {

  }

  public login(): void {
    this.navCtrl.setRoot(LoginPage);
  }

}