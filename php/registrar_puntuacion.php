<?php

require('./conexion.php');

$nombre = $_POST['nombre'];
$puntuacion = $_POST['puntuacion'];

$existeNombre = "SELECT * FROM puntuaciones WHERE nombre = '$nombre'";

$resultado = @mysqli_query($conexion, $existeNombre);

if (mysqli_num_rows($resultado) == 0) {

    $consulta = "INSERT INTO puntuaciones (nombre, puntuacion) VALUES ('$nombre', '$puntuacion')";

    @mysqli_query($conexion, $consulta);

    mysqli_close($conexion);

    echo 0;

} else {

    //Si la puntuacion que ya tenia el usuario es mayor que la que está registrando, no hacemos nada
    $fila = mysqli_fetch_assoc($resultado);

    if ($fila["puntuacion"] >= $puntuacion) {

        mysqli_close($conexion);

        echo 1;

    } else {
        
        $consulta = "UPDATE puntuaciones SET puntuacion = $puntuacion WHERE nombre = '$nombre'";

        @mysqli_query($conexion, $consulta);

        mysqli_close($conexion);

        echo 0;

    }
}
