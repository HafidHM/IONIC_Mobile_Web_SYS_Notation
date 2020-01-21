webpackJsonp([12],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.DBname = 'data.db';
        this.listeDemandes = [];
        this.listeVersements = [];
        this.listeReglements = [];
        this.listeRetards = [];
        this.listeAbsences = [];
    }
    DatabaseProvider.prototype.initialisation = function () {
        var _this = this;
        if (!this.isOpen) {
            this.storage.create({
                name: this.DBname,
                location: 'default'
            })
                .then(function (db) {
                console.log('La creation des tables Done');
                _this.db = db;
                _this.create_Tables();
            })
                .catch(function (e) { return console.log(e); });
            this.isOpen = true;
        }
    };
    DatabaseProvider.prototype.create_Tables = function () {
        var _this = this;
        this.db.executeSql('CREATE TABLE IF NOT EXISTS demandes (id INTEGER PRIMARY KEY AUTOINCREMENT, subject VARCHAR(30) NOT NULL , body VARCHAR(100) NOT NULL)', [])
            .then(function () {
            console.log('create demandes Done');
            _this.db.executeSql('CREATE TABLE IF NOT EXISTS  absences (seance_id INTEGER NOT NULL, Seance_type VARCHAR(25) NOT NULL, Matiere VARCHAR(25) NOT NULL, Date DATE NOT NULL, Justification VARCHAR(100) NOT NULL, Heure_debut DATE NOT NULL, Heure_fin DATE NOT NULL, La_duree INTEGER NOT NULL)', [])
                .then(function () {
                console.log('create absences  Done');
                _this.db.executeSql('CREATE TABLE IF NOT EXISTS retards (seance_id INTEGER NOT NULL, Seance_type VARCHAR(25) NOT NULL, Matiere VARCHAR(25) NOT NULL, Date DATE NOT NULL, Justification VARCHAR(100) NOT NULL, Heure_debut DATE NOT NULL, Heure_fin DATE NOT NULL, La_duree INTEGER NOT NULL)', [])
                    .then(function () {
                    console.log('create retards  Done');
                    _this.db.executeSql('CREATE TABLE IF NOT EXISTS versements (versement_id INTEGER NOT NULL, commentaire VARCHAR(100) NOT NULL, date DATE NOT NULL, service VARCHAR(25) NOT NULL, type VARCHAR(25) NOT NULL, n_cheque INTEGER NOT NULL, nom_banque VARCHAR(25) NOT NULL, date_encaissement DATE NOT NULL, montant NUMERIC(12) NOT NULL)', [])
                        .then(function () {
                        console.log('create versements  Done');
                        _this.db.executeSql('CREATE TABLE IF NOT EXISTS reglements (versement_de VARCHAR(25) NOT NULL, mode_de_paiement VARCHAR(25) NOT NULL, montant NUMERIC(12) NOT NULL, reduction NUMERIC(12) NOT NULL, versement_total NUMERIC(12) NOT NULL, reste NUMERIC(12) NOT NULL, etat VARCHAR(1) NOT NULL)', [])
                            .then(function () { return console.log('create reglements  Done'); })
                            .catch(function (e) { return console.log(e); });
                    })
                        .catch(function (e) { return console.log(e); });
                })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        })
            .catch(function (e) { return console.log(e); });
    };
    DatabaseProvider.prototype.Insert_Absence_InDataBase = function (l) {
        if (l.data.length > 0) {
            for (var i = 0; i < l.data.length; i++) {
                this.db.executeSql('INSERT OR REPLACE INTO absences (seance_id, Seance_type, Matiere, Date, Justification, Heure_debut, Heure_fin, La_duree) VALUES (\'' + l.data[i].seance_id + '\',\'' + l.data[i].Seance_type + '\',\'' + l.data[i].Matiere + '\',\'' + l.data[i].Date + '\',\'' + l.data[i].Justification + '\',\'' + l.data[i].Heure_debut + '\',\'' + l.data[i].Heure_fin + '\',\'' + l.data[i].La_duree + '\')', [])
                    .then(function () { return console.log('Absence Inserted Done'); })
                    .catch(function (e) { return console.log(e); });
            }
        }
    };
    DatabaseProvider.prototype.Insert_Retard_InDataBase = function (l) {
        if (l.data.length > 0) {
            for (var i = 0; i < l.data.length; i++) {
                this.db.executeSql('INSERT OR REPLACE INTO retards (seance_id, Seance_type, Matiere, Date, Justification, Heure_debut, Heure_fin, La_duree) VALUES (\'' + l.data[i].seance_id + '\',\'' + l.data[i].Seance_type + '\',\'' + l.data[i].Matiere + '\',\'' + l.data[i].Date + '\',\'' + l.data[i].Justification + '\',\'' + l.data[i].Heure_debut + '\',\'' + l.data[i].Heure_fin + '\',\'' + l.data[i].La_duree + '\')', [])
                    .then(function () { return console.log('Retard Inserted Done'); })
                    .catch(function (e) { return console.log(e); });
            }
        }
    };
    DatabaseProvider.prototype.Insert_Demande_InDataBase = function (subject, body) {
        this.db.executeSql('INSERT INTO demandes (subject, body) VALUES (\'' + subject + '\',\'' + body + '\')', [])
            .then(function () { return console.log('Demande Inserted Done'); })
            .catch(function (e) { return console.log(e); });
    };
    DatabaseProvider.prototype.Insert_Versement_InDataBase = function (l) {
        if (l.data.length > 0) {
            for (var i = 0; i < l.data.length; i++) {
                this.db.executeSql('INSERT OR REPLACE INTO versements (versement_id, commentaire, date, service, type, n_cheque, nom_banque, date_encaissement, montant) VALUES (\'' + l.data[i].Versement_id + '\',\'' + l.data[i].Commentaire + '\',\'' + l.data[i].date + '\',\'' + l.data[i].Service + '\',\'' + l.data[i].Type + '\',\'' + l.data[i].N_cheque + '\',\'' + l.data[i].Nom_banque + '\',\'' + l.data[i].date_encaissement + '\',\'' + l.data[i].Montant + '\')', [])
                    .then(function () { return console.log('Versement Inserted Done'); })
                    .catch(function (e) { return console.log(e); });
            }
        }
    };
    DatabaseProvider.prototype.Insert_Reglements_InDataBase = function (l) {
        if (l.data.length > 0) {
            for (var i = 0; i < l.data.length; i++) {
                this.db.executeSql('INSERT OR REPLACE INTO reglements (versement_de, mode_de_paiement, montant, reduction, versement_total, reste, etat) VALUES (\'' + l.data[i].Versement_de + '\',\'' + l.data[i].Mode_de_paiement + '\',\'' + l.data[i].Montant + '\',\'' + l.data[i].Reduction + '\',\'' + l.data[i].Versement_total + '\',\'' + l.data[i].Reste + '\',\'' + l.data[i].Etat + '\')', [])
                    .then(function () { return console.log('Reglement Inserted Done'); })
                    .catch(function (e) { return console.log(e); });
            }
        }
    };
    DatabaseProvider.prototype.getAbsencesFrom_DataBase = function () {
        var _this = this;
        this.listeAbsences = [];
        return this.db.executeSql('SELECT  *FROM  absences', [])
            .then(function (data) {
            if (data == null) {
                return;
            }
            if (data.rows) {
                if (data.rows.length > 0) {
                    console.log('data.rows.length ' + data.rows.length);
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.listeAbsences.push(data.rows.item(i));
                    }
                }
            }
            return _this.listeAbsences;
        })
            .catch(function (e) { return console.log(e); });
    };
    DatabaseProvider.prototype.getRetardsFrom_DataBase = function () {
        var _this = this;
        this.listeRetards = [];
        return this.db.executeSql('SELECT  *FROM  retards', [])
            .then(function (data) {
            if (data == null) {
                return;
            }
            if (data.rows) {
                if (data.rows.length > 0) {
                    console.log('data.rows.length ' + data.rows.length);
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.listeRetards.push(data.rows.item(i));
                    }
                }
            }
            return _this.listeRetards;
        })
            .catch(function (e) { return console.log(e); });
    };
    DatabaseProvider.prototype.getDemandesFromSqlite = function () {
        var _this = this;
        this.listeDemandes = [];
        return this.db.executeSql('SELECT * FROM demandes', [])
            .then(function (data) {
            if (data == null) {
                return;
            }
            if (data.rows) {
                if (data.rows.length > 0) {
                    console.log('data.rows.length ' + data.rows.length);
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.listeDemandes.push(data.rows.item(i));
                    }
                }
            }
            return _this.listeDemandes;
        })
            .catch(function (e) { return console.log(e); });
    };
    DatabaseProvider.prototype.getVersementFrom_DataBase = function () {
        var _this = this;
        this.listeVersements = [];
        return this.db.executeSql('SELECT * FROM versements', [])
            .then(function (data) {
            if (data == null) {
                return;
            }
            if (data.rows) {
                if (data.rows.length > 0) {
                    console.log('Versements From SQL ' + data.rows.length);
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.listeVersements.push(data.rows.item(i));
                    }
                }
            }
            return _this.listeVersements;
        })
            .catch(function (e) { return console.log(e); });
    };
    DatabaseProvider.prototype.getReglementFrom_DataBase = function () {
        var _this = this;
        this.listeReglements = [];
        return this.db.executeSql('SELECT * FROM reglements', [])
            .then(function (data) {
            if (data == null) {
                return;
            }
            if (data.rows) {
                if (data.rows.length > 0) {
                    console.log('Reglements From SQL ' + data.rows.length);
                    for (var i = 0; i < data.rows.length; i++) {
                        _this.listeReglements.push(data.rows.item(i));
                    }
                }
            }
            return _this.listeReglements;
        })
            .catch(function (e) { return console.log(e); });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccueilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_http__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AccueilPage = /** @class */ (function () {
    function AccueilPage(navCtrl, http, navParams /*,private absencesRetardProvider: AbsencesRetardProvider*/) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams; /*,private absencesRetardProvider: AbsencesRetardProvider*/
    }
    AccueilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-accueil',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\accueil\accueil.html"*/'<ion-header>\n\n  <ion-navbar>\n          <button ion-button="" menuToggle="">\n                  <ion-icon name="menu"></ion-icon>\n          </button>                \n          <ion-title>Accueil</ion-title>               \n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n        \n</ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\accueil\accueil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] /*,private absencesRetardProvider: AbsencesRetardProvider*/])
    ], AccueilPage);
    return AccueilPage;
}());

