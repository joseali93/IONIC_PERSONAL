webpackJsonp([0],{

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var LoadingProvider = /** @class */ (function () {
    function LoadingProvider(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.instance = null;
    }
    LoadingProvider.prototype.show = function () {
        //console.log('Showing loading');
        this.instance = this.loadingCtrl.create({
            spinner: 'crescent',
            showBackdrop: true,
            dismissOnPageChange: false,
            content: 'Cargando...'
        });
        this.instance.present();
    };
    LoadingProvider.prototype.dismiss = function () {
        //console.log('Dismissing loading');
        if (this.instance !== null) {
            this.instance.dismiss();
        }
    };
    LoadingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], LoadingProvider);
    return LoadingProvider;
}());

//# sourceMappingURL=loading.js.map

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertProvider = /** @class */ (function () {
    function AlertProvider(alertCtrl) {
        this.alertCtrl = alertCtrl;
        this.OK = 0;
        this.CANCEL = -1;
    }
    AlertProvider.prototype.show = function (message, title) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var alert = _this.alertCtrl.create({
                title: title,
                subTitle: message,
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Aceptar',
                        handler: (function (evt) {
                            return resolve(_this.OK);
                        })
                    }
                ]
            });
            alert.present();
        });
    };
    AlertProvider.prototype.confirm = function (message, title) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var alert = _this.alertCtrl.create({
                title: title,
                subTitle: message,
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: (function (evt) {
                            return resolve(_this.CANCEL);
                        })
                    }, {
                        text: 'Aceptar',
                        handler: (function (evt) {
                            return resolve(_this.OK);
                        })
                    }
                ]
            });
            alert.present();
        });
    };
    AlertProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AlertProvider);
    return AlertProvider;
}());

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RequestProvider = /** @class */ (function () {
    function RequestProvider(http) {
        this.http = http;
        this.authToken = '';
    }
    /**
     * Establece el token de autorización
     * @param token
     */
    RequestProvider.prototype.setAuthorizationToken = function (token) {
        this.authToken = token;
    };
    /**
     * Obtiene el token de autorización
     */
    RequestProvider.prototype.getAuthorizationToken = function () {
        return this.authToken;
    };
    /**
     * Realiza una petición HTTP usando el metodo GET
     * @param url URL de petición
     * @param params Parámetros de la peticion
     * @param isSecure Indica si realiza una petición con seguridad incluida
     */
    RequestProvider.prototype.get = function (url, params, isSecure) {
        if (isSecure === void 0) { isSecure = true; }
        console.log('GET: ' + url);
        var options = {};
        if (isSecure) {
            options.headers = this.getAuthorizationHeader();
        }
        return this.http.get(url, options)
            .map(this.getData)
            .toPromise();
    };
    /**
     * Realiza una petición HTTP usando el metodo POST
     * @param url URL de petición
     * @param data Datos de la petición
     * @param isSecure Indica si realiza una petición con seguridad incluida
     */
    RequestProvider.prototype.post = function (url, data, isSecure) {
        if (isSecure === void 0) { isSecure = true; }
        console.log('POST: ' + url);
        var options = {};
        if (isSecure) {
            options.headers = this.getAuthorizationHeader();
        }
        return this.http.post(url, data, options)
            .map(this.getData)
            .toPromise();
    };
    /**
     * Realiza una petición HTTP usando el metodo DELETE
     * @param url URL de petición
     * @param isSecure Indica si realiza una petición con seguridad incluida
     */
    RequestProvider.prototype.remove = function (url, isSecure) {
        if (isSecure === void 0) { isSecure = true; }
        console.log('POST: ' + url);
        var options = {};
        if (isSecure) {
            options.headers = this.getAuthorizationHeader();
        }
        return this.http.delete(url, options)
            .map(this.getData)
            .toPromise();
    };
    /**
     * Obtiene la cabecera con el token de autorización
     */
    RequestProvider.prototype.getAuthorizationHeader = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.authToken);
        return headers;
    };
    /**
     * Procesa la respuesta de la petición
     */
    RequestProvider.prototype.getData = function (response) {
        if (response.headers.get('content-type').indexOf('application/json') >= 0) {
            return response.json();
        }
        return response.text();
    };
    RequestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], RequestProvider);
    return RequestProvider;
}());

