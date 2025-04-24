<?php
//nombre del schema
$base = "vrodr_snake";

$tabla = "puntuaciones";

//conexión a la base de datos
$conexion = @new mysqli("mysql-vrodr.alwaysdata.net", "vrodr", "basededatos123", $base);

if (!$conexion) {
  exit;
}

// para evitar problemas con acentos configuramos las querys de esta manera 
$conexion->query("SET NAMES 'utf8'");