//# sourceMappingURL=accueil.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActualitePage; });
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
 * Generated class for the ActualitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ActualitePage = /** @class */ (function () {
    function ActualitePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ActualitePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActualitePage');
    };
    ActualitePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-actualite',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\actualite\actualite.html"*/'<ion-header>\n\n  <ion-navbar>\n      <button ion-button="" menuToggle="">\n          <ion-icon name="menu"></ion-icon>\n      </button> \n      <ion-title>Actualite</ion-title>               \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n</ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\actualite\actualite.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ActualitePage);
    return ActualitePage;
}());

//# sourceMappingURL=actualite.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
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
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ContactPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactPage');
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n      <button ion-button="" menuToggle="">\n          <ion-icon name="menu"></ion-icon>\n      </button> \n      <ion-title>Contact</ion-title>               \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\contact\contact.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(103);
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
    function LoginPage(navCtrl, navParams, databaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.databaseProvider = databaseProvider;
    }
    LoginPage.prototype.doLogin = function () {
        this.databaseProvider.initialisation();
        this.navCtrl.setRoot('MenuChoixPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\login\login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="background">\n  \n   <ion-card>\n     <ion-card-header>\n        <img height="20" src="../../assets/imgs/logo_isga_direct.png" alt="logo">\n     </ion-card-header> \n     <ion-card-content>\n        <ion-list no-lines>\n            <ion-item>\n              <ion-label floating><ion-icon item-left name="contact"></ion-icon> Username</ion-label>\n              <ion-input type="text"></ion-input>\n            </ion-item>\n          \n            <ion-item>\n              <ion-label floating> <ion-icon item-left name="lock"></ion-icon> Password</ion-label>\n              <ion-input type="password"></ion-input>\n            </ion-item>  \n        </ion-list>\n      \n        <br>\n        <br>\n        <br>\n        <button ion-button  (click)="doLogin()" color="danger" block padding> LOGIN</button>\n        <p padding> Forgot password ?   <a>Get here</a></p>\n     </ion-card-content>     \n\n   </ion-card>\n\n       \n\n</ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParametresPage; });
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
 * Generated class for the ParametresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ParametresPage = /** @class */ (function () {
    function ParametresPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ParametresPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ParametresPage');
    };
    ParametresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-parametres',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\parametres\parametres.html"*/'<ion-header>\n\n  <ion-navbar>\n      <button ion-button="" menuToggle="">\n          <ion-icon name="menu"></ion-icon>\n      </button> \n      <ion-title>Parametres</ion-title>             \n         \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\parametres\parametres.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ParametresPage);
    return ParametresPage;
}());

