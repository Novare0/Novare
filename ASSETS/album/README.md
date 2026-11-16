# Novare Album Assets

Aquí van los archivos multimedia de las publicaciones del Álbum.

## Estructura sugerida

```
ASSETS/
└── album/
    ├── signal-lost/
    │   ├── cover.jpg
    │   └── full.jpg
    ├── motion-test-01/
    │   ├── cover.jpg
    │   └── video.mp4
    └── sound-study-01/
        ├── cover.jpg
        └── audio.mp3
```

Después registra cada publicación en `JS/album-data.js` dentro del arreglo `window.NOVARE_ALBUM`.

Campos:
- `id`: identificador único.
- `title`: título visible.
- `description`: descripción breve.
- `category`: `visuals`, `motion`, `sound`, `digital` o una categoría nueva.
- `date`: fecha en formato `YYYY-MM-DD`.
- `type`: `image`, `video`, `audio` o `embed`.
- `cover`: ruta de la portada.
- `media`: ruta del archivo principal (puede ser igual a cover).

El sitio es estático: sube los archivos al repositorio y edita el arreglo para publicar. No requiere panel ni base de datos. Para embeds externos, usa únicamente URLs HTTPS de YouTube, YouTube NoCookie o Vimeo.
