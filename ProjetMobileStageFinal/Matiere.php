<?php
	
	/**************************************************************************
	* Source File	:  Matiere.php
	* Author        :  TeggoInfo
	* Modified   	:  26/01/2009
	* Description	:  Definition of the class Matiere
	**************************************************************************/
	
	
	//require_once ( "vuesSQL.php" );
	require_once ( "ConnexionPDO.php" );
	//require_once ( "../include/functions.php" );
	
	class Matiere {
		
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

		
		/////////////////////////// matières /////////////////////
		function listeMatieres ( $annee_id, $module_id, $active, $op = ""){
			
			$data = $this->connexion->getDataBase();
			$where = 1;
			
			try{
				
				if( !is_numeric( $annee_id ) AND !is_numeric( $module_id ) ){
					$where = 0;
				}
				
				if( !is_numeric( $annee_id ) ){
					$annee_id = 0;
				}
				
				if( !is_numeric( $module_id ) ){
					$module_id = 0;
				}
				
				$query_ponderation = "SELECT a.*, b.categorie_intitule FROM matiere_ponderation a , seance_categorie b WHERE a.seance_categorie = b.categorie_ordre AND annee_id = :annee_id";
				$query = "SELECT DISTINCT a.*, b.module_intitule, b.module_description, c.annee_id, c.matiere_heures, c.matiere_coefficient, c.matiere_active, c.seance_categorie, c.categorie_intitule FROM ( matiere a JOIN module b ON ( a.module_id = b.module_id ) ) LEFT JOIN ( $query_ponderation ) c ON ( a.matiere_id = c.matiere_id  ) WHERE $where AND b.module_id = :module_id";
				
				if( $active == 1 ){
					$query .= " AND c.matiere_active = 1";
				}

				if( !is_numeric( $op ) ){
					$query .= " AND c.seance_categorie = 1";
				}

				if( $op == 1){
					$query .= " AND c.seance_categorie > 1";
				}

				
				$query .= " ORDER BY a.matiere_intitule, a.matiere_description";
				
				$stmt = $data->prepare($query);
				
				$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);
				$stmt->bindParam(':module_id', $module_id, PDO::PARAM_INT);
				
				//$resultat = $stmt->execute();
				
				
				return ( $stmt );
				
			}
			catch ( Exception  $e ){
				return $e;
			}
			
		}
				
		/*////////////////////////////////////////////////////////////////////////////////////////////*/
		/*///					Fin Gestion des Matières							///*/
		/*///////////////////////////////////////////////////////////////////////////////////////////*/

	}

?>