//# sourceMappingURL=parametres.js.map

/***/ }),

/***/ 117:
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
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/accueil/accueil.module": [
		284,
		11
	],
	"../pages/actualite/actualite.module": [
		285,
		10
	],
	"../pages/contact/contact.module": [
		286,
		9
	],
	"../pages/login/login.module": [
		287,
		8
	],
	"../pages/menu-choix/menu-choix.module": [
		288,
		0
	],
	"../pages/menu/dmd-attestations/dmd-attestations.module": [
		289,
		5
	],
	"../pages/menu/relve-absences/relve-absences.module": [
		290,
		4
	],
	"../pages/menu/relve-notes/relve-notes.module": [
		291,
		3
	],
	"../pages/menu/relve-paiement/relve-paiement.module": [
		292,
		2
	],
	"../pages/menu/relve-retards/relve-retards.module": [
		293,
		1
	],
	"../pages/parametres/parametres.module": [
		294,
		7
	],
	"../pages/primaire-tabs/primaire-tabs.module": [
		295,
		6
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbsencesRetardProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AbsencesRetardProvider = /** @class */ (function () {
    function AbsencesRetardProvider(http) {
        this.http = http;
    }
    AbsencesRetardProvider.prototype.getAbsencesRetards = function (fonction) {
        var url = 'http://10.188.6.61/ProjetMobileStageFinal/gestiEtdAbsencesRetards.php?func=' + fonction;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) { return console.log('Une erreur est survenue ' + error); });
    };
    AbsencesRetardProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], AbsencesRetardProvider);
    return AbsencesRetardProvider;
}());

