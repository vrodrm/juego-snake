//Constantes para representar direcciones
const ARRIBA = 0;
const ABAJO = 1;
const DERECHA = 2;
const IZQUIERDA = 3;

const VACIO = 0;
const ESTRELLA = -1;

const tablero = [];
let direccion = DERECHA;
let nuevaDireccion = DERECHA;
let longitudSerpiente;
let tiempo;


// Rutas de las imagenes para cargarlas desde js
const imagenes = {
    cuerpoHorizontal: './assets/img/cuerpo_horizontal.png',
    cuerpoVertical: './assets/img/cuerpo_vertical.png',
    cabezaArriba: './assets/img/cabeza_arriba.png',
    cabezaAbajo: './assets/img/cabeza_abajo.png',
    cabezaIzquierda: './assets/img/cabeza_izquierda.png',
    cabezaDerecha: './assets/img/cabeza_derecha.png',
    colaDerecha: './assets/img/cola-derecha.png',
    colaArriba: './assets/img/cola-arriba.png',
    colaAbajo: './assets/img/cola-abajo.png',
    colaIzquierda: './assets/img/cola-derecha.png',
    giroArribaDerecha: './assets/img/giro_arriba_derecha.png',
    giroArribaIzquierda: './assets/img/giro_arriba_izquierda.png',
    giroAbajoDerecha: './assets/img/giro_abajo_derecha.png',
    giroAbajoIzquierda: './assets/img/giro_abajo_izquierda.png',
    estrella: './assets/img/estrella.svg'
};

// Función para cargar las imagenes desde js
// Lo que hace esta función es que cada imagen se cargue en el DOM
// de manera "invisible" para que al usarla luego no tenga que volver a pedir la imagen al servidor
function precargarImagenes() {
    for (let key in imagenes) {
        const img = new Image();
        img.src = imagenes[key];
    }
}

function evitarScroll() {
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
}

function recuperarPuntuaciones() {
    $.ajax({
        url: "php/recuperar_puntuaciones.php"
    }).done(function(datos) {
        let puntuaciones = JSON.parse(datos);
        document.getElementById('contenedor-tabla-puntuaciones').appendChild(crearTablaPuntuaciones(puntuaciones));
    });
}

// Función que crea una tabla de las puntuaciones
function crearTablaPuntuaciones(puntuaciones) {
    let tabla = document.createElement('table');
    tabla.id = 'tabla-puntuaciones';

    //Creamos la cabecera
    let cabecera = tabla.insertRow();
    let columnas = ['', 'Nombre', 'Puntuacion']
    columnas.forEach(columna => {
        let celda = document.createElement('th');
        celda.textContent = columna;
        cabecera.appendChild(celda);
    });

    let puesto = 1;
    puntuaciones.forEach(puntuacion => {
        let fila = tabla.insertRow();

        let celdaPuesto = fila.insertCell();
        celdaPuesto.textContent = '#' + puesto;

        let celdaNombre = fila.insertCell();
        celdaNombre.textContent = puntuacion.nombre;

        let celdaPuntuacion = fila.insertCell();
        celdaPuntuacion.textContent = puntuacion.puntuacion;

        puesto++;
    });

    return tabla;
}


function inicio() {
    recuperarPuntuaciones();
    precargarImagenes();

    //Añadimos event listener para manejar cuando el usuario pulsa las teclas
    onkeydown = (KeyboardEvent) => {
        cambiarDireccion(KeyboardEvent.code);
    }

    colorearTablero();

    situacionInicialTablero();

    setTimeout(() => {
        actualizarTablero(100);
    }, 1000);
}

function situacionInicialTablero() {
    // Llenamos el tablero de ceros (VACIO)
    for (let i = 0; i < 17; i++) {
        tablero[i] = [];
        for (let j = 0; j < 15; j++) {
            tablero[i][j] = VACIO;
        }
    }

    // Colocamos la serpiente
    // El 1 es la cabeza de la serpiente
    tablero[2][7] = 3;
    tablero[3][7] = 2;
    tablero[4][7] = 1;
    document.getElementById('img2-7').className = 'cola-derecha';
    document.getElementById('img3-7').className = 'cuerpo-horizontal';
    document.getElementById('img4-7').className = 'cabeza-derecha';
    longitudSerpiente = 3;

    colocarEstrella();
}

