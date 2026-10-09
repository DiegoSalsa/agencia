# Home móvil: 3D y resolución Retina

8 de octubre de 2026. Cambios sobre `618e266`, después de actualizar `main` desde el remoto.

La home vuelve a mostrar el isotipo 3D en móvil. Sigue la composición observada en [Resend](https://resend.com/): objeto antes del titular y contenido centrado debajo. Sustituye la decisión de ocultarlo descrita en `mobile-c-implementation.md`.

El renderer anterior limitaba el canvas móvil a DPR 1. En una pantalla DPR 3 se estiraba un buffer con un tercio de la resolución necesaria en cada eje. Ahora el tamaño real del buffer sigue la densidad del dispositivo hasta DPR 3 y un máximo de 1.440.000 píxeles, usando [`setDrawingBufferSize`](https://threejs.org/docs/pages/WebGLRenderer.html#WebGLRenderer.setDrawingBufferSize). En la vista de 390 px, el canvas ocupa 340 × 226,1875 píxeles CSS y renderiza a 1020 × 678 píxeles.

La resolución se actualiza al redimensionar, girar el dispositivo o cambiar su densidad. La pose inicial ya deja ver la extrusión. Se conserva la carga diferida, el límite de 24 fps en móvil/30 en escritorio, la pausa fuera de pantalla o con el documento oculto, y el SVG para movimiento reducido o fallo de carga/WebGL.

También se normalizan los saltos de línea del SVG al calcular su huella en el generador y su prueba: Git lo entrega con CRLF en este Windows y el modelo se generó con LF. No cambian las curvas, el SVG oficial ni el modelo binario.

## Verificación

- Build de producción y TypeScript correctos: 60 páginas generadas.
- `npm run test:home`: 11 pruebas correctas sobre producción; geometría, navegación, contacto, footer y metadatos.
- `npm run test:home:browser`: 6 pruebas correctas sobre producción; resolución, encuadre, movimiento real, pausa/reanudación, DPR sin recargar, orientación, movimiento reducido, fallo de geometría y pérdida del contexto WebGL.
- Tamaños comprobados: 320, 375, 390, 430, 768, 900, 901 y 1440 px; sin desbordamiento horizontal y con un único canvas.
- Revisión de interfaz en producción: oscuro/claro, menú, Escape y devolución del foco, ES/EN y navegación del CTA a Contacto con desmontaje del canvas.
- ESLint focalizado correcto con la configuración `next/core-web-vitals` indicada explícitamente; el repositorio no incluye un archivo de configuración ESLint.

Las comprobaciones se realizaron en Chrome de escritorio con viewport y densidad emulados; falta la comprobación en un teléfono físico. No se midió rendimiento en hardware móvil. Las capturas guardan el consentimiento esencial para mostrar la composición del hero.

Vista local de producción: http://127.0.0.1:3003/.

## Capturas

- [Móvil 390 px, oscuro y DPR 3](mobile-3d/mobile-390-dark.png)
- [Móvil 390 px, claro y DPR 3](mobile-3d/mobile-390-light.png)
- [Móvil 320 px](mobile-3d/mobile-320-dark.png)
- [Menú móvil](mobile-3d/mobile-menu.png)
- [Escritorio](mobile-3d/desktop.png)
