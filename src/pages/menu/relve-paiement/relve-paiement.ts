import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VersementReglementProvider } from '../../../providers/versement-reglement/versement-reglement';
import { DatabaseProvider } from '../../../providers/database/database';



@IonicPage()
@Component({
  selector: 'page-relve-paiement',
  templateUrl: 'relve-paiement.html',
})
export class RelvePaiementPage {
  listeVersements: any = [];
  listeReglements: any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private versementReglementProvider:VersementReglementProvider, private databaseProvider: DatabaseProvider) {
      this.InsertVersementInDatabase();
      this.InsertRaglementsInDatabase();
      this.getVersementFromDataBase();
      this.getReglementFromDataBase();
  }
  

  InsertVersementInDatabase() {
      this.versementReglementProvider.getVersement()
      .then (listeFetched1 => {
        this.databaseProvider.Insert_Versement_InDataBase(listeFetched1);
      })
      .catch((error)=>{
        console.log("l erreur est : "+error);
      });
    }

  InsertRaglementsInDatabase(){
        this.versementReglementProvider.getReglement()
        .then (listeFetched2 => {
          this.databaseProvider.Insert_Reglements_InDataBase(listeFetched2);
        }) .catch((error)=>{
          console.log("l erreur est : "+error);
        });
  }

  public getVersementFromDataBase() {
    this.listeVersements = [];
    this.databaseProvider.getVersementFrom_DataBase().then(data => {
      this.listeVersements = data;
     // console.log(this.listeVersements);
    })
    .catch(error => console.log(error));
  }
  public getReglementFromDataBase() {
    this.listeReglements = [];
    this.databaseProvider.getReglementFrom_DataBase().then(data => {
      this.listeReglements = data;
     // console.log(this.listeReglements);
    })
    .catch(error => console.log(error));
  }
 
}
