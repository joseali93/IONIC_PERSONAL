import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

@Injectable()
export class NetworkProvider {

  constructor(public network: Network) {

  }

  public isWiFi(): boolean {
    return this.network.type === 'wifi';
  }

}
