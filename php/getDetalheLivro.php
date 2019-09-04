<?php
header('Content-type: application/json');
session_start();
include_once("database.php");

$indice = $_POST['buscar'];

$query = "SELECT * FROM list_livro where idlivro = '$indice'";

$exe_query = mysqli_query($conn, $query);

while($result = mysqli_fetch_assoc($exe_query)){
    $detalhe[] = array_map('utf8_encode',$result);
}

$conn->close();

echo json_encode($detalhe);