<?php

require('./conexion.php');

$nombre = $_POST['nombre'];
$puntuacion = $_POST['puntuacion'];

$consulta = "INSERT INTO puntuaciones (nombre, puntuacion) VALUES ('$nombre', '$puntuacion')";

@mysqli_query($conexion,$consulta);

mysqli_close($conexion); 

echo($nombre.", ".$puntuacion);