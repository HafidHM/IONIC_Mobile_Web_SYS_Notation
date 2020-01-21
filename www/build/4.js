webpackJsonp([4],{

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelveAbsencesPageModule", function() { return RelveAbsencesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__relve_absences__ = __webpack_require__(297);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RelveAbsencesPageModule = /** @class */ (function () {
    function RelveAbsencesPageModule() {
    }
    RelveAbsencesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__relve_absences__["a" /* RelveAbsencesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__relve_absences__["a" /* RelveAbsencesPage */]),
            ],
        })
    ], RelveAbsencesPageModule);
    return RelveAbsencesPageModule;
}());

//# sourceMappingURL=relve-absences.module.js.map

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

/***/ })

});
//# sourceMappingURL=4.js.map