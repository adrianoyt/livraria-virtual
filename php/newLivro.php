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

$pesquisa = "SELECT 1 as ok FROM list_livro where titulo = '$titulo' and autor = '$autor'";

$livro = mysqli_query($conn, $pesquisa);

$results = mysqli_fetch_assoc($livro);

if($results['ok'] == 1){
    echo (json_encode('existe'));
}
else{
    $query = "call new_livro ('$titulo', '$autor', '$editora','$edicao', '$pags', '$sinopse','$idioma','$categoria')";

    $cadastrar = mysqli_query($conn, $query);

    if($cadastrar == true){
        echo (json_encode('cadastrado'));
    }
    else{
        echo (json_encode('erro'));
    }
}

$conn->close();