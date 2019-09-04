<?php

    $host = "localhost";
    $port = 3306;
    $user = "root";
    $password = "";
    $dbname = "clig";

    $conn = new mysqli($host, $user, $password, $dbname, $port)
        or die('Erro ao conectar ao banco de dados' . mysqli_connect_error());
