<?php
header('Content-type: application/json');
header('Content-Type: text/html; charset=utf-8');
session_start();

include_once('database.php');

$titulo = utf8_decode($_POST['titulo_l']);
$autor = utf8_decode($_POST['autor_l']);

$pesquisa = "SELECT * FROM list_livro where titulo = '$titulo' and autor = '$autor'";

$livro = mysqli_query($conn, $pesquisa);

if($results = mysqli_fetch_assoc($livro)){
    $query = "call remove_livro ('{$results['idlivro']}')";

    $excluir = mysqli_query($conn, $query);

    if($excluir == true){
        echo (json_encode('deletado'));
    }
    else{
        echo (json_encode('erro'));
    }
}
else{
    echo (json_encode('inexistente'));
}

$conn->close();