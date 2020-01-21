import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Demandes } from '../../class/demandes';
import { VersementGlobal } from '../../class/versement-global';
import { ReglementGlobal } from '../../class/reglement-global';
import { ObjectVersement } from '../../class/object-versement';
import { ObjectReglement } from '../../class/object-reglement';
import { ObjectAbsencesRetards } from '../../class/object-absences-retards';
import { AbsencesRetardsGlobal } from '../../class/absences-retards-global';



@Injectable()
export class DatabaseProvider {
  private DBname:string = 'data.db';
  private db: SQLiteObject;
  private isOpen: boolean;
  private listeDemandes: Demandes[] = [];
  private listeVersements: ObjectVersement[] = [];
  private listeReglements: ObjectReglement[] = [];
  private listeRetards: ObjectAbsencesRetards[] = [];
  private listeAbsences: ObjectAbsencesRetards[] = [];
  constructor(public http: Http,private storage: SQLite) {
      
  }

public initialisation(){
    if(!this.isOpen)
    { 
      this.storage.create({
        name: this.DBname,
        location: 'default'
      })
        .then((db: SQLiteObject) => { 
          console.log('La creation des tables Done')     
          this.db = db;
          this.create_Tables();
        })
        .catch(e => console.log(e));
        this.isOpen = true; 
    } 
}

public create_Tables(): void {
  this.db.executeSql('CREATE TABLE IF NOT EXISTS demandes (id INTEGER PRIMARY KEY AUTOINCREMENT, subject VARCHAR(30) NOT NULL , body VARCHAR(100) NOT NULL)', [])
  .then(() => {
    console.log('create demandes Done')
    this.db.executeSql('CREATE TABLE IF NOT EXISTS  absences (seance_id INTEGER NOT NULL, Seance_type VARCHAR(25) NOT NULL, Matiere VARCHAR(25) NOT NULL, Date DATE NOT NULL, Justification VARCHAR(100) NOT NULL, Heure_debut DATE NOT NULL, Heure_fin DATE NOT NULL, La_duree INTEGER NOT NULL)', [])
    .then(() => {
      console.log('create absences  Done')
      this.db.executeSql('CREATE TABLE IF NOT EXISTS retards (seance_id INTEGER NOT NULL, Seance_type VARCHAR(25) NOT NULL, Matiere VARCHAR(25) NOT NULL, Date DATE NOT NULL, Justification VARCHAR(100) NOT NULL, Heure_debut DATE NOT NULL, Heure_fin DATE NOT NULL, La_duree INTEGER NOT NULL)', [])
      .then(() => {
        console.log('create retards  Done')
        this.db.executeSql('CREATE TABLE IF NOT EXISTS versements (versement_id INTEGER NOT NULL, commentaire VARCHAR(100) NOT NULL, date DATE NOT NULL, service VARCHAR(25) NOT NULL, type VARCHAR(25) NOT NULL, n_cheque INTEGER NOT NULL, nom_banque VARCHAR(25) NOT NULL, date_encaissement DATE NOT NULL, montant NUMERIC(12) NOT NULL)', [])
        .then(() => {
          console.log('create versements  Done')
          this.db.executeSql('CREATE TABLE IF NOT EXISTS reglements (versement_de VARCHAR(25) NOT NULL, mode_de_paiement VARCHAR(25) NOT NULL, montant NUMERIC(12) NOT NULL, reduction NUMERIC(12) NOT NULL, versement_total NUMERIC(12) NOT NULL, reste NUMERIC(12) NOT NULL, etat VARCHAR(1) NOT NULL)', [])
          .then(() => console.log('create reglements  Done'))
          .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  })
  .catch(e => console.log(e));
}

  public Insert_Absence_InDataBase(l:AbsencesRetardsGlobal)
  {
    if(l.data.length > 0){
      for(let i = 0; i < l.data.length; i++) {
        this.db.executeSql('INSERT OR REPLACE INTO absences (seance_id, Seance_type, Matiere, Date, Justification, Heure_debut, Heure_fin, La_duree) VALUES (\''+l.data[i].seance_id+'\',\''+l.data[i].Seance_type+'\',\''+l.data[i].Matiere+'\',\''+l.data[i].Date+'\',\''+l.data[i].Justification+'\',\''+l.data[i].Heure_debut+'\',\''+l.data[i].Heure_fin+'\',\''+l.data[i].La_duree+'\')',[])
        .then(() => console.log('Absence Inserted Done'))  
        .catch(e => console.log(e)) 
      }        
    }
  }

  public Insert_Retard_InDataBase(l:AbsencesRetardsGlobal)
  {
    
    if(l.data.length > 0){
      for(let i = 0; i < l.data.length; i++) {
        this.db.executeSql('INSERT OR REPLACE INTO retards (seance_id, Seance_type, Matiere, Date, Justification, Heure_debut, Heure_fin, La_duree) VALUES (\''+l.data[i].seance_id+'\',\''+l.data[i].Seance_type+'\',\''+l.data[i].Matiere+'\',\''+l.data[i].Date+'\',\''+l.data[i].Justification+'\',\''+l.data[i].Heure_debut+'\',\''+l.data[i].Heure_fin+'\',\''+l.data[i].La_duree+'\')',[])
        .then(() => console.log('Retard Inserted Done'))  
        .catch(e => console.log(e)) 
      }        
    } 
  }
  
 
  public Insert_Demande_InDataBase(subject: String,body: String)
  {
    this.db.executeSql('INSERT INTO demandes (subject, body) VALUES (\''+subject+'\',\''+body+'\')',[])
    .then(() => console.log('Demande Inserted Done'))  
    .catch(e => console.log(e)) 
  }
  
  
  public Insert_Versement_InDataBase(l:VersementGlobal){  
    if(l.data.length > 0){
      for(let i = 0; i < l.data.length; i++) {
        this.db.executeSql('INSERT OR REPLACE INTO versements (versement_id, commentaire, date, service, type, n_cheque, nom_banque, date_encaissement, montant) VALUES (\''+l.data[i].Versement_id+'\',\''+l.data[i].Commentaire+'\',\''+l.data[i].date+'\',\''+l.data[i].Service+'\',\''+l.data[i].Type+'\',\''+l.data[i].N_cheque+'\',\''+l.data[i].Nom_banque+'\',\''+l.data[i].date_encaissement+'\',\''+l.data[i].Montant+'\')',[])
       .then(() => console.log('Versement Inserted Done'))  
       .catch(e => console.log(e))
      }        
    }   
  }
  
  public Insert_Reglements_InDataBase(l:ReglementGlobal)
  { 
        if(l.data.length > 0){
            for(let i = 0; i < l.data.length; i++) {
              this.db.executeSql('INSERT OR REPLACE INTO reglements (versement_de, mode_de_paiement, montant, reduction, versement_total, reste, etat) VALUES (\''+l.data[i].Versement_de+'\',\''+l.data[i].Mode_de_paiement+'\',\''+l.data[i].Montant+'\',\''+l.data[i].Reduction+'\',\''+l.data[i].Versement_total+'\',\''+l.data[i].Reste+'\',\''+l.data[i].Etat+'\')',[])
             .then(() => console.log('Reglement Inserted Done'))  
             .catch(e => console.log(e))
            }        
        }      
  }

  public getAbsencesFrom_DataBase(){
    this.listeAbsences = [];
    return this.db.executeSql('SELECT  *FROM  absences',[])
        .then((data) => {
              if(data == null){
                return;
              }
              if(data.rows)
              {
                    if(data.rows.length > 0)
                    {  
                      console.log('data.rows.length '+data.rows.length);
  
                      for(let i = 0; i < data.rows.length; i++) {
                              this.listeAbsences.push(data.rows.item(i));
                      }
                    }
              }
            return this.listeAbsences;
        })
        .catch((e) => console.log(e));
  }
  
  
  public getRetardsFrom_DataBase(){

    this.listeRetards = [];
    return this.db.executeSql('SELECT  *FROM  retards',[])
        .then((data) => {
              if(data == null){
                return;
              }
              if(data.rows)
              {
                    if(data.rows.length > 0)
                    {  
                      console.log('data.rows.length '+data.rows.length);
  
                      for(let i = 0; i < data.rows.length; i++) {
                              this.listeRetards.push(data.rows.item(i));
                      }
                    }
              }
            return this.listeRetards;
        })
        .catch((e) => console.log(e));
  
  }

 
 public getDemandesFromSqlite(){
  this.listeDemandes = [];
  return this.db.executeSql('SELECT * FROM demandes',[])
      .then((data) => {
            if(data == null){
              return;
            }
            if(data.rows)
            {
                  if(data.rows.length > 0)
                  {  
                    console.log('data.rows.length '+data.rows.length);

                    for(let i = 0; i < data.rows.length; i++) {
                            this.listeDemandes.push(data.rows.item(i));
                    }
                  }
            }
          return this.listeDemandes;
      })
      .catch((e) => console.log(e));
      
  }

public getVersementFrom_DataBase(){

    this.listeVersements = [];
  return this.db.executeSql('SELECT * FROM versements',[])
      .then((data) => {
            if(data == null){
              return;
            }
            if(data.rows)
            {
                  if(data.rows.length > 0)
                  {  
                    console.log('Versements From SQL '+data.rows.length);

                    for(let i = 0; i < data.rows.length; i++) {
                            this.listeVersements.push(data.rows.item(i));
                    }
                  }
            }
          return this.listeVersements;
      })
      .catch((e) => console.log(e)); 
}

  public getReglementFrom_DataBase(){

    this.listeReglements = []; 
    return this.db.executeSql('SELECT * FROM reglements',[])
        .then((data) => {
              if(data == null){
                return;
              }
              if(data.rows)
              {
                    if(data.rows.length > 0)
                    {  
                      console.log('Reglements From SQL '+data.rows.length);
  
                      for(let i = 0; i < data.rows.length; i++) {
                              this.listeReglements.push(data.rows.item(i));
                      }
                    }
              }
            return this.listeReglements;
        })
        .catch((e) => console.log(e)); 
  }

}
