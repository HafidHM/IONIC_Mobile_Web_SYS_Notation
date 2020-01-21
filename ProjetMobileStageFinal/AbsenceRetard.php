<?php
	

	
	
	//require_once ( "vuesSQL.php" );
	header("Access-Control-Allow-Origin");
	require_once ( "ConnexionPDO.php" );
	require_once ( "Etudiant.php" );
	//require_once ( "../include/functions.php" );
	
	class AbsenceRetard extends Etudiant {
		
		/*////////////////////////////////////////////////////////////////////////////////////////////*/
		/*///						Gestion des absences							///*/
		/*///						étudiants									///*/
		/*///////////////////////////////////////////////////////////////////////////////////////////*/

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
		/*					 Cette fonction le total des absences 							*/
		/*				 	pour un étudiant (justifiées/non justifiées)						*/
		/*=========================================================================================*/
		function totalAbsencesEtudiant ( $etudiant_id, $annee_id, $justification ){
			
			$data = $this->connexion->getDataBase();
						
			
			try{
				
				$query = "SELECT IFNULL( SEC_TO_TIME( SUM( TIME_TO_SEC( b.seance_h_fin ) - TIME_TO_SEC( b.seance_h_debut ) ) ), '00:00:00' ) AS total_absences FROM etudiant_absence a JOIN seance_etudiant b ON ( a.seance_id = b.seance_id AND a.etudiant_id = :etudiant_id AND b.annee_id = :annee_id ) WHERE 1";
				
				/* modifier par lha le but : justifier absence avec un nouveau champ */
				if( $justification == 1 ){//pour absence justifiée
					//$query .= " AND a.justification <> ''";
					$query .= " AND a.justifier = 1";
				}
				elseif( $justification == 2 ){//pour absence non justifiée
					$query .= " AND a.justifier = 0";
				}
				elseif( $justification == 3 ){
					$query .= "";
				}
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
						
				$resultat = $stmt->execute();
				$ligne = $stmt->fetch();
				return $ligne['total_absences'];
				
			}
			catch ( PDOException  $e ){
				echo $e->getMessage();
			}
			
		}
		
		/*=========================================================================================*/
		/*					 Cette fonction retourn la liste des absences 					*/
		/*				 	pour un étudiant (justifiées/non justifiées)	 					*/
		/*=========================================================================================*/
		
		function listeAbsencesEtudiantJSON ( $etudiant_id, $annee_id ){
				
				$data = $this->connexion->getDataBase();
				
			try {
				
				$mysql_data = array();
                $stmt = $this->listeAbsencesEtudiant ( $etudiant_id, $annee_id );
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
							"seance_id" => $ligne['seance_id'],
                            "Seance_type" => $ligne['type_intitule'],
                            "Matiere" => $ligne['matiere_intitule'],   //error
                            "Date" => $ligne['seance_date'],
                            "Justification" => $ligne['justification'],
							"Heure_debut" => $ligne['seance_h_debut'],
							"Heure_fin" => $ligne['seance_h_fin'],
							"La_duree" => $ligne['duree']						
                        );
					
					}
				
					return $this->connexion->resultatJson($result, $message , $mysql_data );
				
				}
			}
			catch ( PDOException  $e ){
				echo $e->getMessage();
			}
			
		}
		
		/*=========================================================================================*/
		/*					 Cette fonction retourn la liste des absences 					*/
		/*				 	pour un étudiant (justifiées/non justifiées)						*/
		/*=========================================================================================*/
		
		function listeAbsencesEtudiant ( $etudiant_id, $annee_id ){
			
			$data = $this->connexion->getDataBase();
			
			
			try{
				
				$query = "SELECT a.etudiant_id, a.justification, a.justifier, b.*, c.matiere_intitule, c.matiere_description, IFNULL( SEC_TO_TIME( TIME_TO_SEC( b.seance_h_fin ) - TIME_TO_SEC( b.seance_h_debut ) ), '00:00:00' ) AS duree, d.type_intitule FROM ( ( etudiant_absence a JOIN seance_etudiant b ON ( a.seance_id = b.seance_id AND a.etudiant_id = :etudiant_id AND b.annee_id = :annee_id ) ) JOIN matiere c ON ( b.matiere_id = c.matiere_id ) ) JOIN seance_type d ON ( b.type_id = d.type_id ) WHERE 1";
				
								
				
				$query .= " order by seance_date ASC";
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
						
				return $stmt;
				
			}
							
			catch ( PDOException  $e ){
				echo $e->getMessage();
			}
			
		}
		
			
		
		/*=========================================================================================*/
		/*					 Cette fonction le total des absences 							*/
		/*				 	pour un étudiant (justifiées/non justifiées)						*/
		/*=========================================================================================*/
		function totalRetardsEtudiant ( $etudiant_id, $annee_id, $justification ){
			
			$data = $this->connexion->getDataBase();
						
			try{
				
				$query = "SELECT IFNULL( SEC_TO_TIME( SUM( TIME_TO_SEC( a.retard ) ) ), '00:00:00' ) AS total_retards FROM etudiant_retard a JOIN seance_etudiant b ON ( a.seance_id = b.seance_id AND a.etudiant_id = :etudiant_id AND b.annee_id = :annee_id ) WHERE 1";
				
				/* modifier par lha le but : justifier absence avec un nouveau champ */
				if( $justification == 1 ){//pour retard justifiée
					//$query .= " AND a.justification <> ''";
					$query .= " AND a.justifier = 1";
				}
				elseif( $justification == 2 ){//pour retard non justifiée
					$query .= " AND a.justifier = 0";
				}
				elseif( $justification == 3 ){
					$query .= "";
				}

				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
						
				$resultat = $stmt->execute();
				$ligne = $stmt->fetch();
				return $ligne['total_retards'];
				
			}
			catch ( PDOException  $e ){
				echo $e->getMessage();
			}
			
		}
		
		/*=========================================================================================*/
		/*					 Cette fonction retourn la liste des retards	 					*/
		/*				 	pour un étudiant (justifiées/non justifiées)	 XML					*/
		/*=========================================================================================*/
		function listeRetardsEtudiantJSON ( $etudiant_id, $annee_id ){
			
	
			$data = $this->connexion->getDataBase();
				
			try {
				
				$mysql_data = array();
                $stmt = $this->listeRetardsEtudiant ( $etudiant_id, $annee_id );
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
							"seance_id" => $ligne['seance_id'],
                            "Seance_type" => $ligne['type_intitule'],
                            "Matiere" => $ligne['matiere_intitule'],
                            "Date" => $ligne['seance_date'],
                            "Justification" => $ligne['justification'],
							"Heure_debut" => $ligne['seance_h_debut'],
							"Heure_fin" => $ligne['seance_h_fin'],
							"La_duree" => $ligne['duree']						
                        );
					
					}
				
					return $this->connexion->resultatJson($result, $message , $mysql_data);
				
				}
			}
			catch ( PDOException  $e ){
				echo $e->getMessage();
			}
			
		}
		
		/*=========================================================================================*/
		/*					 Cette fonction retourn la liste des retards	 					*/
		/*				 	pour un étudiant (justifiées/non justifiées)						*/
		/*=========================================================================================*/
		function listeRetardsEtudiant ( $etudiant_id, $annee_id ){
			
			$data = $this->connexion->getDataBase();

			
			try{
				
				$query = "SELECT a.etudiant_id, a.retard AS duree, a.justification, a.justifier, b.*, c.matiere_intitule, c.matiere_description, d.type_intitule FROM ( ( etudiant_retard a JOIN seance_etudiant b ON ( a.seance_id = b.seance_id AND a.etudiant_id = :etudiant_id AND b.annee_id = :annee_id ) ) JOIN matiere c ON ( b.matiere_id = c.matiere_id ) ) JOIN seance_type d ON ( b.type_id = d.type_id ) WHERE 1";
				
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':etudiant_id', $etudiant_id, PDO::PARAM_INT);
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
						
				return $stmt;
				
			}
			catch ( PDOException  $e ){
				echo $e->getMessage();
			}
			
		}
		/*////////////////////////////////////////////////////////////////////////////////////////////*/
		/*///						Fin Gestion des absences						///*/
		/*///////////////////////////////////////////////////////////////////////////////////////////*/		
		
	}

?>
