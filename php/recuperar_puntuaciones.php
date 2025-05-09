<?php

require('./conexion.php');

$consulta = 'SELECT * FROM puntuaciones ORDER BY puntuacion DESC LIMIT 100';

$resultado = mysqli_query($conexion, $consulta);

$filas = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

echo json_encode($filas);
