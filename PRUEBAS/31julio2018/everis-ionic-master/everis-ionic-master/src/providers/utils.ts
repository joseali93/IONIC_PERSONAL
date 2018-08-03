import { Injectable } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SearchFieldPipe } from 'ng-pipes';
import { Platform } from 'ionic-angular';
import * as moment from 'moment'

declare var window: {
  cordova: any
}

@Injectable()
export class UtilsProvider {

  private debug = true;

  constructor(
    public platform: Platform,
    public searchFieldPipe: SearchFieldPipe,
    public currencyPipe: CurrencyPipe,
    public datePipe: DatePipe) {
  }

  /**
   * Is debug mode
   */
  public isDebug(): boolean {
    return this.debug;
  }

  /**
   * Set debug mode
   * @param value 
   */
  public setDebug(value: boolean) {
    this.debug = value;
  }

  /**
   * Verify ir a string is a URL
   * @param url 
   */
  public isUrl(url: string): boolean {
    return url.startsWith('http') || url.startsWith('https');
  }

  /**
   * Obtiene la fecha actual
   */
  public getCurrentDate(): Date {
    return moment().toDate();
  }

  /**
   * Obtiene el tiempo actual en milisegundos
   */
  public getCurrentTime(): number {
    return moment().valueOf();
  }

  /**
   * Convierte un texto a fecha
   * @param date 
   */
  public toDate(date: string): Date {
    return moment(date).toDate();
  }

  /**
   * Convierte un texto a una referencia de tiempo en milisegundos
   * @param date 
   */
  public toTime(date: any): number {
    return moment(date).valueOf();
  }

  /**
   * Obtiene la diferencia de minutos de una fecha
   * @param date
   */
  public getDateMinutesDiff(date: number): number {
    return moment().diff(date, 'minutes');
  }

  /**
   * Obtiene la diferencia de horas de una fecha
   * @param date 
   */
  public getDateHoursDiff(date: number): number {
    return moment().diff(date, 'hours');
  }

  /**
   * Obtiene la diferencia de días de una fecha
   * @param date 
   */
  public getDateDaysDiff(date: number): number {
    return moment().diff(date, 'days');
  }

  /**
   * Formatea una fecha
   * @param date Fecha
   * @param format Foramto de la fecha
   */
  public formatDate(date: any, format: string): string {
    return this.datePipe.transform(date, format);
  }

  /**
   * Formatea una valor en moneda
   * @param value Valor
   */
  public currency(value: any): string {
    return this.currencyPipe.transform(value, 'USD', true, '1.0-2');
  }

  /**
   * Returns a random time between min (inclusive) and max (exclusive)
   * @param min 
   * @param max 
   */
  public getRandomTime(min: number, max?: number): number {
    if (typeof max === 'undefined') {
      max = this.getCurrentTime();
    }

    return this.getRandomInt(min, max);;
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  public getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  public getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Returns a random boolean
   */
  public getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  /**
   * Identifica si esta en el navegador
   */
  public isBrowser(): boolean {
    return this.platform.is('browser');
  }

  /**
   * Identifica si es una plataforma iOS
   */
  public isIOS(): boolean {
    return this.platform.is('ios');
  }

  /**
   * Identifica si es una plataforma Android
   */
  public isAndroid(): boolean {
    return this.platform.is('android');
  }

  /**
   * Identifica si existe la refencia de Cordova
   * Esta función es útil para condicionar el uso de algun plugin si no esta instalado
   */
  public isCordova(): boolean {
    return typeof window.cordova !== 'undefined';
  }

}