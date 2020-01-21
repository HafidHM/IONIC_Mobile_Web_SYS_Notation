import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AbsencesRetardsGlobal } from '../../class/absences-retards-global';



@Injectable()
export class AbsencesRetardProvider {
  
  constructor(public http: Http) {
  
  }

 public getAbsencesRetards(fonction:String): Promise<AbsencesRetardsGlobal>{
 
  const url = 'http://10.188.6.61/ProjetMobileStageFinal/gestiEtdAbsencesRetards.php?func='+fonction;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json())
    .catch(error => console.log('Une erreur est survenue ' + error))
  }
 
}
