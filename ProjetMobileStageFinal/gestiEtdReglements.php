<?php
  header("Access-Control-Allow-Origin");
	// error_reporting(0);
	 session_start();


	require_once( "Reglement.php" );



	extract( $_POST, EXTR_OVERWRITE );
	extract( $_GET, EXTR_OVERWRITE );
	
	/*======================================= Gestion des Reglements ======================================*/
	$reglement = new Reglement();
	
	if( $func == 'listeEtudiantsReglement' ) echo $reglement->listeEtudiantsReglementJSON( 15,1,1,1,'M511264');
	

	if( $func == 'listeVersements' )  echo $reglement->listeVersementsJSON($user, 15, 1);

	unset( $reglement );
	/*========================================= Fin Gestion Reglements ==========================================*/
	
?>
