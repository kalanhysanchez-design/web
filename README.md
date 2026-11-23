# Más allá de nosotros

Sitio web del movimiento de impacto social liderado por Kalanhy Esmeralda Gil.
Sitio estático: no necesita instalación ni dependencias.

## Ver en local

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Luego abre http://127.0.0.1:8080. Detén el servidor con Ctrl+C.

## Estructura

- `index.html` — Nosotros (página principal, cinematográfica).
- `trabajo/`, `proposito/`, `tienda/`, `contacto/` — demás pestañas.
- `proyecto.html` + `proyectos.js` — página de cada causa (`proyecto.html?proyecto=1` a `4`) con sus textos.
- `site.css` — diseño compartido (computador y base).
- `mobile.css` — diseño de celular (solo se carga hasta 899 px).
- `site.js` — animaciones, menú, WhatsApp, preguntas frecuentes y video.
- `assets/` — imágenes, logo y video.

## Notas

- El número de WhatsApp está en `site.js` (`WHATSAPP`).
- El modo oscuro se activa automáticamente según el sistema de quien visita.
- Si alguien tiene activado "Reducir movimiento", el sitio se muestra sin animaciones.
- Las imágenes y el video están optimizados para la web (ningún archivo supera el límite de GitHub).
