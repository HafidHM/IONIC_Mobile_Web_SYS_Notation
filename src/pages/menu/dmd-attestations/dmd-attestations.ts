import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { DatabaseProvider } from '../../../providers/database/database';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dmd-attestations',
  templateUrl: 'dmd-attestations.html',
})
export class DmdAttestationsPage {
  subject = '';
  format = '';
  body =''
  to = "mohamed.hafid.z@outlook.fr";
  liste: any = [];
   
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private emailComposer:EmailComposer,
              private databaseProvider: DatabaseProvider) {
                this.GetAllDemandes();
    
  }
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'La demande est enregistree',
      duration: 3000
    });
    toast.present();
  }

  public envoyer(){
    this.databaseProvider.Insert_Demande_InDataBase(this.subject, this.body);
    this.presentToast();
   let email = {
     to: "mohamed.hafid.z@outlook.fr",
     cc: [],
     attachments: [],
     subject: this.subject,
     body: "<p>"+this.body+"</p>"+"<br>Format: "+this.format,
     isHtml: true,
     app: "ProjectMobileStagefinal"
   }
   this.emailComposer.open(email);
   this.navCtrl.setRoot(DmdAttestationsPage);
 }
 
 
  public GetAllDemandes()
  {  
      this.liste = [];
      this.databaseProvider.getDemandesFromSqlite().then(data => {
        this.liste = data;
        console.log(this.liste);
      })
    .catch(error => console.log(error));
  }

}
