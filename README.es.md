<div align="center">

<img src="https://raw.githubusercontent.com/Nephrite-theme/web/main/public/logo.svg" alt="Logo de Nephrite" width="72" height="72">

# Nephrite para Spotify

[English](README.md) · **Español**

Un tema sereno, inspirado en el jade, para [Spotify](https://www.spotify.com), en tres sabores. Hecho para [Spicetify](https://spicetify.app).

[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-3db87a)](LICENSE.es.md)
[![Paleta](https://img.shields.io/badge/paleta-Nephrite-1f6b45)](https://github.com/Nephrite-theme/palette)

</div>

## Sabores

| Sabor | Colores usados | Para |
| --- | --- | --- |
| **Forest** | <img src="assets/forest.svg" alt="Muestras de Forest" width="300"> | Oscuro y profundo, para la noche |
| **Jade** | <img src="assets/jade.svg" alt="Muestras de Jade" width="300"> | Oscuro con más verde, para jornadas largas |
| **Mint** | <img src="assets/mint.svg" alt="Muestras de Mint" width="300"> | Claro y ligero, para el día |

## Instalación

Spotify no admite temas por sí solo, así que Nephrite usa [Spicetify](https://spicetify.app), una herramienta de la comunidad que personaliza la app de escritorio. Primero [instala Spicetify](https://spicetify.app/docs/getting-started).

### Desde el Marketplace de Spicetify

Abre la pestaña **Marketplace** en la barra lateral de Spotify, busca **Nephrite** y haz clic en **Install**. Luego elige un sabor en el menú de esquemas de color del tema.

### A mano

1. Descarga este repositorio y copia la carpeta `Nephrite` en la carpeta de temas de Spicetify:
   - Windows: `%APPDATA%\spicetify\Themes\`
   - macOS y Linux: `~/.config/spicetify/Themes/`
2. Aplícalo, cambiando `Forest` por `Jade` o `Mint` para otro sabor:

   ```sh
   spicetify config current_theme Nephrite color_scheme Forest
   spicetify apply
   ```

Para cambiar de sabor más tarde, ejecuta los mismos comandos con otro esquema de color. Para quitar el tema, ejecuta `spicetify restore`.

Las actualizaciones de Spotify pueden deshacer los cambios de Spicetify. Si el tema desaparece después de una actualización, ejecuta `spicetify backup apply`.

## Colores

Todos los colores vienen de la [paleta Nephrite](https://github.com/Nephrite-theme/palette), asignados a Spotify por rol:

| Superficie de Spotify | Color de la paleta |
| --- | --- |
| Vista principal | `base` |
| Biblioteca lateral y barra del reproductor | `mantle` |
| Tarjetas, filas al pasar el mouse, menús | `surface0`, `surface1` cuando están elevadas |
| Texto principal | `text` |
| Texto secundario | `subtext` |
| Botón de reproducir, barra de progreso, canciones que te gustan | `jade`, `mint` al presionar |
| Controles desactivados | `overlay0` |
| Notificaciones y errores | `sapphire` y `garnet` |

## Desarrollo

`Nephrite/color.ini` y las muestras de `assets/` se generan, así que no los edites a mano. Para aplicar cambios de la paleta:

```sh
node scripts/sync-palette.mjs   # descarga el palette.json más reciente
node scripts/build.mjs          # regenera color.ini
```

`Nephrite/user.css` tiene las pocas reglas que las variables de color no alcanzan. Le da estilo a elementos y no a los nombres de clase de Spotify, que cambian a menudo. Node 18 o superior, sin dependencias.

## Contribuir

¿Encontraste un color que choca, o una parte de Spotify que el tema no cubre? [Abre un issue](https://github.com/Nephrite-theme/spotify/issues/new/choose) con una captura. Para saber cómo se construyen y revisan los ports de Nephrite, lee la [guía de contribución](https://github.com/Nephrite-theme/.github/blob/main/CONTRIBUTING.es.md).

## Agradecimientos

Creado y mantenido por [@ingfranciscastillo](https://github.com/ingfranciscastillo). Los colaboradores aparecerán aquí a medida que crezca la comunidad.

## Más Nephrite

Nephrite también está disponible para Chrome, Firefox, VS Code y siete terminales. Mira todas las apps en [getnephrite.dev/es/ports](https://getnephrite.dev/es/ports).
