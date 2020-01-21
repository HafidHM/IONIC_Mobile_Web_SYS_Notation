<?php

	require_once ( "ConnexionPDO.php" );
	//require_once ( "../include/functions.php" );
	
	class Annee {
		
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
		/*////////////////////////////////////////////////////////////////////////////////////////////*/
		/*///																///*/
		/*///						Gestion des années							///*/
		/*///																///*/
		/*///////////////////////////////////////////////////////////////////////////////////////////*/

		////////////////////////////////////////////////
		function anneeActive(){
			
			$data = $this->connexion->getDataBase();
			
			try{
				
				$query = "SELECT * FROM annee_universitaire WHERE annee_active=1 ";
				
				$stmt = $data->prepare($query);
				
				return ( $stmt );
				
			}
			catch ( PDOException  $e ){
                echo $e->getMessage();
            }
			
		}
						
		/*////////////////////////////////////////////////////////////////////////////////////////////*/
		/*///						Fin Gestion des années							///*/
		/*///////////////////////////////////////////////////////////////////////////////////////////*/
	
	}
?>
