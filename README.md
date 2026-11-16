# Novare® — Digital Creative Lab

Sitio estático publicado con GitHub Pages: https://novare0.github.io/Novare/

## Estructura
- `index.html`: inicio.
- `servicios.html`: servicios creativos.
- `productos.html`: catálogo y consultas.
- `album.html`: archivo creativo.
- `contacto.html`: formulario de contacto (FormSubmit).
- `404.html`: página para rutas no encontradas.
- `CSS/style.css`: sistema visual, responsive y temas.
- `JS/main.js`: navegación, modales, filtros, Álbum y tema.
- `JS/album-data.js`: publicaciones del Álbum.
- `ASSETS/album/`: portadas y medios del Álbum.
- `ASSETS/images/favicon.svg`: favicon de Novare.

## Publicar una pieza en el Álbum
1. Sube los medios a una carpeta dentro de `ASSETS/album/`.
2. Añade un objeto a `window.NOVARE_ALBUM` en `JS/album-data.js`.
3. Usa una categoría existente (`visuals`, `motion`, `sound`, `digital`) o una categoría nueva.
4. Usa `image`, `video`, `audio` o `embed` como tipo.
5. Para contenido incrustado, utiliza URLs HTTPS de YouTube, YouTube NoCookie o Vimeo.

El archivo no contiene piezas de muestra inventadas: el contenido publicado debe corresponder a trabajos o experimentos aprobados por Novare.

## Contacto
El formulario utiliza FormSubmit y envía a `novareestudio@gmail.com`. El servicio externo gestiona el envío; no se almacenan mensajes en este repositorio.

## Desarrollo
No requiere instalación ni proceso de compilación. Es HTML, CSS y JavaScript estático.