function entrarTablero() {
    document.getElementById('titulo').className = 'salir';
    document.getElementById('tablero').className = 'entrar';
    inicio();
}

function entrarPuntuaciones() {
    document.getElementById('titulo').className = 'salir-izquierda';
    document.getElementById('puntuaciones').className = 'entrar';

    recuperarPuntuaciones();
}

function salirPuntuaciones() {
    document.getElementById('titulo').className = 'entrar-izquierda';
    document.getElementById('puntuaciones').className = 'salir';

    //Eliminamos la tabla puntuaciones
    document.getElementById('tabla-puntuaciones').remove();
}

function actualizarTablero(velocidadMilisegundos) {
    let xCabeza, yCabeza;
    let nuevaX, nuevaY;
    tiempo = setInterval(() => {
        //Buscamos la cabeza de la serpiente
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 15; j++) {
                if (tablero[i][j] == 1) {
                    xCabeza = i;
                    yCabeza = j;
                    break;
                }
            }
        }

        //Buscamos la cola
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 15; j++) {
                if (tablero[i][j] === longitudSerpiente) {
                    tablero[i][j] = VACIO;
                    document.getElementById('img' + i + '-' + j).className = 'vacio';
                    break;
                }
            }
        }

        // Buscamos la nueva cola y la pintamos
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 15; j++) {
                if (tablero[i][j] === longitudSerpiente - 1) {
                    //Buscamos la direccion hacia la que pintar la cola

                    //Izquierda
                    if (i != 0 && tablero[i - 1][j] == longitudSerpiente - 2) {
                        document.getElementById('img' + i + '-' + j).className = 'cola-izquierda';
                    }
                    //Derecha
                    else if (i != 16 && tablero[i + 1][j] == longitudSerpiente - 2) {
                        document.getElementById('img' + i + '-' + j).className = 'cola-derecha';
                    }
                    //Abajo
                    else if (j != 14 && tablero[i][j + 1] == longitudSerpiente - 2) {
                        document.getElementById('img' + i + '-' + j).className = 'cola-abajo';
                    }
                    //Arriba
                    else if (j != 0 && tablero[i][j - 1] == longitudSerpiente - 2) {
                        document.getElementById('img' + i + '-' + j).className = 'cola-arriba';
                    }
                    break;
                }
            }
        }

        //Movemos el resto de la serpiente
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 15; j++) {
                if (tablero[i][j] > VACIO) {
                    tablero[i][j] = tablero[i][j] + 1;
                }
            }
        }

        // Movemos la cabeza
        switch (nuevaDireccion) {
            case ARRIBA:
                if (direccion != ABAJO) {
                    nuevaX = xCabeza;
                    nuevaY = yCabeza - 1;
                    comprobarLimites(nuevaX, nuevaY);
                    if (direccion == IZQUIERDA) {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'giro-arriba-derecha';
                    } else if (direccion == DERECHA) {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'giro-arriba-izquierda';
                    } else {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'cuerpo-vertical';
                    }
                    document.getElementById('img' + xCabeza + '-' + (yCabeza - 1)).className = 'cabeza-arriba';
                    direccion = ARRIBA;
                } else {
                    nuevaX = xCabeza;
                    nuevaY = yCabeza + 1;
                    comprobarLimites(nuevaX, nuevaY);
                    document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'cuerpo-vertical';
                    document.getElementById('img' + xCabeza + '-' + (yCabeza + 1)).className = 'cabeza-abajo';
                }
                break;
            case ABAJO:
                if (direccion != ARRIBA) {
                    nuevaX = xCabeza;
                    nuevaY = yCabeza + 1;
                    comprobarLimites(nuevaX, nuevaY);
                    if (direccion == IZQUIERDA) {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'giro-abajo-derecha';
                    } else if (direccion == DERECHA) {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'giro-abajo-izquierda';
                    } else {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'cuerpo-vertical';
                    }
                    document.getElementById('img' + xCabeza + '-' + (yCabeza + 1)).className = 'cabeza-abajo';
                    direccion = ABAJO;
                } else {
                    nuevaX = xCabeza;
                    nuevaY = yCabeza - 1;
                    comprobarLimites(nuevaX, nuevaY);
                    document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'cuerpo-vertical';
                    document.getElementById('img' + xCabeza + '-' + (yCabeza - 1)).className = 'cabeza-arriba';
                }
                break;
            case DERECHA:
                if (direccion != IZQUIERDA) {
                    nuevaX = xCabeza + 1;
                    nuevaY = yCabeza;
                    comprobarLimites(nuevaX, nuevaY);
                    if (direccion == ARRIBA) {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'giro-abajo-derecha';
                    } else if (direccion == ABAJO) {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'giro-arriba-derecha';
                    } else {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'cuerpo-horizontal';
                    }
                    document.getElementById('img' + (xCabeza + 1) + '-' + yCabeza).className = 'cabeza-derecha';
                    direccion = DERECHA;
                } else {
                    nuevaX = xCabeza - 1;
                    nuevaY = yCabeza;
                    comprobarLimites(nuevaX, nuevaY);
                    document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'cuerpo-horizontal';
                    document.getElementById('img' + (xCabeza - 1) + '-' + yCabeza).className = 'cabeza-izquierda';
                }
                break;
            case IZQUIERDA:
                if (direccion != DERECHA) {
                    nuevaX = xCabeza - 1;
                    nuevaY = yCabeza;
                    comprobarLimites(nuevaX, nuevaY);
                    if (direccion == ARRIBA) {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'giro-abajo-izquierda';
                    } else if (direccion == ABAJO) {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'giro-arriba-izquierda';
                    } else {
                        document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'cuerpo-horizontal';
                    }
                    document.getElementById('img' + (xCabeza - 1) + '-' + yCabeza).className = 'cabeza-izquierda';
                    direccion = IZQUIERDA;
                } else {
                    nuevaX = xCabeza + 1;
                    nuevaY = yCabeza;
                    comprobarLimites(nuevaX, nuevaY);
                    document.getElementById('img' + xCabeza + '-' + yCabeza).className = 'cuerpo-horizontal';
                    document.getElementById('img' + (xCabeza + 1) + '-' + yCabeza).className = 'cabeza-derecha';
                }
                break;
        }

        // Comprobamos si hay una estrella
        if (tablero[nuevaX][nuevaY] == ESTRELLA) {
            tablero[nuevaX][nuevaY] = 1;
            longitudSerpiente++;
            colocarEstrella();
        } else {
            // Comprobamos si nos hemos chocado
            if (tablero[nuevaX][nuevaY] != VACIO) {
                clearInterval(tiempo);
                gameOver();
            }
            tablero[nuevaX][nuevaY] = 1;
        }
    }, velocidadMilisegundos);
}

