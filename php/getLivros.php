<?php
header('Content-type: application/json');
header('Content-Type: text/html; charset=utf-8');

session_start();
include_once("database.php");

$indice = $_POST['buscar'];

$query = "SELECT * FROM list_livro where autor like '%$indice%' or titulo like '%$indice%' or nm_categoria like '%$indice%'";

$exe_query = mysqli_query($conn, $query);

while ($result = mysqli_fetch_assoc($exe_query)) {
    $livros[] = array_map("utf8_encode", $result);
}

$conn->close();
echo (json_encode($livros));
