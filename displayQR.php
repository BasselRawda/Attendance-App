<?php
    require 'connect.php';
    include 'QR_BarCode.php';
    $qr = new QR_barCode();
    $qr->url('https://www.google.com.lb/');
    $qr->qrCode(500,'img/qr-image.png');
    $qr->qrCode(500);
    header( "refresh:10;url=afterLogin.php");
 ?>
