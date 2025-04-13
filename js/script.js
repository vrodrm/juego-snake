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
let tiempo;

function inicio() {
        // Llenamos el tablero de ceros (VACIO)
        for (let i = 0; i < 17; i++) {
                tablero[i] = [];
                for (let j = 0; j < 15; j++) {
                        tablero[i][j] = VACIO;
                }
        }

        //Añadimos event listener para manejar cuando el usuario pulsa las teclas
        onkeydown = (KeyboardEvent) => {
                cambiarDireccion(KeyboardEvent.code);
        }

        colorearTablero();

        // Colocamos la serpiente
        // El 1 es la cabeza de la serpiente
        tablero[2][7] = 3;
        tablero[3][7] = 2;
        tablero[4][7] = 1;
        document.getElementById('img2-7').src = '../assets/img/cola.png';
        document.getElementById('img3-7').src = '../assets/img/cuerpo.png';
        document.getElementById('img4-7').src = '../assets/img/cabeza.png';
        longitudSerpiente = 3;

        colocarEstrella(); 

        setTimeout(() => {
                actualizarTablero();
        }, 300);
}

function actualizarTablero() {
        let xCabeza, yCabeza;
        let nuevaX, nuevaY;
        tiempo = setInterval(() => {
                //Buscamos la cabeza de la serpiente
                for (let i = 0; i < 17; i++) {
                        for (let j = 1; j < 15; j++) {
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
                                        document.getElementById('img' + i + '-' + j).src = '';
                                        break;
                                }
                        }
                }

                // Buscamos la nueva cola y la pintamos
                for (let i = 0; i < 17; i++) {
                        for (let j = 0; j < 15; j++) {
                                if (tablero[i][j] === longitudSerpiente - 1) {
                                        document.getElementById('img' + i + '-' + j).src = '../assets/img/cola.png';
                                        break;
                                }
                        }
                }

                //Movemos el resto de la serpiente
                for (let i = 0; i < 17; i++) {
                        for (let j = 1; j < 15; j++) {
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
                                        document.getElementById('img' + xCabeza + '-' + yCabeza).src = '../assets/img/cuerpo.png';
                                        document.getElementById('img' + xCabeza + '-' + (yCabeza - 1)).src = '../assets/img/cabeza.png';
                                        direccion = ARRIBA;
                                } else {
                                        nuevaX = xCabeza;
                                        nuevaY = yCabeza + 1;
                                        document.getElementById('img' + xCabeza + '-' + yCabeza).src = '../assets/img/cuerpo.png';
                                        document.getElementById('img' + xCabeza + '-' + (yCabeza + 1)).src = '../assets/img/cabeza.png';
                                }
                                break;
                        case ABAJO:
                                if (direccion != ARRIBA) {
                                        nuevaX = xCabeza;
                                        nuevaY = yCabeza + 1;
                                        document.getElementById('img' + xCabeza + '-' + yCabeza).src = '../assets/img/cuerpo.png';
                                        document.getElementById('img' + xCabeza + '-' + (yCabeza + 1)).src = '../assets/img/cabeza.png';
                                        direccion = ABAJO;
                                } else {
                                        nuevaX = xCabeza;
                                        nuevaY = yCabeza - 1;
                                        document.getElementById('img' + xCabeza + '-' + yCabeza).src = '../assets/img/cuerpo.png';
                                        document.getElementById('img' + xCabeza + '-' + (yCabeza - 1)).src = '../assets/img/cabeza.png';
                                }
                                break;
                        case DERECHA:
                                if (direccion != IZQUIERDA) {
                                        nuevaX = xCabeza + 1;
                                        nuevaY = yCabeza;
                                        document.getElementById('img' + xCabeza + '-' + yCabeza).src = '../assets/img/cuerpo.png';
                                        document.getElementById('img' + (xCabeza + 1) + '-' + yCabeza).src = '../assets/img/cabeza.png';
                                        direccion = DERECHA;
                                } else {
                                        nuevaX = xCabeza - 1;
                                        nuevaY = yCabeza;
                                        document.getElementById('img' + xCabeza + '-' + yCabeza).src = '../assets/img/cuerpo.png';
                                        document.getElementById('img' + (xCabeza - 1) + '-' + yCabeza).src = '../assets/img/cabeza.png';
                                }
                                break;
                        case IZQUIERDA:
                                if (direccion != DERECHA) {
                                        nuevaX = xCabeza - 1;
                                        nuevaY = yCabeza;
                                        document.getElementById('img' + xCabeza + '-' + yCabeza).src = '../assets/img/cuerpo.png';
                                        document.getElementById('img' + (xCabeza - 1) + '-' + yCabeza).src = '../assets/img/cabeza.png';
                                        direccion = IZQUIERDA;
                                } else {
                                        nuevaX = xCabeza + 1;
                                        nuevaY = yCabeza;
                                        document.getElementById('img' + xCabeza + '-' + yCabeza).src = '../assets/img/cuerpo.png';
                                        document.getElementById('img' + (xCabeza + 1) + '-' + yCabeza).src = '../assets/img/cabeza.png';
                                }
                                break;
                }

                
                if (tablero[nuevaX][nuevaY] == -1) {
                        tablero[nuevaX][nuevaY] = 1;
                        longitudSerpiente++;
                        colocarEstrella();
                } else {
                        tablero[nuevaX][nuevaY] = 1;
                }

        }, 100);
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
                console.log(tiempo);
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
                imagen = document.createElement('img');
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
        tablero[x][y] = -1;
        document.getElementById('img' + x + '-' + y).src = '../assets/img/estrella.svg';
}