//# sourceMappingURL=absences-retard.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrimaireTabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__accueil_accueil__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actualite_actualite__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_contact__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parametres_parametres__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PrimaireTabsPage = /** @class */ (function () {
    function PrimaireTabsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.accueilRoot = __WEBPACK_IMPORTED_MODULE_2__accueil_accueil__["a" /* AccueilPage */];
        this.actualiteRoot = __WEBPACK_IMPORTED_MODULE_3__actualite_actualite__["a" /* ActualitePage */];
        this.contactRoot = __WEBPACK_IMPORTED_MODULE_4__contact_contact__["a" /* ContactPage */];
        this.parametresRoot = __WEBPACK_IMPORTED_MODULE_5__parametres_parametres__["a" /* ParametresPage */];
        this.myIndex = navParams.data.tabIndex || 0;
    }
    PrimaireTabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-primaire-tabs',template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\pages\primaire-tabs\primaire-tabs.html"*/'<ion-tabs color="danger" [selectedIndex]="myIndex">\n    <ion-tab [root]="accueilRoot" tabTitle="Accueil" tabIcon="home"></ion-tab>\n    <ion-tab [root]="actualiteRoot" tabTitle="Actualite" tabIcon="notifications"></ion-tab>\n    <ion-tab [root]="contactRoot" tabTitle="Contact" tabIcon="mail"></ion-tab>\n    <ion-tab [root]="parametresRoot" tabTitle="Parametres" tabIcon="settings"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\pages\primaire-tabs\primaire-tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], PrimaireTabsPage);
    return PrimaireTabsPage;
}());

