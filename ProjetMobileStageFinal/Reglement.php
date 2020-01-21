<?php
	
	/**************************************************************************
	* Source File	:  Reglement.php
	* Author        :  Ahmed HADIR
	* Modified   	:  26/01/2009
	* Description	:  Definition of the class Reglement
	**************************************************************************/
	
	header("Access-Control-Allow-Origin");	
require_once ( "ConnexionPDO.php" );
require_once ( "Etudiant.php" );


//require_once ( "../include/functions.php" );
	
	class Reglement extends Etudiant {
		
		/////////////////////// MAJ GESFO ETUDIANT JSON //////////////////
		
		var $connexion;

    ////////////////////////////////////////////////
    function __construct() {
        $this->connexion = new ConnexionPDO();
    }

    ////////////////////////////////////////////////
    function __destruct() {
        $this->connexion->close();
        unset( $this->connexion );
    }
		/*=========================================================================================*/
		/*				 Cette fonction donne la liste des versements						*/
		/*				 des étudiants (JSON)										*/
		/*=========================================================================================*/
		
		    function listeVersements($etudiant_id, $annee_id, $service_id){

            try{

                $data = $this->connexion->getDataBase();

                $query = "SELECT a.*, b.*, bon.* FROM versement a JOIN service b ON ( a.service_id = b.service_id ) LEFT JOIN bon ON (a.bon_id = bon.bon_id) 
							WHERE a.etudiant_id = :etudiant_id AND a.annee_id = :annee_id";
				
				if( is_numeric( $service_id ) ){
					$query .= " AND a.service_id = :service_id ";
				}
				
				$query .= " ORDER BY versement_date ASC";
				
                $stmt = $data->prepare($query);

				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				$stmt->bindParam(':service_id', $service_id, PDO::PARAM_INT);

              //  $resultat = $stmt->execute();

                return $stmt;

            }
            catch ( PDOException  $e ){
                echo $e->getMessage();
            }

    }
 

    function listeVersementsJSON($etudiant_id, $annee_id, $service_id){

            try {

                $mysql_data = array();
                $stmt = $this->listeVersements($etudiant_id, $annee_id, $service_id);
                $resultat = $stmt->execute();

                if (!$resultat) {
                    $result = 'error';
                    $message = 'query error';

                }
                else {
                    $result = 'success';
                    $message = 'query success';

                    while ($ligne = $stmt->fetch()) {

                        $mysql_data[] = array(
                            "versement_id" => $ligne['versement_id'],
                            "Commentaire" => $ligne['versement_commentaire'],
                            "date" => $ligne['versement_date'],
                            "Service" => $ligne['service_id'],
                            "Type" => $ligne['versement_type'],
                            "N_cheque" => $ligne['versement_n_cheque'],
                            "Nom_banque" => $ligne['versement_banque'],
                            "Date_encaissement" => $ligne['encaissement_date'],
                            "Montant" => $ligne['versement_montant']
                        );

                    }

                }
                echo $this->connexion->resultatJson($result, $message , $mysql_data );

            }
            catch ( PDOException  $e ){
                echo $e->getMessage();
            }

    }
	
	////////////////// liste etudiants///////////////////////////////////////////
	
	function listeEtudiantsReglementJSON($annee_id,$centre_id,$formation_id,$filiere_id,$etudiant_matricule){

            try {
				
				$data = $this->connexion->getDataBase();
                
				
				$condition_1 = 1;
				$condition_2 = 1;
				$condition_3 = 1;
				
				$mysql_data = array();
                $stmt = $this->listeEtudiants($annee_id,$centre_id,$formation_id,$filiere_id,$etudiant_matricule);
                $resultat = $stmt->execute();
								
                if (!$resultat) {
                    $result = 'error';
                    $message = 'query error';

                }
                else {
                    $result = 'success';
                    $message = 'query success';

                    while ($ligne = $stmt->fetch()) {
					
					//$valider_reduction = $this->isReductionValide($ligne['etudiant_id'],$ligne['annee_id']);

					$total_frais = $this->totalFrais( $ligne['etudiant_id'], $ligne['annee_id'], '' );

					$reduction = $this->totalReductions( $ligne['etudiant_id'], $ligne['annee_id'], '', 1);
					//$reduction_a_valider = $this->totalReductions( $ligne['etudiant_id'], $ligne['annee_id'], '', 0);
					
					$total_versement = $this->totalVersements( $ligne['etudiant_id'], $ligne['annee_id'], '' );
					//$total_versement_attente = $this->totalVersementsAttente( $ligne['etudiant_id'], $ligne['annee_id'], '' );
					$reste = $total_frais - $reduction - $total_versement;
					//$total_a_paye = $total_frais - $reduction;
					//$pourcentage_reglement_ = ( $total_versement/$total_a_paye ) * 100;
					$etat = $this->etatPaiement( $ligne['etudiant_id'], $ligne['annee_id'], '' );
					//$commentaires = $this->listesCommentaireVersementsEtudiants ($ligne['etudiant_id'], $ligne['annee_id']);

					
					if($ligne['inscription_active'] == 3){
						$reduction = 0.00;
						$reduction_a_valider = $reduction;
						$total_versement_attente = 0.00;
						$total_frais = $total_versement;
						$total_a_paye = $total_frais - $reduction;
						$reste = $total_frais - $reduction - $total_versement;
						$pourcentage_reglement_ = 100;
						$etat = 1;
					}
					
					//pour widget page acceuil
					//$_SESSION['montant_total'] = $total_versement.' DH';
					//
					
					$mode_de_paeimenet = 'cheque';
					$s = "";
					if($etat == 1)
					{
						$s = "Regle";	
					}
					else{
								$s = "en attente";
						} 
											
						$mysql_data[] = array(
                            "Versement_de" => $ligne['etudiant_nom'].' '.$ligne['etudiant_prenom'],
                            "Mode_de_paiement" => $mode_de_paeimenet,
                            "Montant" => $total_frais,
                            "Reduction" => $reduction,
                            "Versement_total" => $total_versement,
							"Reste" => $reste,
							"Etat" => $s
							
                            
                        );	

					/*if( $etat_reglement == 1 OR $etat_reglement == 2 ){
						if( $etat == $etat_reglement ){
							$condition_2 = 1;
						}
						else{
							$condition_2 = 0;
						}
					}
					else{
						$condition_2 = 1;
					}
					
					if( $pourcentage_reglement != '' ){
						
						if( $pourcentage_reglement_ <= $pourcentage_reglement ){
							$condition_3 = 1;
						}
						else{
							$condition_3 = 0;
						}
						
					}
					*/


                    }

                }
                return $this->connexion->resultatJson($result, $message , $mysql_data );

            }
            catch ( PDOException  $e ){
                echo $e->getMessage();
            }

    }
	/*
	function isReductionValide( $etudiant_id, $annee_id ){
			
			$data = $this->connexion->getDataBase();
			
			try{
			
				$query = "SELECT * FROM inscription_service WHERE etudiant_id = :etudiant_id AND annee_id = :annee_id AND valider_reduction < 1";
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				
				$resultat = $stmt->execute();
				
				if( $stmt->rowCount() > 0 )
					return 0;
				
				return 1;
				
			}
			catch ( Exception  $e ){
				return $e;
			}
			
	}
	*/
	function totalFrais( $etudiant_id, $annee_id, $service_id ){
			
			$data = $this->connexion->getDataBase();
			$frais_montant = 0;
			
			try{
				
				$query = "SELECT a.* FROM ( service a JOIN service_active b ON ( a.service_id = b.service_id AND b.annee_id = :annee_id ) ) JOIN inscription_service c ON ( c.etudiant_id = :etudiant_id AND b.annee_id = c.annee_id AND a.service_id = c.service_id )";
				
				if( is_numeric( $service_id ) ){
					$query .= " WHERE a.service_id = :service_id";
				}
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				
				
				if( is_numeric( $service_id ) ){
					$stmt->bindParam(':service_id', $service_id, PDO::PARAM_INT);
				}
				
				$resultat = $stmt->execute();
				
				while( $ligne = $stmt->fetch() ){
					$frais_montant += $this->serviceFraisInitial( $etudiant_id, $annee_id, $ligne['service_id'] );
				}
				
				return( number_format( $frais_montant, 2, '.', '' ) );
				
			}
			catch ( Exception  $e ){
				return $e;
			}
			
	}
		
	function totalReductions( $etudiant_id, $annee_id, $service_id, $op ){
			
			$data = $this->connexion->getDataBase();
			
			try{
			
				$query = "SELECT IFNULL( SUM( reduction_montant ), 0.00 ) AS reduction_montant FROM inscription_service WHERE etudiant_id = :etudiant_id AND annee_id = :annee_id";
				
				if( is_numeric( $service_id ) ){
					$query .= " AND service_id = :service_id";
				}
				
				if( $op == 1 ){
					$query .= " AND valider_reduction > 0";
				}
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				
				
				if( is_numeric( $service_id ) ){
					$stmt->bindParam(':service_id', $service_id, PDO::PARAM_INT);
				}
				
				$resultat = $stmt->execute();
				
				
				$ligne = $stmt->fetch();
				
				return( number_format( $ligne['reduction_montant'], 2, '.', '' ) );
				
			}
			catch ( Exception  $e ){
				return $e;
			}
			
	}	
	
	function totalVersements ( $etudiant_id, $annee_id, $service_id ){
			
			$data = $this->connexion->getDataBase();
			
			try{
			
				$query = "SELECT IFNULL( SUM( a.versement_montant ), 0.00 ) AS versement_montant FROM versement a WHERE a.etudiant_id = :etudiant_id AND a.annee_id = :annee_id";
				
				if( is_numeric( $service_id ) ){
					$query .= " AND service_id = :service_id";
				}
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				
				if( is_numeric( $service_id ) ){
					$stmt->bindParam(':service_id', $service_id, PDO::PARAM_INT);
				
				}
				
				$resultat = $stmt->execute();
				
				$ligne = $stmt->fetch();
				
				return( number_format( $ligne['versement_montant'], 2, '.', '' ) );
				
			}
			catch ( Exception  $e ){
				return $e;
			}
			
	}
	
	/*
	function totalVersementsAttente ( $etudiant_id, $annee_id, $service_id ){
			
			$data = $this->connexion->getDataBase();

			$date_sys = date("Y-m-d");
			
			try{
			
				$query = "SELECT IFNULL( SUM( versement_montant ), 0.00 ) AS versement_montant FROM versement WHERE etudiant_id = :etudiant_id AND annee_id = :annee_id";
				 
				if( is_numeric( $service_id ) ){
					$query .= " AND service_id = :service_id";
				}
				
					$query .= " AND versement_type = 1 AND ( versement_etat_cheque = 2 OR encaissement_date > ':date_sys')";

				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				
				if( is_numeric( $service_id ) ){
					$stmt->bindParam(':service_id', $service_id, PDO::PARAM_INT);
				}
				
				
				$resultat = $stmt->execute();
				
				$ligne = $stmt->fetch();

				return( number_format( $ligne['versement_montant'], 2, '.', '' ) );
				
			}
			catch ( Exception  $e ){
				return $e;
			}
			
	}
	*/
	function etatPaiement( $etudiant_id, $annee_id, $service_id ){
			
			$data = $this->connexion->getDataBase();
			
			try{
			
				$query = "SELECT * FROM inscription_service WHERE etudiant_id = :etudiant_id AND annee_id = :annee_id";
				
				if( is_numeric( $service_id ) ){
					$query .= " AND service_id = :service_id";
				}
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				
				if( is_numeric( $service_id ) ){
					$stmt->bindParam(':service_id', $service_id, PDO::PARAM_INT);
				}
				
				
				$resultat = $stmt->execute();
				
				if( $stmt->rowCount() == 0 ){
					return 0;
				}
				else{
					return( ( $this->totalFrais( $etudiant_id, $annee_id, $service_id ) - $this->totalReductions( $etudiant_id, $annee_id, $service_id, 1 ) - $this->totalVersements( $etudiant_id, $annee_id, $service_id ) ) <= 5.00 ? 1:2 );
				}
				
			}
			catch ( Exception  $e ){
				return $e;
			}
			
	}
	/*
	function listesCommentaireVersementsEtudiants ( $etudiant_id, $annee_id ){
			
			$data = $this->connexion->getDataBase();

			try{
				
				$commentaire = '';
				
				$query = "SELECT * from inscription_service where etudiant_id = :etudiant_id AND annee_id = :annee_id";
				

				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				
				
				$resultat = $stmt->execute();
				
				$justif=0;
				while($ligne = $stmt->fetch())
				if($ligne['commentaire']!="")
				$commentaire .= ++$justif.")".$ligne['commentaire']."\r\n";
				
				return ( mysql_real_escape_string($commentaire) );
				
			}
			catch ( Exception  $e ){
				return $e;			
			}
			
	}
	*/
	
	function serviceFraisInitial ( $etudiant_id, $annee_id, $service_id ){
			
			$data = $this->connexion->getDataBase();
						
			try{
				
				$query_1 = "SELECT * FROM inscription_filiere WHERE etudiant_id = :etudiant_id AND annee_id = :annee_id AND inscription_active >= 2";
				
				
				$stmt_1 = $data->prepare($query_1);
				$stmt_1->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt_1->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);		
				$resultat_1 = $stmt_1->execute();			
				$ligne_1 = $stmt_1->fetch();
			
				$query_2 = "SELECT an.* FROM ( inscription_filiere a JOIN inscription_service b ON ( a.annee_id = b.annee_id AND a.etudiant_id = b.etudiant_id AND a.etudiant_id = :etudiant_id AND b.service_id = :service_id AND a.filiere_id = 2 AND a.inscription_active >= 2 ) ) JOIN annee_universitaire an ON ( a.annee_id = an.annee_id )";
				$stmt_2 = $data->prepare($query_2);
				$stmt_2->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt_2->bindParam(':service_id', $service_id, PDO::PARAM_INT);		
				$resultat_2 = $stmt_2->execute();			
				$ligne_2 = $stmt_2->fetch();
			
				$query = "SELECT IFNULL( frais_montant, 0.00 ) AS frais_montant FROM filiere_frais WHERE service_id = :service_id AND annee_id = 1 AND filiere_id = 2";
				$stmt = $data->prepare($query);
				$stmt->bindParam(':service_id', $service_id, PDO::PARAM_INT);			
				$resultat = $stmt->execute();			
				$ligne = $stmt->fetch();
				
				return( number_format( $ligne['frais_montant'], 2, '.', '' ) );
				
			}
			catch ( Exception  $e ){
				return $e;
			}
			
	}
	

		/*////////////////////////////////////////////////////////////////////////////////////////////*/
		/*///						Fin Gestion de réglement						///*/
		/*///////////////////////////////////////////////////////////////////////////////////////////*/


		
	}

?>
