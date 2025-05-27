# Serpiente Espacial Devoraestrellas

¡Bienvenido a Serpiente Espacial Devoraestrellas! Un juego tipo Snake ambientado en el espacio, donde tu objetivo es devorar estrellas y conseguir la mayor puntuación posible.

## Características
- Tablero de juego tipo Snake clásico.
- Interfaz moderna y responsiva.
- Sonidos y gráficos personalizados.
- Guardado y consulta de puntuaciones usando PHP y MySQL.
- Compatible con dispositivos móviles y escritorio.

## Estructura del proyecto
```
├── index.html                # Página principal del juego
├── favicon.ico               # Icono del sitio
├── css/
│   └── estilos.css           # Estilos personalizados
├── js/
│   ├── jquery-3.7.1.min.js   # Librería jQuery
│   └── script.js             # Lógica del juego
├── assets/
│   ├── img/                  # Imágenes del juego
│   └── audio/                # Efectos de sonido
├── php/
│   ├── conexion.php          # Conexión a la base de datos
│   ├── recuperar_puntuaciones.php # Recupera puntuaciones
│   └── registrar_puntuacion.php   # Registra puntuaciones
```

## Instalación y uso
1. Clona o descarga este repositorio en tu servidor local (por ejemplo, XAMPP).
2. Asegúrate de tener PHP y MySQL funcionando.
3. Crea la base de datos y la tabla `puntuaciones` con la siguiente estructura:

```sql
CREATE TABLE puntuaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(20) NOT NULL,
  puntuacion INT NOT NULL
);
```
4. Configura los datos de acceso a la base de datos en `php/conexion.php`.
5. Abre `index.html` en tu navegador para jugar.

## Controles
- **Teclado:** Usa las teclas W (arriba), A (izquierda), S (abajo), D (derecha) o las flechas.
- **Móvil:** Usa los botones en pantalla para controlar la serpiente.

## Créditos
- Desarrollado por Vicente Rodríguez Manjón.
- Gráficos y sonidos personalizados.

## Licencia
Este proyecto es de uso libre para fines educativos y personales.
