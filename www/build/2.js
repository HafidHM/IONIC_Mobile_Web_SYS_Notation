webpackJsonp([2],{

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelvePaiementPageModule", function() { return RelvePaiementPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__relve_paiement__ = __webpack_require__(296);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RelvePaiementPageModule = /** @class */ (function () {
    function RelvePaiementPageModule() {
    }
    RelvePaiementPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__relve_paiement__["a" /* RelvePaiementPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__relve_paiement__["a" /* RelvePaiementPage */]),
            ],
        })
    ], RelvePaiementPageModule);
    return RelvePaiementPageModule;
}());

//# sourceMappingURL=relve-paiement.module.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelvePaiementPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_versement_reglement_versement_reglement__ = __webpack_require__(207);
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




var RelvePaiementPage = /** @class */ (function () {
    function RelvePaiementPage(navCtrl, navParams, versementReglementProvider, databaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.versementReglementProvider = versementReglementProvider;
        this.databaseProvider = databaseProvider;
        this.listeVersements = [];
        this.listeReglements = [];
        this.InsertVersementInDatabase();
        this.InsertRaglementsInDatabase();
        this.getVersementFromDataBase();
        this.getReglementFromDataBase();
    }
    RelvePaiementPage.prototype.InsertVersementInDatabase = function () {
        var _this = this;
        this.versementReglementProvider.getVersement()
            .then(function (listeFetched1) {
            _this.databaseProvider.Insert_Versement_InDataBase(listeFetched1);
        })
            .catch(function (error) {
            console.log("l erreur est : " + error);
        });
    };
    RelvePaiementPage.prototype.InsertRaglementsInDatabase = function () {
        var _this = this;
        this.versementReglementProvider.getReglement()
            .then(function (listeFetched2) {
            _this.databaseProvider.Insert_Reglements_InDataBase(listeFetched2);
        }).catch(function (error) {
            console.log("l erreur est : " + error);
        });
    };
    RelvePaiementPage.prototype.getVersementFromDataBase = function () {
        var _this = this;
        this.listeVersements = [];
        this.databaseProvider.getVersementFrom_DataBase().then(function (data) {
            _this.listeVersements = data;
            // console.log(this.listeVersements);
        })
            .catch(function (error) { return console.log(error); });
    };
    RelvePaiementPage.prototype.getReglementFromDataBase = function () {
        var _this = this;
        this.listeReglements = [];
        this.databaseProvider.getReglementFrom_DataBase().then(function (data) {
            _this.listeReglements = data;
            // console.log(this.listeReglements);
        })
            .catch(function (error) { return console.log(error); });
    };
    RelvePaiementPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-relve-paiement',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\relve-paiement\relve-paiement.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n      <button ion-button="" menuToggle="">\n          <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>Relevé De Paiement</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n   \n  <ion-card *ngFor= " let reglement of listeReglements"> \n    <ion-card-header style="background: rgb(65, 65, 65)">\n       <p style="color: white"> Liste des versements de:</p> <br>\n        <p style="color: rgb(255, 255, 255)">{{reglement.versement_de}}</p>\n    </ion-card-header>\n   <ion-card-content > \n    <ion-list>\n      <button class="listePr" ion-item>\n          Mode de paiement: <br>\n        {{reglement.mode_de_paiement}}\n      </button>\n  \n      <button class="listePr" ion-item>\n          Montant:<br>\n          {{reglement.montant}} \n      </button>\n  \n      <button class="listePr" ion-item>\n          Réduction:<br>\n          {{reglement.reduction}} \n      </button>\n  \n      <button class="listePr"  ion-item>\n            Versement total: <br>\n            {{reglement.versement_total}}\n      </button>\n  \n      <button class="listePr" ion-item>\n          Reste:     <br>   \n         {{reglement.reste}} \n      </button>\n  \n      <button class="listePr" ion-item>\n          Etat: <br>\n          {{reglement.etat}} \n      </button>\n    </ion-list>\n    </ion-card-content>\n  </ion-card>\n  \n  <ion-card *ngFor="let versement of listeVersements" >\n        <ion-list>\n                    <button ion-item>\n                        Service <br>  \n                    {{versement.service}}\n                    </button>\n                    <button ion-item>\n                        Type<br>\n                        {{versement.type}} \n                    </button>\n                    <button ion-item>\n                        Numero Cheque\n                        {{versement.n_cheque}}\n                    </button>\n                    <button ion-item>\n                        Nom de la banque<br>\n                        {{versement.nom_banque}} \n                    </button>\n                    <button ion-item>\n                            Commantaire<br>\n                            {{versement.commantaire}}\n                    </button>\n                    <button ion-item>\n                        Date<br>\n                        {{versement.date}}\n                    </button>\n                    <button ion-item>\n                        Date_encaissement<br>\n                        {{versement.date_encaissement}}\n                    </button>\n                    <button ion-item>\n                        Montant <br>\n                        {{versement.montant}} \n                    </button>      \n        </ion-list>\n    </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\relve-paiement\relve-paiement.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_versement_reglement_versement_reglement__["a" /* VersementReglementProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], RelvePaiementPage);
    return RelvePaiementPage;
}());

//# sourceMappingURL=relve-paiement.js.map

/***/ })

});
//# sourceMappingURL=2.js.map