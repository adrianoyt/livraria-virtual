<?php
header('Content-type: application/json');
header('Content-Type: text/html; charset=utf-8');

session_start();

include_once('database.php');

$titulo = utf8_decode($_POST['titulo_l']);
$autor = utf8_decode($_POST['autor_l']);
$editora = utf8_decode($_POST['editora_l']);
$edicao = utf8_decode($_POST['edicao_l']);
$pags = filter_input(INPUT_POST,'pags_l',FILTER_SANITIZE_NUMBER_INT);
$sinopse = utf8_decode($_POST['sinopse_l']);
$idioma = utf8_decode($_POST['idioma_l']);
$categoria = utf8_decode($_POST['categoria_l']);

$pesquisa = "SELECT * FROM list_livro where titulo = '$titulo' and autor = '$autor'";

$livro = mysqli_query($conn, $pesquisa);

if($results = mysqli_fetch_assoc($livro)){
    $query = "call atualiza_livro ({$results['idlivro']},'$titulo', '$autor', '$editora','$edicao', '$pags', '$sinopse','$idioma','$categoria')";

    $alterar = mysqli_query($conn, $query);

    if($alterar == true){
        echo (json_encode('alterado'));
    }
    else{
        echo (json_encode('erro'));
    }
}
else{
    echo (json_encode('erro'));
}

$conn->close();