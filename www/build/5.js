webpackJsonp([5],{

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DmdAttestationsPageModule", function() { return DmdAttestationsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dmd_attestations__ = __webpack_require__(300);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DmdAttestationsPageModule = /** @class */ (function () {
    function DmdAttestationsPageModule() {
    }
    DmdAttestationsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__dmd_attestations__["a" /* DmdAttestationsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__dmd_attestations__["a" /* DmdAttestationsPage */]),
            ],
        })
    ], DmdAttestationsPageModule);
    return DmdAttestationsPageModule;
}());

//# sourceMappingURL=dmd-attestations.module.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DmdAttestationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DmdAttestationsPage = /** @class */ (function () {
    function DmdAttestationsPage(navCtrl, navParams, toastCtrl, emailComposer, databaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.emailComposer = emailComposer;
        this.databaseProvider = databaseProvider;
        this.subject = '';
        this.format = '';
        this.body = '';
        this.to = "mohamed.hafid.z@outlook.fr";
        this.liste = [];
        this.GetAllDemandes();
    }
    DmdAttestationsPage_1 = DmdAttestationsPage;
    DmdAttestationsPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'La demande est enregistree',
            duration: 3000
        });
        toast.present();
    };
    DmdAttestationsPage.prototype.envoyer = function () {
        this.databaseProvider.Insert_Demande_InDataBase(this.subject, this.body);
        this.presentToast();
        var email = {
            to: "mohamed.hafid.z@outlook.fr",
            cc: [],
            attachments: [],
            subject: this.subject,
            body: "<p>" + this.body + "</p>" + "<br>Format: " + this.format,
            isHtml: true,
            app: "ProjectMobileStagefinal"
        };
        this.emailComposer.open(email);
        this.navCtrl.setRoot(DmdAttestationsPage_1);
    };
    DmdAttestationsPage.prototype.GetAllDemandes = function () {
        var _this = this;
        this.liste = [];
        this.databaseProvider.getDemandesFromSqlite().then(function (data) {
            _this.liste = data;
            console.log(_this.liste);
        })
            .catch(function (error) { return console.log(error); });
    };
    DmdAttestationsPage = DmdAttestationsPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dmd-attestations',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\dmd-attestations\dmd-attestations.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n      <button ion-button="" menuToggle="">\n          <ion-icon name="menu"></ion-icon>\n      </button>\n      <h4> <ion-title>Demande Attestation</ion-title></h4> \n  </ion-navbar>\n\n</ion-header>\n\n <ion-content>\n        <ion-list inset>\n            <ion-item  padding>\n                <ion-label color="primary">A:</ion-label>\n                <ion-input [(ngModel)]="to" type="text" value="mohamed.hafid.z@outlook.fr">mohamed.hafid.z@outlook.fr</ion-input>\n            </ion-item>\n    \n            <ion-item padding>\n              <ion-label color="primary">Sujet:</ion-label>\n              <ion-input  [(ngModel)]="subject"  type="text"></ion-input>\n            </ion-item>\n          \n            <ion-item padding>\n              <ion-label color="primary"> Message:</ion-label>\n              <ion-input [(ngModel)]= "body" type="text"></ion-input>\n              <ion-select [(ngModel)]="format">\n                  <ion-option value="pdf">pdf</ion-option>\n                  <ion-option value="png">png</ion-option>\n                  <ion-option value="word">word</ion-option>\n               </ion-select>\n            </ion-item>\n          </ion-list>\n\n          <button ion-button full (click)="envoyer()" color="danger" padding> \n            <ion-icon name="send"> Envoyer</ion-icon>\n         </button>\n         <ion-card *ngFor=\'let demande of liste\'> \n                    <ion-item>Sujet: <h5>{{demande.subject}}</h5></ion-item>  \n                    <ion-item>Message: <h5>{{demande.body}}</h5> </ion-item>  \n        </ion-card>\n            \n </ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\dmd-attestations\dmd-attestations.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], DmdAttestationsPage);
    return DmdAttestationsPage;
    var DmdAttestationsPage_1;
}());

//# sourceMappingURL=dmd-attestations.js.map

/***/ })

});
//# sourceMappingURL=5.js.map