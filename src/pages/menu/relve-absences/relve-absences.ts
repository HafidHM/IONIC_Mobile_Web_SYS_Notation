import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbsencesRetardProvider } from '../../../providers/absences-retard/absences-retard';
import { DatabaseProvider } from '../../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-relve-absences',
  templateUrl: 'relve-absences.html',
})
export class RelveAbsencesPage {
  private fonction: String = 'listeAbsencesEtudiant';
  listeAbsences : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private absenceProvider:AbsencesRetardProvider, private databaseProvider:DatabaseProvider) {
    
    this.InsertAbsencesInDataBase();
    this.getAbsencesFromDataBase();

  }

  InsertAbsencesInDataBase(){
    this.absenceProvider.getAbsencesRetards(this.fonction).then (listeFetched4 => {
      this.databaseProvider.Insert_Absence_InDataBase(listeFetched4);
    }) .catch((error)=>{
     console.log("l erreur est : "+error);
   });
  }

  public getAbsencesFromDataBase() {
    this.listeAbsences = [];
    this.databaseProvider.getAbsencesFrom_DataBase().then(data => {
      this.listeAbsences = data;
      //console.log(this.listeAbsences);
    })
    .catch(error => console.log(error));
  }

}
