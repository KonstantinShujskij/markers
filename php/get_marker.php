<?php 
    require_once "connect.php";
    require_once "config.php";

    $id = $_POST['id'];

    $marker = R::load('markers', $id);

    echo json_encode($marker->export());

    exit();
?>