<?php
header('Content-type: application/json');
header('Content-Type: text/html; charset=utf-8');
session_start();

include_once('database.php');

$categoria = utf8_decode($_POST['categoria_l']);

$pesquisa = "SELECT 1 as ok FROM list_categoria where nm_categoria = '$categoria'";

$livro = mysqli_query($conn, $pesquisa);

$results = mysqli_fetch_assoc($livro);

if($results['ok'] == 1){
    echo (json_encode('existe'));
}
else{
    $query = "call new_categoria ('$categoria')";

    $cadastrar = mysqli_query($conn, $query);

    if($cadastrar == true){
        echo (json_encode('cadastrado'));
    }
    else{
        echo (json_encode('erro'));
    }
}

$conn->close();