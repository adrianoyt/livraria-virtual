<?php
header('Content-type: application/json');

include_once("database.php");

$query = "SELECT * FROM list_categoria";

$exe_query = mysqli_query($conn, $query);

while($result = mysqli_fetch_assoc($exe_query)){
    $categorias[] = array_map('utf8_encode',$result);
}

$conn->close();

echo json_encode($categorias);