import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AccueilPage} from '../pages/accueil/accueil';

import { ActualitePage } from '../pages/actualite/actualite';
import { ContactPage } from '../pages/contact/contact';
import { ParametresPage } from '../pages/parametres/parametres';
import { PrimaireTabsPage } from '../pages/primaire-tabs/primaire-tabs';
import { LoginPage } from '../pages/login/login';

import { HttpModule } from "@angular/http";
import { AbsencesRetardProvider } from '../providers/absences-retard/absences-retard';

import {IonicStorageModule} from '@ionic/storage';
import {SQLite} from '@ionic-native/sqlite';
import { EmailComposer } from '@ionic-native/email-composer';
import { DatabaseProvider } from '../providers/database/database';
import { VersementReglementProvider } from '../providers/versement-reglement/versement-reglement';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AccueilPage,
    ActualitePage,
    ContactPage,
    ParametresPage,
    PrimaireTabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AccueilPage,
    ActualitePage,
    ContactPage,
    ParametresPage,
    PrimaireTabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AbsencesRetardProvider,
    SQLite,
    EmailComposer,
    DatabaseProvider,
    VersementReglementProvider
  ]
})
export class AppModule {}
