<?php 
    require_once "connect.php";
    require_once "config.php";


    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $adres = $_POST['adres'];
    $house_number = $_POST['house_number'];
    $entrance = $_POST['entrance'];
    $coment = $_POST['coment'];
    $category = $_POST['category'];
    $file_count = $_POST['file_count'];
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $user_adres = $_POST['user_adres'];

    if($file_count > 0) {
        $img_names = array();
        $imgs = '{  "list": ['; 
    
        for($i = 0; $i < $file_count; $i++) {
            if ( 0 == $_FILES['file' . $i]['error'] ) {
                $temp_img = $i . '' . time() . $_FILES['file' . $i]['name'];     
                move_uploaded_file($_FILES['file' . $i]['tmp_name'], '../files/' . $temp_img); 
                if(count($img_names) != 0) { $imgs .= ","; }
                $imgs .= ' "' . $temp_img . '"';
                $img_names[] = $temp_img;
            }
        }
        
        $imgs .= ']}';  
              
    }

    if(in_array($category, $name_categories)) {
        exit('Такой категории не существует');
    }

    if(preg_match('/(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/', $phone, $matches) == 0) {
        exit('Неверный телефон');
    }

    $marker = R::dispense('markers');

    $marker->author = $name;
    $marker->phone = $phone;
    $marker->category = $name_categories[$category];
    $marker->categoryid = $category;
    $marker->info = $coment;
    $marker->title = substr($coment, 0, 65);
    $marker->number = $house_number;
    $marker->entrance = $entrance;
    $marker->images = $imgs;
    $marker->lat = $lat;
    $marker->lng = $lng;
    $marker->date = date("Y-m-d H:i:s");
    $marker->adres = $adres;
    $marker->status = 'Проходит модерацию';
    $marker->visible = 0;
    $marker->user_adres = $user_adres;

    R::store($marker);

    $message =  'Автор: ' . $name . "\n";
    $message .= 'Телефон: ' . $phone . "\n";
    $message .= 'Номер метки: ' . $marker->id . "\n";
    $message .= 'Дата добавления: ' . $marker->date . "\n";
    $message .= 'Маркер: ' . $adres . "\n";
    $message .= 'Адресс: ' . $user_adres . "\n";

    mail('dopemail228@gmail.com', 'Запрос на поддтверждение маркера', $message);

    exit('ok');
?>