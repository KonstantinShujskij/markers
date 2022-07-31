<?php 
    require_once "connect.php";
    require_once "config.php";

    $category = $_POST['category'];

    $resault = [];


    if($category == 'all') {
        $markers = R::findAll( 'markers', 'visible = ?', array(1));
    }
    else {
        $markers = R::findAll('markers', 'visible = ? AND categoryid = ? ', array(1, $category));
    }

    foreach($markers as $marker) {
        $resault[$marker->categoryid][] = $marker->export();
    }

    echo json_encode($resault);
    exit();
?>