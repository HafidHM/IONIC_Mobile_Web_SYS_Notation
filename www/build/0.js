webpackJsonp([0],{

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuChoixPageModule", function() { return MenuChoixPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_choix__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MenuChoixPageModule = /** @class */ (function () {
    function MenuChoixPageModule() {
    }
    MenuChoixPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu_choix__["a" /* MenuChoixPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu_choix__["a" /* MenuChoixPage */]),
            ],
        })
    ], MenuChoixPageModule);
    return MenuChoixPageModule;
}());

//# sourceMappingURL=menu-choix.module.js.map

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

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelveAbsencesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_absences_retard_absences_retard__ = __webpack_require__(205);
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




var RelveAbsencesPage = /** @class */ (function () {
    function RelveAbsencesPage(navCtrl, navParams, absenceProvider, databaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.absenceProvider = absenceProvider;
        this.databaseProvider = databaseProvider;
        this.fonction = 'listeAbsencesEtudiant';
        this.listeAbsences = [];
        this.InsertAbsencesInDataBase();
        this.getAbsencesFromDataBase();
    }
    RelveAbsencesPage.prototype.InsertAbsencesInDataBase = function () {
        var _this = this;
        this.absenceProvider.getAbsencesRetards(this.fonction).then(function (listeFetched4) {
            _this.databaseProvider.Insert_Absence_InDataBase(listeFetched4);
        }).catch(function (error) {
            console.log("l erreur est : " + error);
        });
    };
    RelveAbsencesPage.prototype.getAbsencesFromDataBase = function () {
        var _this = this;
        this.listeAbsences = [];
        this.databaseProvider.getAbsencesFrom_DataBase().then(function (data) {
            _this.listeAbsences = data;
            //console.log(this.listeAbsences);
        })
            .catch(function (error) { return console.log(error); });
    };
    RelveAbsencesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-relve-absences',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\relve-absences\relve-absences.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n      <button ion-button="" menuToggle="">\n          <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>Relevé Des Absences</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    \n      <ion-card *ngFor="let absence of listeAbsences">\n\n        <ion-card-header style="color: rgb(8, 1, 75);">\n            <ion-icon name="calendar"></ion-icon>\n            {{ absence.Date }}\n        </ion-card-header>\n      \n        <ion-card-content>\n          \n            <p style="color: green; text-align: right"><b>Heure de Debut: </b>{{ absence.Heure_debut }}</p>\n            <p style="color: rgb(128, 9, 0); text-align: right"><b>Heure de Fin: </b>{{ absence.Heure_fin }}</p>\n            <p><b>Justification: </b> {{ absence.Justification }}</p>\n            <p><b>duree: </b> {{ absence.La_duree }}</p>\n            <p><b>Matiere: </b> {{ absence.Matiere  }}</p>\n            <p><b>Type: </b> {{ absence.Seance_type }}</p>\n        </ion-card-content>\n      \n    </ion-card>  \n    \n\n\n</ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\relve-absences\relve-absences.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_absences_retard_absences_retard__["a" /* AbsencesRetardProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], RelveAbsencesPage);
    return RelveAbsencesPage;
}());

//# sourceMappingURL=relve-absences.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelveRetardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_absences_retard_absences_retard__ = __webpack_require__(205);
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




