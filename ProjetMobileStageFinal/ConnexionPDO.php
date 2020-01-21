<?php

/**
 * Created by PhpStorm.
 * User: lha
 * Date: 25/01/17
 * Time: 23:53
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header("Content-type: applications/json; charset=utf-8");

class ConnexionPDO extends PDO
{
    private $dbtype = "mysql";
    private $dbhost = "localhost";
    private $dbname = "isga";
    private $dbuser = "root";
    private $dbpass = "";
    private $erreur = "";
    private $db;
    public $conn;

    public function __construct()
    {

        if (!$this->conn) {
            try {
                $this->db = new PDO('mysql:host=' . $this->dbhost . ';dbname=' . $this->dbname, $this->dbuser, $this->dbpass);
                $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->db->exec('SET NAMES utf8');
                $this->conn = true;
            } catch (PDOException $e) {
                $this->erreur = $e->getMessage();
                $this->conn = false;
            }
        } else {
            $this->conn = true;
        }
    }

    public function getDataBase()
    {
        return $this->db;
    }

    public function getErreur()
    {
        die($this->erreur);
    }

    public function close()
    {
        $this->db = null;
    }

    function resultatJson($result, $message , $mysql_data = array()){
            // Prepare data
        $data = array(
        "result" => $result,
        "message"=> $message,
        "data" => $mysql_data
        );

        // Convert PHP array to JSON array[]
        echo json_encode($data);
    }

}

?>
