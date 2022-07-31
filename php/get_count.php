<?php 
    require_once "connect.php";
    require_once "config.php";

    $markers = R::findAll( 'markers', 'ORDER BY date DESC' );
 
    $count = 0;
    $date = date("Y-m-d");

    foreach($markers as $marker) {
        if(substr($marker->date, 0, 10) == $date) {
            $count++;
        }
    }

    echo $count;
    exit();
?>