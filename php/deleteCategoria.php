<?php
header('Content-type: application/json');
header('Content-Type: text/html; charset=utf-8');
session_start();

include_once('database.php');

$categoria = filter_input(INPUT_POST,'categoria_l',FILTER_SANITIZE_STRING);

$pesquisa = "SELECT * FROM categoria where nm_categoria = '$categoria'";

$categorias= mysqli_query($conn, $pesquisa);

if($results = mysqli_fetch_assoc($categorias)){
    $query = "call remove_categoria ('{$results['idcategoria']}')";

    $remover = mysqli_query($conn, $query);

    if($remover == true){
        echo (json_encode('removido'));
    }
    else{
        echo (json_encode('erro'));
    }
}
else{
    echo (json_encode('inexistente'));
}

$conn->close();