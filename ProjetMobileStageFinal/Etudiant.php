<?php
	

	/*
	require_once ( "vuesSQL.php" );
	
	require_once ( "../include/functions.php" );*/
	header("Access-Control-Allow-Origin");
	
	require_once ( "ConnexionPDO.php" );
	
	class Etudiant {
		
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
		/*				 Cette fonction donne la liste des étudiants inscrit aux modules			*/
		/*				 on fonction de diferent critères								*/
		/*=========================================================================================*/
		function listeEtudiants( $annee_id,$centre_id,$formation_id,$filiere_id,$etudiant_matricule ){
			
			$data = $this->connexion->getDataBase();
			
			try {
									
										
							$query = "	SELECT DISTINCT a.*, b.*, d.*, e.*, f.* , an.* 
									FROM 
											
												
													(
														(
															(
																
																	(
																		
																			etudiant a
																			
																		JOIN centre b ON ( a.centre_id = b.centre_id AND b.centre_id = :centre_id )
																	)
																	
																JOIN inscription_filiere d ON ( a.etudiant_id = d.etudiant_id )
															)
															JOIN filiere e ON ( d.filiere_id = e.filiere_id AND e.filiere_id = :filiere_id )
														)
														JOIN formation f ON ( e.formation_id = f.formation_id AND f.formation_id = :formation_id )
													)
													JOIN annee_universitaire an ON ( d.annee_id = an.annee_id AND an.annee_id = :annee_id )
													
									WHERE a.etudiant_matricule like :etudiant_matricule	
								";
										
				
				$stmt = $data->prepare($query);

				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				$stmt->bindParam(':centre_id', $centre_id, PDO::PARAM_INT);
				$stmt->bindParam(':formation_id', $formation_id, PDO::PARAM_INT);
				$stmt->bindParam(':filiere_id', $filiere_id, PDO::PARAM_INT);
				$stmt->bindParam(':etudiant_matricule', $etudiant_matricule, PDO::PARAM_STR);
				
              //  $resultat = $stmt->execute();

                return $stmt;

            }
            catch ( PDOException  $e ){
                echo $e->getMessage();
            }
			
		}
		
		/////////////////////// Chargé photo etudiant ///////////////////////////
		
		function etudiantPhoto( $etudiant_id ){
		
				$mysql_data = array();
				
				if( is_numeric( $etudiant_id ) ){
					
					if( file_exists( "../photos/$etudiant_id.png" ) == 1 ) {
						$photo = "$etudiant_id.png"; 
						$result = 'success';
						$message = 'query success';
						
					}
					else  {
						$photo = "0.png";
						$result = 'success';
						$message = 'query error';
					}
				}
				else{
					$photo = "0.png";
					$result = 'success';
					$message = 'query error';
				}
				
				$mysql_data[] = array(
                            "photo" => $photo
                );
				
			echo $this->connexion->resultatJson($result, $message , $mysql_data );

		}
		
//////////////////////////////////////////////////////		
}
?>