//# sourceMappingURL=request.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_splash_screen__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tutorial_tutorial__ = __webpack_require__(329);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InitPage = /** @class */ (function () {
    function InitPage(navCtrl, platform, statusBar, splashScreen) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // Usamos la función setTimeout solo para demorar 
            // el inicio de la app y mostrar el splash
            setTimeout(function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tutorial_tutorial__["a" /* TutorialPage */]);
            }, 2000);
        });
    }
    InitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-init',template:/*ion-inline-start:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\pages\init\init.html"*/'<ion-content padding>\n  Init\n</ion-content>\n'/*ion-inline-end:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\pages\init\init.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], InitPage);
    return InitPage;
}());

//# sourceMappingURL=init.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TutorialPage = /** @class */ (function () {
    function TutorialPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    TutorialPage.prototype.login = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
    };
    TutorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-tutorial',template:/*ion-inline-start:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\pages\tutorial\tutorial.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Tutorial\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <button ion-button block padding (click)="login()">Login</button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\pages\tutorial\tutorial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alert__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_request__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(324);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, request, loading, alert, http) {
        this.navCtrl = navCtrl;
        this.request = request;
        this.loading = loading;
        this.alert = alert;
        this.http = http;
    }
    LoginPage.prototype.login = function () {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46YWRtaW4='
            })
        };
        var url = 'https://agile-transformation.eu.cloudhub.io/api/1.0.development/employees/dpbotero/validate';
        this.http.get(url, httpOptions).subscribe(function (response) {
            console.log(response);
        }, function (err) {
            console.log(err);
            console.log("User authentication failed!");
        });
        /*
        this.http.get('https://caro-chatboot.de-c1.cloudhub.io/api/1.1/employees/dbotero/unblock').subscribe(response => {
              console.log(response);
        }, err => {
           console.log("User authentication failed!");
        });
        
        /*
          let url: string = 'https://httpbin.org/anything';
          url += '/' + this.username;
          url += '/' + this.password;
    
          console.log('Username: ' + this.username);
          console.log('Password: ' + this.password);
          console.log('URL: ' + url);
    
          this.request.get(url).then(result => {
            console.log('Success', result);
            this.loading.dismiss();
    
            this.navCtrl.setRoot(HomePage);
          }).catch(error => {
            console.log('Error', error);
            this.loading.dismiss();
            this.alert.show('Error de autenticación');
          });
        */
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\pages\login\login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Login\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-icon name="home"></ion-icon>\n      <ion-input type="text" placeholder="Usuario" autocomplete="false" [(ngModel)]="username"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-icon name="home"></ion-icon>\n      <ion-input type="password" placeholder="Contraseña" autocomplete="false" [(ngModel)]="password"></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <button ion-button block padding color="light" (click)="login()">Ingresar</button>\n</ion-content>'/*ion-inline-end:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__providers_request__["a" /* RequestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_request__["a" /* RequestProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_loading__["a" /* LoadingProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_alert__["a" /* AlertProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_alert__["a" /* AlertProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]) === "function" && _e || Object])
    ], LoginPage);
    return LoginPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(351);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_loading__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_alert__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_request__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng_pipes__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_app_preferences__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_in_app_browser__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_is_debug__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_login_login__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_tutorial_tutorial__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_init_init__ = __webpack_require__(328);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["I" /* NgModule */])({
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicApp */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_16__app__["a" /* App */],
                __WEBPACK_IMPORTED_MODULE_20__pages_init_init__["a" /* InitPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_tutorial_tutorial__["a" /* TutorialPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8_ng_pipes__["a" /* NgPipesModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_16__app__["a" /* App */], {
                    swipeBackEnabled: false,
                }, {
                    links: []
                })
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_16__app__["a" /* App */],
                __WEBPACK_IMPORTED_MODULE_20__pages_init_init__["a" /* InitPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_tutorial_tutorial__["a" /* TutorialPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__providers_request__["a" /* RequestProvider */],
                __WEBPACK_IMPORTED_MODULE_2__providers_utils__["a" /* UtilsProvider */],
                __WEBPACK_IMPORTED_MODULE_1__providers_alert__["a" /* AlertProvider */],
                __WEBPACK_IMPORTED_MODULE_0__providers_loading__["a" /* LoadingProvider */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_app_preferences__["a" /* AppPreferences */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_is_debug__["a" /* IsDebug */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__["a" /* SplashScreen */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_6__angular_core__["u" /* ErrorHandler */],
                    useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicErrorHandler */]
                }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_pipes__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UtilsProvider = /** @class */ (function () {
    function UtilsProvider(platform, searchFieldPipe, currencyPipe, datePipe) {
        this.platform = platform;
        this.searchFieldPipe = searchFieldPipe;
        this.currencyPipe = currencyPipe;
        this.datePipe = datePipe;
        this.debug = true;
    }
    /**
     * Is debug mode
     */
    UtilsProvider.prototype.isDebug = function () {
        return this.debug;
    };
    /**
     * Set debug mode
     * @param value
     */
    UtilsProvider.prototype.setDebug = function (value) {
        this.debug = value;
    };
    /**
     * Verify ir a string is a URL
     * @param url
     */
    UtilsProvider.prototype.isUrl = function (url) {
        return url.startsWith('http') || url.startsWith('https');
    };
    /**
     * Obtiene la fecha actual
     */
    UtilsProvider.prototype.getCurrentDate = function () {
        return __WEBPACK_IMPORTED_MODULE_4_moment__().toDate();
    };
    /**
     * Obtiene el tiempo actual en milisegundos
     */
    UtilsProvider.prototype.getCurrentTime = function () {
        return __WEBPACK_IMPORTED_MODULE_4_moment__().valueOf();
    };
    /**
     * Convierte un texto a fecha
     * @param date
     */
    UtilsProvider.prototype.toDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_4_moment__(date).toDate();
    };
    /**
     * Convierte un texto a una referencia de tiempo en milisegundos
     * @param date
     */
    UtilsProvider.prototype.toTime = function (date) {
        return __WEBPACK_IMPORTED_MODULE_4_moment__(date).valueOf();
    };
    /**
     * Obtiene la diferencia de minutos de una fecha
     * @param date
     */
    UtilsProvider.prototype.getDateMinutesDiff = function (date) {
        return __WEBPACK_IMPORTED_MODULE_4_moment__().diff(date, 'minutes');
    };
    /**
     * Obtiene la diferencia de horas de una fecha
     * @param date
     */
    UtilsProvider.prototype.getDateHoursDiff = function (date) {
        return __WEBPACK_IMPORTED_MODULE_4_moment__().diff(date, 'hours');
    };
    /**
     * Obtiene la diferencia de días de una fecha
     * @param date
     */
    UtilsProvider.prototype.getDateDaysDiff = function (date) {
        return __WEBPACK_IMPORTED_MODULE_4_moment__().diff(date, 'days');
    };
    /**
     * Formatea una fecha
     * @param date Fecha
     * @param format Foramto de la fecha
     */
    UtilsProvider.prototype.formatDate = function (date, format) {
        return this.datePipe.transform(date, format);
    };
    /**
     * Formatea una valor en moneda
     * @param value Valor
     */
    UtilsProvider.prototype.currency = function (value) {
        return this.currencyPipe.transform(value, 'USD', true, '1.0-2');
    };
    /**
     * Returns a random time between min (inclusive) and max (exclusive)
     * @param min
     * @param max
     */
    UtilsProvider.prototype.getRandomTime = function (min, max) {
        if (typeof max === 'undefined') {
            max = this.getCurrentTime();
        }
        return this.getRandomInt(min, max);
        ;
    };
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    UtilsProvider.prototype.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    UtilsProvider.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * Returns a random boolean
     */
    UtilsProvider.prototype.getRandomBoolean = function () {
        return Math.random() >= 0.5;
    };
    /**
     * Identifica si esta en el navegador
     */
    UtilsProvider.prototype.isBrowser = function () {
        return this.platform.is('browser');
    };
    /**
     * Identifica si es una plataforma iOS
     */
    UtilsProvider.prototype.isIOS = function () {
        return this.platform.is('ios');
    };
    /**
     * Identifica si es una plataforma Android
     */
    UtilsProvider.prototype.isAndroid = function () {
        return this.platform.is('android');
    };
    /**
     * Identifica si existe la refencia de Cordova
     * Esta función es útil para condicionar el uso de algun plugin si no esta instalado
     */
    UtilsProvider.prototype.isCordova = function () {
        return typeof window.cordova !== 'undefined';
    };
    UtilsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_ng_pipes__["b" /* SearchFieldPipe */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* CurrencyPipe */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["e" /* DatePipe */]])
    ], UtilsProvider);
    return UtilsProvider;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 199,
	"./af.js": 199,
	"./ar": 200,
	"./ar-dz": 201,
	"./ar-dz.js": 201,
	"./ar-kw": 202,
	"./ar-kw.js": 202,
	"./ar-ly": 203,
	"./ar-ly.js": 203,
	"./ar-ma": 204,
	"./ar-ma.js": 204,
	"./ar-sa": 205,
	"./ar-sa.js": 205,
	"./ar-tn": 206,
	"./ar-tn.js": 206,
	"./ar.js": 200,
	"./az": 207,
	"./az.js": 207,
	"./be": 208,
	"./be.js": 208,
	"./bg": 209,
	"./bg.js": 209,
	"./bm": 210,
	"./bm.js": 210,
	"./bn": 211,
	"./bn.js": 211,
	"./bo": 212,
	"./bo.js": 212,
	"./br": 213,
	"./br.js": 213,
	"./bs": 214,
	"./bs.js": 214,
	"./ca": 215,
	"./ca.js": 215,
	"./cs": 216,
	"./cs.js": 216,
	"./cv": 217,
	"./cv.js": 217,
	"./cy": 218,
	"./cy.js": 218,
	"./da": 219,
	"./da.js": 219,
	"./de": 220,
	"./de-at": 221,
	"./de-at.js": 221,
	"./de-ch": 222,
	"./de-ch.js": 222,
	"./de.js": 220,
	"./dv": 223,
	"./dv.js": 223,
	"./el": 224,
	"./el.js": 224,
	"./en-au": 225,
	"./en-au.js": 225,
	"./en-ca": 226,
	"./en-ca.js": 226,
	"./en-gb": 227,
	"./en-gb.js": 227,
	"./en-ie": 228,
	"./en-ie.js": 228,
	"./en-il": 229,
	"./en-il.js": 229,
	"./en-nz": 230,
	"./en-nz.js": 230,
	"./eo": 231,
	"./eo.js": 231,
	"./es": 232,
	"./es-do": 233,
	"./es-do.js": 233,
	"./es-us": 234,
	"./es-us.js": 234,
	"./es.js": 232,
	"./et": 235,
	"./et.js": 235,
	"./eu": 236,
	"./eu.js": 236,
	"./fa": 237,
	"./fa.js": 237,
	"./fi": 238,
	"./fi.js": 238,
	"./fo": 239,
	"./fo.js": 239,
	"./fr": 240,
	"./fr-ca": 241,
	"./fr-ca.js": 241,
	"./fr-ch": 242,
	"./fr-ch.js": 242,
	"./fr.js": 240,
	"./fy": 243,
	"./fy.js": 243,
	"./gd": 244,
	"./gd.js": 244,
	"./gl": 245,
	"./gl.js": 245,
	"./gom-latn": 246,
	"./gom-latn.js": 246,
	"./gu": 247,
	"./gu.js": 247,
	"./he": 248,
	"./he.js": 248,
	"./hi": 249,
	"./hi.js": 249,
	"./hr": 250,
	"./hr.js": 250,
	"./hu": 251,
	"./hu.js": 251,
	"./hy-am": 252,
	"./hy-am.js": 252,
	"./id": 253,
	"./id.js": 253,
	"./is": 254,
	"./is.js": 254,
	"./it": 255,
	"./it.js": 255,
	"./ja": 256,
	"./ja.js": 256,
	"./jv": 257,
	"./jv.js": 257,
	"./ka": 258,
	"./ka.js": 258,
	"./kk": 259,
	"./kk.js": 259,
	"./km": 260,
	"./km.js": 260,
	"./kn": 261,
	"./kn.js": 261,
	"./ko": 262,
	"./ko.js": 262,
	"./ky": 263,
	"./ky.js": 263,
	"./lb": 264,
	"./lb.js": 264,
	"./lo": 265,
	"./lo.js": 265,
	"./lt": 266,
	"./lt.js": 266,
	"./lv": 267,
	"./lv.js": 267,
	"./me": 268,
	"./me.js": 268,
	"./mi": 269,
	"./mi.js": 269,
	"./mk": 270,
	"./mk.js": 270,
	"./ml": 271,
	"./ml.js": 271,
	"./mn": 272,
	"./mn.js": 272,
	"./mr": 273,
	"./mr.js": 273,
	"./ms": 274,
	"./ms-my": 275,
	"./ms-my.js": 275,
	"./ms.js": 274,
	"./mt": 276,
	"./mt.js": 276,
	"./my": 277,
	"./my.js": 277,
	"./nb": 278,
	"./nb.js": 278,
	"./ne": 279,
	"./ne.js": 279,
	"./nl": 280,
	"./nl-be": 281,
	"./nl-be.js": 281,
	"./nl.js": 280,
	"./nn": 282,
	"./nn.js": 282,
	"./pa-in": 283,
	"./pa-in.js": 283,
	"./pl": 284,
	"./pl.js": 284,
	"./pt": 285,
	"./pt-br": 286,
	"./pt-br.js": 286,
	"./pt.js": 285,
	"./ro": 287,
	"./ro.js": 287,
	"./ru": 288,
	"./ru.js": 288,
	"./sd": 289,
	"./sd.js": 289,
	"./se": 290,
	"./se.js": 290,
	"./si": 291,
	"./si.js": 291,
	"./sk": 292,
	"./sk.js": 292,
	"./sl": 293,
	"./sl.js": 293,
	"./sq": 294,
	"./sq.js": 294,
	"./sr": 295,
	"./sr-cyrl": 296,
	"./sr-cyrl.js": 296,
	"./sr.js": 295,
	"./ss": 297,
	"./ss.js": 297,
	"./sv": 298,
	"./sv.js": 298,
	"./sw": 299,
	"./sw.js": 299,
	"./ta": 300,
	"./ta.js": 300,
	"./te": 301,
	"./te.js": 301,
	"./tet": 302,
	"./tet.js": 302,
	"./tg": 303,
	"./tg.js": 303,
	"./th": 304,
	"./th.js": 304,
	"./tl-ph": 305,
	"./tl-ph.js": 305,
	"./tlh": 306,
	"./tlh.js": 306,
	"./tr": 307,
	"./tr.js": 307,
	"./tzl": 308,
	"./tzl.js": 308,
	"./tzm": 309,
	"./tzm-latn": 310,
	"./tzm-latn.js": 310,
	"./tzm.js": 309,
	"./ug-cn": 311,
	"./ug-cn.js": 311,
	"./uk": 312,
	"./uk.js": 312,
	"./ur": 313,
	"./ur.js": 313,
	"./uz": 314,
	"./uz-latn": 315,
	"./uz-latn.js": 315,
	"./uz.js": 314,
	"./vi": 316,
	"./vi.js": 316,
	"./x-pseudo": 317,
	"./x-pseudo.js": 317,
	"./yo": 318,
	"./yo.js": 318,
	"./zh-cn": 319,
	"./zh-cn.js": 319,
	"./zh-hk": 320,
	"./zh-hk.js": 320,
	"./zh-tw": 321,
	"./zh-tw.js": 321
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 395;

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_init_init__ = __webpack_require__(328);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var App = /** @class */ (function () {
    function App(platform) {
        var _this = this;
        this.rootPage = null;
        platform.ready().then(function () {
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_init_init__["a" /* InitPage */];
        });
    }
    App = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\app\app.html"*/'<ion-nav [root]="rootPage">\n  <!-- Nav -->\n</ion-nav>\n'/*ion-inline-end:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */]])
    ], App);
    return App;
}());

//# sourceMappingURL=app.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Home\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\jrojascl\Documents\31julio2018\everis-ionic-master\everis-ionic-master\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[331]);
//# sourceMappingURL=main.js.map