function comprobarLimites(x, y) {
    if (x > 16 || x < 0 || y > 14 || y < 0) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(tiempo);
    alert('Game Over');
}

function cambiarDireccion(codigoTecla) {
    if (codigoTecla === 'ArrowUp' || codigoTecla === 'KeyW') {
        nuevaDireccion = ARRIBA;
    } else if (codigoTecla === 'ArrowDown' || codigoTecla === 'KeyS') {
        nuevaDireccion = ABAJO;
    } else if (codigoTecla === 'ArrowRight' || codigoTecla === 'KeyD') {
        nuevaDireccion = DERECHA;
    } else if (codigoTecla === 'ArrowLeft' || codigoTecla === 'KeyA') {
        nuevaDireccion = IZQUIERDA;
    } else if (codigoTecla === 'Space') {
        clearInterval(tiempo);
    }
}

// Función para colorear el tablero y asignar imagenes a las casillas
function colorearTablero() {
    let color = true;
    let x = 0, y = 0;
    let imagen;
    document.querySelectorAll('.casilla').forEach((casilla) => {
        if (color) {
            casilla.style.backgroundColor = '#141D73';
        } else {
            casilla.style.backgroundColor = '#464180';
        }
        imagen = document.createElement('div');
        imagen.className = 'imagen-serpiente';
        imagen.style.margin = 0;
        imagen.style.padding = 0;
        imagen.id = 'img' + x + '-' + y;
        casilla.appendChild(imagen);
        x++;
        if (x == 17) {
            x = 0;
            y++;
        }
        color = !color;
    });
}

function colocarEstrella() {
    let x = Math.floor(Math.random() * 17);
    let y = Math.floor(Math.random() * 15);
    while (tablero[x][y] != VACIO) {
        x = Math.floor(Math.random() * 17);
        y = Math.floor(Math.random() * 15);
    }
    tablero[x][y] = ESTRELLA;
    document.getElementById('img' + x + '-' + y).className = 'estrella';
}
