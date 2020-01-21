import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { ActualitePage } from '../actualite/actualite';
import { ContactPage } from '../contact/contact';
import { ParametresPage } from '../parametres/parametres';

@IonicPage()
@Component({
  selector: 'page-primaire-tabs',
  templateUrl: 'primaire-tabs.html'
})
export class PrimaireTabsPage {

  accueilRoot = AccueilPage;
  actualiteRoot = ActualitePage;
  contactRoot = ContactPage;
  parametresRoot = ParametresPage;
  myIndex: number; 


  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }

}