var RelveRetardsPage = /** @class */ (function () {
    function RelveRetardsPage(navCtrl, navParams, retardProvider, databaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.retardProvider = retardProvider;
        this.databaseProvider = databaseProvider;
        this.fonction = 'listeRetardsEtudiant';
        this.listeRetards = [];
        this.InsertRetardsInDataBase();
        this.getRetardsFromDataBase();
    }
    RelveRetardsPage.prototype.InsertRetardsInDataBase = function () {
        var _this = this;
        this.retardProvider.getAbsencesRetards(this.fonction).then(function (listeFetched3) {
            console.log("listeR : " + listeFetched3);
            _this.databaseProvider.Insert_Retard_InDataBase(listeFetched3);
        }).catch(function (error) {
            console.log("l erreur est : " + error);
        });
    };
    RelveRetardsPage.prototype.getRetardsFromDataBase = function () {
        var _this = this;
        this.listeRetards = [];
        this.databaseProvider.getRetardsFrom_DataBase().then(function (data) {
            _this.listeRetards = data;
            // console.log(this.listeRetards);
        })
            .catch(function (error) { return console.log(error); });
    };
    RelveRetardsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-relve-retards',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\relve-retards\relve-retards.html"*/'<ion-header>\n  <ion-navbar color="dark">\n      <button ion-button="" menuToggle="">\n          <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>Relevé Des Retards</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngFor="let retard of listeRetards">\n\n    <ion-card-header style="color: rgb(8, 1, 75);">\n        <ion-icon name="calendar"></ion-icon>\n        {{ retard.Date }}\n    </ion-card-header>\n  \n    <ion-card-content>\n      \n        <p style="color: green; text-align: right"><b>Heure de Debut: </b>{{ retard.Heure_debut }}</p>\n        <p style="color: rgb(128, 9, 0); text-align: right"><b>Heure de Fin: </b>{{ retard.Heure_fin }}</p>\n        <p><b>Justification: </b> {{ retard.Justification }}</p>\n        <p><b>duree: </b> {{ retard.La_duree }}</p>\n        <p><b>Matiere: </b> {{ retard.Matiere  }}</p>\n        <p><b>Type: </b> {{ retard.Seance_type }}</p>\n    </ion-card-content>\n  \n</ion-card> \n</ion-content>\n\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\relve-retards\relve-retards.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_absences_retard_absences_retard__["a" /* AbsencesRetardProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], RelveRetardsPage);
    return RelveRetardsPage;
}());

//# sourceMappingURL=relve-retards.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelveNotesPage; });
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


/**
 * Generated class for the RelveNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RelveNotesPage = /** @class */ (function () {
    function RelveNotesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RelveNotesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RelveNotesPage');
    };
    RelveNotesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-relve-notes',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\relve-notes\relve-notes.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n      <button ion-button="" menuToggle="">\n          <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>Relevé Des Notes</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\menu\relve-notes\relve-notes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], RelveNotesPage);
    return RelveNotesPage;
}());

//# sourceMappingURL=relve-notes.js.map

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

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuChoixPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__primaire_tabs_primaire_tabs__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_relve_paiement_relve_paiement__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_relve_absences_relve_absences__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_relve_retards_relve_retards__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__menu_relve_notes_relve_notes__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__menu_dmd_attestations_dmd_attestations__ = __webpack_require__(300);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MenuChoixPage = /** @class */ (function () {
    function MenuChoixPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__primaire_tabs_primaire_tabs__["a" /* PrimaireTabsPage */];
        this.pages = [
            { title: 'Accueil', pageName: 'AccueilPage', tabComponent: 'AccueilPage', index: 0, icon: 'home' },
            { title: 'Relevé de paiement', pageName: 'RelvePaiementPage', tabComponent: __WEBPACK_IMPORTED_MODULE_3__menu_relve_paiement_relve_paiement__["a" /* RelvePaiementPage */], icon: 'logo-euro' },
            { title: 'Relevé des absences', pageName: 'RelveAbsencesPage', tabComponent: __WEBPACK_IMPORTED_MODULE_4__menu_relve_absences_relve_absences__["a" /* RelveAbsencesPage */], icon: 'time' },
            { title: 'Relevé des retards', pageName: 'RelveRetardsPage', tabComponent: __WEBPACK_IMPORTED_MODULE_5__menu_relve_retards_relve_retards__["a" /* RelveRetardsPage */], icon: 'bookmarks' },
            { title: 'Relevé des notes', pageName: 'RelveNotesPage', tabComponent: __WEBPACK_IMPORTED_MODULE_6__menu_relve_notes_relve_notes__["a" /* RelveNotesPage */], icon: 'list-box' },
            { title: 'Demande des attestations', pageName: 'DmdAttestationsPage', tabComponent: __WEBPACK_IMPORTED_MODULE_7__menu_dmd_attestations_dmd_attestations__["a" /* DmdAttestationsPage */], icon: 'paper' },
        ];
    }
    MenuChoixPage.prototype.openPage = function (page) {
        var params = {};
        if (page.index) {
            params = { tabIndex: page.index };
        }
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        }
        else {
            if (page.index == 0) {
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__primaire_tabs_primaire_tabs__["a" /* PrimaireTabsPage */], params);
            }
            else {
                this.nav.setRoot(page.pageName, params);
            }
        }
    };
    MenuChoixPage.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNav();
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().index == page.index) {
                return 'danger';
            }
            return;
        }
        if (this.nav.getActive() && this.nav.getActive().name == page.pageName) {
            return 'danger';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MenuChoixPage.prototype, "nav", void 0);
    MenuChoixPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu-choix',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\menu-choix\menu-choix.html"*/' <ion-menu [content]="mycontent">\n  <ion-header>\n      <div class="profile">\n          <img class="profile-picture" src="http://ionicframework.com/img/docs/mcfly.jpg" />\n          <h5 class="name">HAFID MOHAMED</h5>\n      </div>\n  </ion-header>\n\n  <ion-content>\n           <div class=\'swanky_wrapper\'>\n              <ion-label menuClose=""  *ngFor="let m of pages" (click) ="openPage(m)">\n                  <ion-icon class="iconPrincipal" item-start [name]="m.icon" [color]="isActive(m)"></ion-icon>\n                    <span padding> {{m.title}}</span> \n                    <ion-icon  name="ios-arrow-forward-outline" style="text-align-last: right"></ion-icon>\n              </ion-label>\n           </div>  \n  </ion-content>\n\n</ion-menu>\n\n<ion-nav #mycontent [root]="rootPage" swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\menu-choix\menu-choix.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], MenuChoixPage);
    return MenuChoixPage;
}());

//# sourceMappingURL=menu-choix.js.map

/***/ })

});
//# sourceMappingURL=0.js.map