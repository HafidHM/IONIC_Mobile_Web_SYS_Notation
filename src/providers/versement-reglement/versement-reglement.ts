import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ReglementGlobal } from '../../class/reglement-global';
import { VersementGlobal } from '../../class/versement-global';

@Injectable()
export class VersementReglementProvider {

  constructor(public http: Http) {
    console.log('Hello VersementReglementProvider Provider');
  }

    public getReglement(): Promise<ReglementGlobal>{
      const url = 'http://10.188.6.61/ProjetMobileStageFinal/gestiEtdReglements.php?func=listeEtudiantsReglement';
      return this.http.get(url)
      
      .toPromise()
      .then(response1 => response1.json())
      .catch(error => console.log('Une erreur est survenue ' + error))
    }



    public getVersement(): Promise<VersementGlobal>{
        const url = 'http://10.188.6.61/ProjetMobileStageFinal/gestiEtdReglements.php?func=listeVersements';
          return this.http.get(url)
      
          .toPromise()
          .then(response => response.json())
          .catch(error => console.log('Une erreur est survenue ' + error))
    }

}
