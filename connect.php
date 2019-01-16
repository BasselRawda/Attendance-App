<?php
try {

  $host = "localhost";
  $username = "root";
  $password = "";
  $database = "attendance";

    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


} catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}
?>
