import { Injectable } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';
import { UtilsProvider } from './utils';

@Injectable()
export class PrefsProvider {

  private values: object = {};

  constructor(
    private appPreferences: AppPreferences,
    private utils: UtilsProvider) {
  }

  public get(key: string, defaultValue?: any): any {
    let value = this.values[key];
    if (typeof value === 'undefined') {
      value = defaultValue;
    }
    return value;
  }

  public set(key: string, value: any) {
    this.values[key] = value;

    if (this.utils.isCordova()) {
      this.appPreferences.store(null, 'values', this.values).then(result => {
        console.log('Preferencia guardada', key, value);
      }).catch(error => {
        console.log('Error al guardar la preferencia', key, value);
      });
    } else {
      localStorage.setItem('values', JSON.stringify(this.values));
      console.log('Preferencia guardada', key, value);
    }
  }

  public load() {
    if (this.utils.isCordova()) {
      this.appPreferences.fetch('values').then(result => {
        console.log('Preferencias', result)
        this.values = result;
      }).catch(error => {
        console.log('Error al cargar las preferencias', error);
      });  
    } else {
      let aux = localStorage.getItem('values');
      if (aux) {
        this.values = JSON.parse(aux); 
      }
      console.log('Preferencias (Local Storage)', aux)
    }
    
  }

}