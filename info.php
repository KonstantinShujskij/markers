<?php 
    require_once "php/connect.php";

    $id = $_GET['id'];
    $marker = R::load('markers', $id);

    $images = json_decode($marker->images);
    $images = $images->list;

    if($marker->visible == 0) { header('Location: index.php'); }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $marker->category; ?> <?php echo $marker->author; ?></title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="css/info.css">
</head>
<body class="light" id="body" lng="<?php echo $marker->lng; ?>" lat="<?php echo $marker->lat; ?>" cat_id="<?php echo $marker->categoryid; ?>">
    <header class="header">
        <div class="logo">
            <div class="logo__text">
                <a href="index.php" class="logo__link">Название</a>
            </div>
        </div>

        <div class="phones">
            <div class="phones__list">
                <a href="tel:+380522279901" class="phones__item">+38 (000) 000-00-00</a>
                <a href="tel:+380522279901" class="phones__item">+38 (000) 000-00-00</a>
            </div>
        </div>
        <button id="theam-btm" class="theam-btm light">
            <img class="moon" src="images/moon.svg" alt="dark">
            <img class="sun" src="images/sun.svg" alt="light">
        </button>
    </header>

    <main class="main">
        <h1 class="title">Метка №<?php echo $id; ?></h1>
        <section class="info">
            <div class="info__left">
                <div class="info__item">
                    <span class="info__title">Категорія метки: </span>
                    <span class="info__text">

                        <a href="../index.php?categoty=<?php echo $marker->categoryid;?>" class="info__link">
                            <?php echo $marker->category; ?>
                        </a>
                    </span>
                </div>
                <div class="info__item">
                    <span class="info__title">Введено в систему: </span>
                    <span class="info__text"><?php echo $marker->date; ?></span>
                </div>
                <div class="info__item">
                    <span class="info__title">Пользовательский адрес: </span>
                    <span class="info__text"><?php echo $marker->user_adres; ?></span>
                </div>
                <div class="info__item">
                    <span class="info__title">Адресс: </span>
                    <span class="info__text"><?php echo $marker->adres; ?></span>
                </div>
                <div class="info__item">
                    <span class="info__title">Дом:</span>
                    <span class="info__text"><?php echo $marker->number; ?>/<?php echo $marker->entrance; ?></span>
                </div>
                <div class="info__item">
                    <span class="info__title">Статус:</span>
                    <span class="info__text"><?php echo $marker->status; ?></span>
                </div>
                <div class="info__item">
                    <span class="info__text">
                        <?php echo $marker->info; ?>
                    </span>
                </div>
            </div>
            <div class="info__right">
                <div class="slider">
                    <div id="slider__img" class="slider__img">
                        <img src="files/<?php echo $images[0]; ?>" alt="img" class="w-100 h-100">
                    </div>
                </div>
            </div>
        </section>

        <section class="map">
            <div id="googlemap" class="google-map"></div>
        </section>

        <footer class="footer">
            <div class="footer__text">
                Любое копивання, в т.ч. отдельных частей текстов или изображений, публикация и републикация, 
                перепечатка или любое другое распространение информации, в какой бы форме и каким бы техническим 
                способом оно не осуществлялось, строго запрещается без предварительного письменного согласия со 
                стороны администрации сайта. При копировании материалов ссылка на источник обязательна. источник: 
                <a href="#" class="footer__link">http://inventory-perspektyva.org/</a>
            </div>
        </footer>
    </main>



    <section id="img-popup" class="popup">
        <div class="popup__body">
            <div id="img-popup-content" class="popup__content create-form">
                <img id="big-img" src="files/<?php echo $images[0]; ?>" alt="img" class="w-100">
            </div>
        </div>
    </section>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGp2RWbdOrgRMzk5Y569J2QHxVoGUwmXo&amp;v=3.exp&amp;libraries=places,geometry&amp;types=establishment"></script>

    <script src="js/settengs.js"></script>
    <script src="js/info.js"></script>
</body>
</html>