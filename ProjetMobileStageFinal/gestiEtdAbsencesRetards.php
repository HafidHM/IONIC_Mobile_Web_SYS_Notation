<?php
	/*
	error_reporting(0);
	session_start();
*/
header("Access-Control-Allow-Origin");
	require_once( "AbsenceRetard.php" );
	session_start();
	extract( $_POST, EXTR_OVERWRITE );
	extract( $_GET, EXTR_OVERWRITE );
	
  

	/*======================================= Gestion des AbsencesRetards ======================================*/
	$absenceRetard = new AbsenceRetard();

	if( $func == 'listeEtudiantsAbsences' ) echo $absenceRetard->listeEtudiantsAbsencesJSON ( 1,1,1,2,'DN11978' );
	elseif( $func == 'listeAbsencesEtudiant' ) echo $absenceRetard->listeAbsencesEtudiantJSON ($user, 15 );
	elseif( $func == 'listeEtudiantsRetards' ) echo $absenceRetard->listeEtudiantsRetardsJSON (1,1,1,2,'DN11978' );
	elseif( $func == 'listeRetardsEtudiant' ) echo $absenceRetard->listeRetardsEtudiantJSON ($user, 15);


	unset( $absenceRetard );
	/*========================================= Fin Gestion AbsencesRetards ==========================================*/
	
?>
