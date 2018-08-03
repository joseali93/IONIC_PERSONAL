import { LoadingProvider } from './../providers/loading';
import { AlertProvider } from './../providers/alert';
import { UtilsProvider } from './../providers/utils';
import { RequestProvider } from './../providers/request';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgPipesModule } from 'ng-pipes';
import { HttpClientModule } from '@angular/common/http';





import { AppPreferences } from '@ionic-native/app-preferences';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IsDebug } from '@ionic-native/is-debug';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { App } from './app';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { InitPage } from '../pages/init/init';

@NgModule({
  bootstrap: [
    IonicApp
  ],
  declarations: [
    App,
    InitPage,
    HomePage,
    LoginPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgPipesModule,
    HttpClientModule,
    IonicModule.forRoot(App, {
      swipeBackEnabled: false,
      //iconMode: 'md',
      //mode: 'ios'
    })
  ],
  entryComponents: [
    App,
    InitPage,
    HomePage,
    LoginPage,
    TutorialPage
  ],
  providers: [
    RequestProvider,
    UtilsProvider,
    AlertProvider,
    LoadingProvider,
    
    AppPreferences,
    InAppBrowser,
    IsDebug,
    Network,
    StatusBar,
    SplashScreen,
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
  
export class AppModule {}
