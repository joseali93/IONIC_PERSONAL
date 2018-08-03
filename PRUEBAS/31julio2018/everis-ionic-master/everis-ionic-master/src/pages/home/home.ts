import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TutorialPage } from './../tutorial/tutorial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
