import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private databaseProvider: DatabaseProvider) {
    
  }

  doLogin(){
    this.databaseProvider.initialisation();
    this.navCtrl.setRoot('MenuChoixPage'); 
  }
  
}
