import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav} from 'ionic-angular';
import { PrimaireTabsPage } from '../primaire-tabs/primaire-tabs';
import { RelvePaiementPage } from '../menu/relve-paiement/relve-paiement';
import { RelveAbsencesPage } from '../menu/relve-absences/relve-absences';
import { RelveRetardsPage } from '../menu/relve-retards/relve-retards';
import { RelveNotesPage } from '../menu/relve-notes/relve-notes';
import { DmdAttestationsPage } from '../menu/dmd-attestations/dmd-attestations';




export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu-choix',
  templateUrl: 'menu-choix.html',
})
export class MenuChoixPage {
  rootPage=PrimaireTabsPage;

  @ViewChild(Nav) nav:Nav;

   pages : PageInterface[] = [
    {title:'Accueil', pageName:'AccueilPage',tabComponent: 'AccueilPage', index:0,  icon:'home'},
    {title:'Relevé de paiement', pageName: 'RelvePaiementPage' , tabComponent:RelvePaiementPage, icon:'logo-euro'},
    {title:'Relevé des absences',pageName: 'RelveAbsencesPage',  tabComponent:RelveAbsencesPage, icon:'time'},
    {title:'Relevé des retards', pageName: 'RelveRetardsPage',  tabComponent:RelveRetardsPage, icon:'bookmarks'},
    {title:'Relevé des notes', pageName: 'RelveNotesPage',  tabComponent:RelveNotesPage,  icon:'list-box'},
    {title:'Demande des attestations',pageName:'DmdAttestationsPage', tabComponent:DmdAttestationsPage,  icon:'paper'},
    ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  openPage(page: PageInterface) {
    let params = {};
    if(page.index){
        params = { tabIndex: page.index }
    }

    if(this.nav.getActiveChildNav() && page.index != undefined)
    {
           this.nav.getActiveChildNav().select(page.index);
    }else{

       if(page.index==0)
       {
        this.nav.setRoot(PrimaireTabsPage,params);
       }
       else{
        this.nav.setRoot(page.pageName,params);
       }
         
    }
      
  }
  isActive(page: PageInterface){
      let  childNav = this.nav.getActiveChildNav();
      if(childNav){
        if(childNav.getSelected() && childNav.getSelected().index == page.index){
              return 'danger';
        }
        return;
      }
      if(this.nav.getActive() && this.nav.getActive().name == page.pageName)
      {
        return 'danger';
      }
            
  }

}
