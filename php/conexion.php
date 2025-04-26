<?php
//nombre del schema
$base = "vrodr_snake";

$tabla = "puntuaciones";

//conexión a la base de datos
$conexion = @new mysqli("mysql-vrodr.alwaysdata.net", "vrodr", ")QSlCLV4E/_Ka0UG", $base);

if (!$conexion) {
  exit; 
} else {
        echo 'episto';
}

$conexion->query("SET NAMES 'utf8'");