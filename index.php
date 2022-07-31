<?php
    require_once "php/config.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markers</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="css/style.css">
</head>
<body id="body" class="light">
    <header class="header">
        <button id="burger-btn" class="burger-btn">
            <div class="burger-btn__inner">
                <div class="burger-btn__item"></div>
                <div class="burger-btn__item"></div>
                <div class="burger-btn__item"></div>
            </div>            
        </button>

        <div class="logo">
            <div class="logo__text">Название</div>
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
        <section class="map">
            <div id="googlemap" class="google-map"></div>

            <button id="create-btn" class="create-btn">Добавить маркер</button>
        </section>
        <aside id="aside" class="aside">
            <div id="marker-list" class="marker-list">
                
            </div>

            <div class="counter">
                <div class="counter__item">
                    <div class="counter__inner-item">
                        <div class="counter__img">
                            <img src="images/checked.svg" alt="ico">
                        </div>
                        <div class="counter__value">
                            <span id="counter-markers"></span>
                        </div>
                    </div>
                    <span class="counter__title">Проверено</span>
                </div>
                <div class="counter__item">
                    <div class="counter__inner-item">
                        <div class="counter__img">
                            <img src="images/calendar.svg" alt="ico">
                        </div>
                        <div class="counter__value">
                            <span id="counter-count"></span>
                        </div>
                    </div>
                    <span class="counter__title">За сегодня</span>
                </div>
            </div>
        </aside>
    </main>

    <footer class="footer">
        <div class="footer__text">
            Любое копивання, в т.ч. отдельных частей текстов или изображений, публикация и републикация, 
            перепечатка или любое другое распространение информации, в какой бы форме и каким бы техническим 
            способом оно не осуществлялось, строго запрещается без предварительного письменного согласия со 
            стороны администрации сайта. При копировании материалов ссылка на источник обязательна. источник: 
            <a href="#" class="footer__link">http://inventory-perspektyva.org/</a>
        </div>
    </footer>

    <section id="create-popup" class="popup">
        <div class="popup__body">
            <div id="create-popup-content" class="popup__content create-form">
                <div class="mini-map">
                    <div id="mini-goglemap" class="google-map"></div>                    
                </div>
                <div class="create-form__form">
                    <div class="create-form__item">
                        <label class="create-form__label">
                            <span>ФИО*:</span>
                            <input id="name" class="create-form__input" type="text" autocomplete="off" placeholder="Иванов Иван Иванович">
                        </label>
                        
                        <label class="create-form__label">
                            <span>Номер телефону*:</span>
                            <input id="phone" class="create-form__input" type="text" autocomplete="off" placeholder="Номер телефону">
                        </label>
                    </div>
                    <div class="create-form__item">
                        <label class="create-form__label">
                            <span>Категория*:</span>
                            <div class="create-form__select">
                                <select id="category" class="create-form__input ">
                                    <?php
                                        foreach($name_categories as  $key => $value) {
                                            echo '<option value="' . $key . '">' . $value . '</option>';
                                        }
                                    ?>
                                </select>
                                <span class="arrow-icon">
                                    <img src="images/arrow.svg" alt=">">
                                </span>
                            </div>                            
                        </label>
                    </div>
                    <div class="create-form__item">
                        <label class="create-form__label">
                            <span>Маркер:</span>
                            <input id="adres" class="create-form__input"  type="text" autocomplete="off" placeholder="Маркер">
                        </label>
                    </div>                    
                    <div class="create-form__item">
                        <label class="create-form__label">
                            <span>Номер дома*:</span>
                            <input id="house-number" class="create-form__input"  type="text" autocomplete="off" placeholder="Номер дома">
                        </label>
                        <label class="create-form__label">
                            <span>Подъезд:</span>
                            <input id="entrance" class="create-form__input"  type="text" autocomplete="off" placeholder="Подъезд">
                        </label>
                    </div>
                    <div class="create-form__item">
                        <label class="create-form__label">
                            <span>Адрес*:</span>
                            <input id="user-adres" class="create-form__input" type="text" autocomplete="off" placeholder="Адрес">
                        </label>
                    </div>
                    <div class="create-form__item">
                        <label class="create-form__label">
                            <span>Фото:</span>
                            <input id="phots" class="create-form__input" type="file">
                        </label>
                    </div>
                    <div class="create-form__item">
                        <label class="create-form__label">
                            <span>Описание*:</span>
                            <textarea id="coment" class="create-form__input" rows="4" autocomplete="off" placeholder="Ваш коментарий..."></textarea>
                        </label>
                    </div>

                    <button id="submit-btn" class="submit-btn">Отправить!</button>
                </div>
            </div>
        </div>
    </section>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzpRgH2LRFTDYcpQIi6BFy-PSQ76mbU5k&amp;v=3.exp&amp;libraries=places,geometry&amp;types=establishment"></script>
    <script src="js/markerclusterer.js"></script>

    <script src="js/jquery.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="js/settengs.js"></script>
    <script src="js/script.js"></script>
</body>
</html>