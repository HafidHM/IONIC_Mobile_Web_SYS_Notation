<?php


/**************************************************************************
 * Source File	:  Utilisateur.php
 * Author        :  LALAOUI HASSANI Abdellah
 * Modified   	:  03/03/2017
 * Description	:  Definition de la classe LHA
 **************************************************************************/

require_once ( "ConnexionPDO.php" );
require_once ( "Annee.php" );
//require_once ( "../include/functions.php" );

class Utilisateur extends Annee{

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


    function authentification( $login , $password ){

        // $data = $this->connexion->DB;
        $data = $this->connexion->getDataBase();

        try {

            $query = " SELECT * FROM utilisateur WHERE login= :login AND password= :password AND utilisateur_active=1 ";

            $stmt = $data->prepare($query);


            $stmt->bindParam(':login', $login, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);


            $stmt->execute();

            $nombre_ligne = $stmt->rowCount();

            return ( ( $nombre_ligne > 0 )? 1:0 );


        } catch (PDOException  $e) {
            echo $e->getMessage();
        }
    }

    function infoUtilisateur( $login, $password ){


        // $data = $this->connexion->DB;
        $data = $this->connexion->getDataBase();
		
		$stmt1 = $this->anneeActive();
		$stmt1->execute();
		$ligne = $stmt1->fetch();
		$annee_id = $ligne['annee_id'];
		
		
        try {

        $query = "SELECT a.*, b.*, c.*, d.*, e.annee_id, f.filiere_id, f.filiere_intitule, g.formation_id, g.formation_intitule FROM ( ( ( ( ( utilisateur a JOIN profil b ON ( a.profil_id = b.profil_id) ) JOIN etudiant c ON ( a.utilisateur_id = c.utilisateur_id ) ) JOIN centre d ON ( c.centre_id = d.centre_id ) ) JOIN inscription_filiere e ON ( c.etudiant_id = e.etudiant_id AND e.annee_id = :annee_id ) ) JOIN filiere f ON ( e.filiere_id = f.filiere_id ) ) JOIN formation g ON ( f.formation_id = g.formation_id ) WHERE a.login = :login AND a.password = :password AND a.utilisateur_active = 1 ";

            $stmt = $data->prepare($query);


            $stmt->bindParam(':login', $login, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
			$stmt->bindParam(':annee_id', $annee_id, PDO::PARAM_INT);


            return $stmt;

        } catch (PDOException  $e) {
            echo $e->getMessage();
        }
    }


    function modifierInfoConnexion ( $utilisateur_id, $connexion_1, $nombre_connexion ){

        // $data = $this->connexion->DB;
        $data = $this->connexion->getDataBase();

        try {

            $query = " UPDATE utilisateur SET connexion_0 = :connexion_1, connexion_1 = '".date( 'Y-m-d H-i-s' )."', nombre_connexion = :nombre_connexion WHERE utilisateur_id = :utilisateur_id";

            $data->beginTransaction();
            $stmt = $data->prepare($query);


            $stmt->bindParam(':connexion_1', $connexion_1, PDO::PARAM_STR);
            $stmt->bindParam(':nombre_connexion', $nombre_connexion, PDO::PARAM_INT);
            $stmt->bindParam(':utilisateur_id', $utilisateur_id, PDO::PARAM_INT);


            $resultat = $stmt->execute();

            return ( $resultat ? 1:0 );


        } catch (PDOException  $e) {
            $data->rollBack();
            echo $e->getMessage();
        }
    }
	
	/*=========================================================================================================*/
		/*						Modification du mot dupasse pour un utilisateur							*/
		/*========================================================================================================*/
		function modifierUtilisateurPassword ( $utilisateur_id, $password ){
			
			$data = $this->connexion->getDataBase();
			
			try{
				/*
				$password = (crypt( $password ) );
								
				*/
			
				$query = "	UPDATE utilisateur SET
							password = :password WHERE utilisateur_id = :utilisateur_id
						 ";

                $data->setAttribute( PDO::ATTR_AUTOCOMMIT, 0 );
                $data->beginTransaction();

                $stmt = $data->prepare($query);

                $stmt->bindParam(':password', $password, PDO::PARAM_STR);
				$stmt->bindParam(':utilisateur_id', $utilisateur_id, PDO::PARAM_INT);

                $resultat = $stmt->execute();

                $data->commit();
                $data->setAttribute( PDO::ATTR_AUTOCOMMIT, 1 );

                if (!$resultat) {
                    $result = 'error';
                    $message = 'query error';

                } else {
                    $result = 'success';
                    $message = 'query success';
                }
            
				echo $this->connexion->resultatJson($result, $message, '');
			
									
			} 
			catch (PDOException  $e) {
				echo $e->getMessage();
			}
			
		}

/////////////////////////////////////////////////////////////////////////////////////////


   
    function ajouterUtilisateur ( $username,$password ){
          
        $data = $this->connexion->getDataBase();

            $query = "INSERT INTO utilisateur  SET username = :username, password = :password ";
            $stmt = $data->prepare($query);

            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
  
            $resultat = $stmt->execute();


                if (!$resultat) {
                    $result = 'error';
                    $message = 'query error';
                     echo "l'Utilisateur n'est enregistre";

                } else {
                    $result = 'success';
                    $message = 'query success';
                }
            
                echo $this->connexion->resultatJson($result, $message, '');

    }


    function logIn( $username,$password ){
                $data = $this->connexion->getDataBase();

                $query = " SELECT * FROM utilisateur WHERE username= :username AND password= :password ";

                $stmt = $data->prepare($query);


                $stmt->bindParam(':username', $username, PDO::PARAM_STR);
                $stmt->bindParam(':password', $password, PDO::PARAM_STR);


                $resultat =  $stmt->execute();

                $nombre_ligne = $stmt->rowCount();

                if ($nombre_ligne==0) {
                    echo 0;

                } else {

                    echo 1;
                }
        
    }
    






}

?>



