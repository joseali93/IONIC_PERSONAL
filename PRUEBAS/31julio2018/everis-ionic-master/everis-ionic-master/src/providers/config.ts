import { Injectable } from '@angular/core';
import { PrefsProvider } from './prefs';

@Injectable()
export class ConfigProvider {

  constructor(
    private prefs: PrefsProvider) {
  }

  public showProductAddTutorial() {
    return this.prefs.get('showProductAddTutorial', false);
  }

}