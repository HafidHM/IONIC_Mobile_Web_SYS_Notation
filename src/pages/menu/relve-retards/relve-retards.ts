import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbsencesRetardProvider } from '../../../providers/absences-retard/absences-retard';
import { DatabaseProvider } from '../../../providers/database/database';
@IonicPage()
@Component({
  selector: 'page-relve-retards',
  templateUrl: 'relve-retards.html',
})
export class RelveRetardsPage {
   private fonction : String='listeRetardsEtudiant';
   listeRetards: any = [];

      constructor(public navCtrl: NavController, public navParams: NavParams, private retardProvider:AbsencesRetardProvider, private databaseProvider:DatabaseProvider) {
        
        this.InsertRetardsInDataBase();
        this.getRetardsFromDataBase();

      }

      InsertRetardsInDataBase(){
           this.retardProvider.getAbsencesRetards(this.fonction).then (listeFetched3 => {
             console.log("listeR : "+listeFetched3);
             this.databaseProvider.Insert_Retard_InDataBase(listeFetched3);
           }) .catch((error)=>{
            console.log("l erreur est : "+error);
          });
      }

      public getRetardsFromDataBase() {
        this.listeRetards = [];
        this.databaseProvider.getRetardsFrom_DataBase().then(data => {
          this.listeRetards = data;
         // console.log(this.listeRetards);
        })
        .catch(error => console.log(error));
      }
   
}
