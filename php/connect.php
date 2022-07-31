<?php
    require "rb.php";
    // Параметры подключения к базе данных: хост, имя БД, имя пользователя, пароль
    R::setup( 'mysql:host=127.0.0.1;dbname=markers', 'root', '' );

    if( !R::testConnection() ) {
        exit(' Упс.. Что-то пошло не так...');
    }
