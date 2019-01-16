<?php
require 'connect.php';




    if(isset($_POST["LogIn"]) && !empty($_POST["username"]) && !empty($_POST["password"])){
        $username = $_POST["username"];
        $password = $_POST["password"];
        $query = $db->query("SELECT * FROM logininfo WHERE username = '$username' AND password = '$password'");
        $count=0;
        session_start();
        foreach($query as $row){
            $count++;
            $_SESSION['id'] = $row["id"];
        }
        if($count >0){
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;
            header("location:afterLogin.php");

        }else{
            header("Location: failedLogin.php");
        }
    }else{
        header("Location: failedLogin.php");
    }


?>