//# sourceMappingURL=primaire-tabs.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VersementReglementProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VersementReglementProvider = /** @class */ (function () {
    function VersementReglementProvider(http) {
        this.http = http;
        console.log('Hello VersementReglementProvider Provider');
    }
    VersementReglementProvider.prototype.getReglement = function () {
        var url = 'http://10.188.6.61/ProjetMobileStageFinal/gestiEtdReglements.php?func=listeEtudiantsReglement';
        return this.http.get(url)
            .toPromise()
            .then(function (response1) { return response1.json(); })
            .catch(function (error) { return console.log('Une erreur est survenue ' + error); });
    };
    VersementReglementProvider.prototype.getVersement = function () {
        var url = 'http://10.188.6.61/ProjetMobileStageFinal/gestiEtdReglements.php?func=listeVersements';
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) { return console.log('Une erreur est survenue ' + error); });
    };
    VersementReglementProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], VersementReglementProvider);
    return VersementReglementProvider;
}());

//# sourceMappingURL=versement-reglement.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(232);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_accueil_accueil__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_actualite_actualite__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_parametres_parametres__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_primaire_tabs_primaire_tabs__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_absences_retard_absences_retard__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_sqlite__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_email_composer__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_database_database__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_versement_reglement_versement_reglement__ = __webpack_require__(207);
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_accueil_accueil__["a" /* AccueilPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_actualite_actualite__["a" /* ActualitePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_parametres_parametres__["a" /* ParametresPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_primaire_tabs_primaire_tabs__["a" /* PrimaireTabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_12__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/accueil/accueil.module#AccueilPageModule', name: 'AccueilPage', segment: 'accueil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/actualite/actualite.module#ActualitePageModule', name: 'ActualitePage', segment: 'actualite', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contact/contact.module#ContactPageModule', name: 'ContactPage', segment: 'contact', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu-choix/menu-choix.module#MenuChoixPageModule', name: 'MenuChoixPage', segment: 'menu-choix', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/dmd-attestations/dmd-attestations.module#DmdAttestationsPageModule', name: 'DmdAttestationsPage', segment: 'dmd-attestations', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/relve-absences/relve-absences.module#RelveAbsencesPageModule', name: 'RelveAbsencesPage', segment: 'relve-absences', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/relve-notes/relve-notes.module#RelveNotesPageModule', name: 'RelveNotesPage', segment: 'relve-notes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/relve-paiement/relve-paiement.module#RelvePaiementPageModule', name: 'RelvePaiementPage', segment: 'relve-paiement', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/relve-retards/relve-retards.module#RelveRetardsPageModule', name: 'RelveRetardsPage', segment: 'relve-retards', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/parametres/parametres.module#ParametresPageModule', name: 'ParametresPage', segment: 'parametres', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/primaire-tabs/primaire-tabs.module#PrimaireTabsPageModule', name: 'PrimaireTabsPage', segment: 'primaire-tabs', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_accueil_accueil__["a" /* AccueilPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_actualite_actualite__["a" /* ActualitePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_parametres_parametres__["a" /* ParametresPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_primaire_tabs_primaire_tabs__["a" /* PrimaireTabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_absences_retard_absences_retard__["a" /* AbsencesRetardProvider */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_17__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_versement_reglement_versement_reglement__["a" /* VersementReglementProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\ProjectMobileStagefinal\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\Projects\ProjectMobileStagefinal\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[209]);
//# sourceMappingURL=main.js.map