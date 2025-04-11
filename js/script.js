//Constantes para representar direcciones
const ARRIBA = 0;
const ABAJO = 1;
const DERECHA = 2;
const IZQUIERDA = 3;

const VACIO = 0;

const tablero = [];
let direccion = DERECHA;
let nuevaDireccion = DERECHA;
let longitudSerpiente;

function inicio() {
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
        longitudSerpiente = 3;

        console.log(tablero);

        //Añadimos event listener para manejar cuando el usuario pulsa las teclas
        onkeydown = (KeyboardEvent) => {
                cambiarDireccion(KeyboardEvent.code);
        }

        setTimeout(() => {
                actualizarTablero();
        }, 2000);
}

function actualizarTablero() {
        let xCabeza, yCabeza;
        setInterval(() => {
                //Buscamos la cabeza de la serpiente
                for (let i = 0; i < 17; i++) {
                        for (let j = 1; j < 15; j++) {
                                if (tablero[i][j] == 1) {
                                        xCabeza = i;
                                        yCabeza = j;
                                        console.log('cabeza encontrada');
                                        break;
                                }
                        }
                }
                //Buscamos la cola
                for (let i = 0; i < 17; i++) {
                        for (let j = 0; j < 15; j++) {
                                if (tablero[i][j] === longitudSerpiente) {
                                        tablero[i][j] = VACIO;
                                        break;
                                }
                        }
                }

                //Movemos el resto de la serpiente
                for (let i = 0; i < 17; i++) {
                        for (let j = 1; j < 15; j++) {
                                if (tablero[i][j] != VACIO) {
                                        tablero[i][j] = tablero[i][j] + 1;
                                }
                        }
                }

                // Movemos la cabeza
                switch (nuevaDireccion) {
                        case ARRIBA:
                                if (direccion != ABAJO) {
                                        tablero[xCabeza][yCabeza - 1] = 1;
                                        direccion = ARRIBA;
                                } else  {
                                        tablero[xCabeza][yCabeza + 1] = 1;
                                }
                                break;
                        case ABAJO:
                                if (direccion != ARRIBA) {
                                        tablero[xCabeza][yCabeza + 1] = 1;
                                        direccion = ABAJO;
                                } else {
                                        tablero[xCabeza][yCabeza - 1] = 1;
                                }
                                break;
                        case DERECHA:
                                if(direccion != IZQUIERDA) {
                                        tablero[xCabeza + 1][yCabeza] = 1;
                                        direccion = DERECHA;
                                } else {
                                        tablero[xCabeza - 1][yCabeza] = 1;
                                }
                                break;
                        case IZQUIERDA:
                                if(direccion != DERECHA) {
                                        tablero[xCabeza - 1][yCabeza] = 1;
                                        direccion = IZQUIERDA;
                                } else {
                                        tablero[xCabeza + 1][yCabeza] = 1;
                                }
                                break;
                }

                mostrarTablero();
        }, 1000);
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
        }
}

function mostrarTablero() {
        let htmlTablero = '<table>';
        for (let i = 0; i < 15; i++) {
                htmlTablero += '<tr>';
                for (let j = 0; j < 17; j++) {
                        htmlTablero += '<td>' + tablero[j][i] + '</td>';
                }
                htmlTablero += '</tr>';
        }
        htmlTablero += '</table>';
        document.getElementById('tablero').innerHTML = htmlTablero;
}
