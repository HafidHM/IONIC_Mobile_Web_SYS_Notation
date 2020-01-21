<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header("Content-type: applications/json; charset=utf-8");

	error_reporting(1);
	session_start();
	

	require_once( "Utilisateur.php" );

	extract( $_POST, EXTR_OVERWRITE );
	extract( $_GET, EXTR_OVERWRITE );


	/*======================================= Gestion des Utilisateurs ======================================*/
	$utilisateur = new Utilisateur();







	
	if( $func == 'authentification' ){
	
		//session_start();
		
	
	
		$_SESSION['login'] = $login;
	
		$_SESSION['password'] = $password;
		$_SESSION['time'] = time();
		$_SESSION['tentative']++;
		
		$_SESSION['authentification'] = $utilisateur->authentification( $_SESSION['login'], $_SESSION['password'] );
		
		if( $_SESSION['authentification'] == 1 ){



			$stmt = $utilisateur->infoUtilisateur( $_SESSION['login'], $_SESSION['password'] );
			$stmt->execute();
			$ligne = $stmt->fetch();
			
			$_SESSION['niveau_intitule'] = '5ILM';
			
				$_SESSION['utilisateur_name'] = $ligne['etudiant_nom']." ".$ligne['etudiant_prenom'];
				$_SESSION['etudiant_id'] = $ligne['etudiant_id'];
				$_SESSION['etudiant_matricule'] = $ligne['etudiant_matricule'];
				$_SESSION['filiere_id'] = $ligne['filiere_id'];
				$_SESSION['filiere_intitule'] = $ligne['filiere_intitule'];
				$_SESSION['formation_id'] = $ligne['formation_id'];
				$_SESSION['formation_intitule'] = $ligne['formation_intitule'];
				
				$stmt1 = $utilisateur->anneeActive();
				$stmt1->execute();
				$ligne1 = $stmt1->fetch();
				
				$_SESSION['annee_intitule'] = $ligne1['annee_intitule'];

			$utilisateur->modifierInfoConnexion( $ligne['utilisateur_id'], $ligne['connexion_1'], $ligne['nombre_connexion']++ );
		
			//echo 1;



            echo $utilisateur->connexion->resultatJson('success', 'query success', '');


        }
		else{
			
			if( $_SESSION['tentative'] >= 4200 ){
			
				$_SESSION['authentification'] = 0;
				$_SESSION['login'] = '';
				$_SESSION['password'] = '';
				$_SESSION['connect'] = '';
				//echo 2;
                echo $utilisateur->connexion->resultatJson('attempt', 'query attempt', '');


            }
			else{
				
                echo $utilisateur->connexion->resultatJson('error', 'query error', '');
				//echo 0;
			}
			
		}
		
	}
	
	if( $func == 'deconnexion' ){

		session_unset();
		session_destroy();
        echo $utilisateur->connexion->resultatJson('success', 'query success', '');
    }
	
	if( $func == 'page' ){
	
		session_start();
			

		
		$_SESSION['page'] = $page;
		$_SESSION['droit'] = $droit;

        echo 1;
	}

	if( $func == 'addUser' ){
	
		    session_start();
			$postjson = json_decode(file_get_contents('php://input'));   
			$array = get_object_vars($postjson);
			$username = $array['username'];
			$password = md5($array['password']);

			$utilisateur->ajouterUtilisateur($username, $password);

	}

	if( $func == 'logIn' ){
			
		    session_start();
			$postjson = json_decode(file_get_contents('php://input'));   
			$array = get_object_vars($postjson);
			$username = $array['username'];
			$password = md5($array['password']);

			$utilisateur->logIn($username, $password);

	}


	
	if( $func == 'modifierUtilisateurPassword' )  echo $utilisateur->modifierUtilisateurPassword ( 1, $password );

	unset( $utilisateur );
	/*============================ Fin Gestion des Utilisateurs ==============================*/
	
?>
