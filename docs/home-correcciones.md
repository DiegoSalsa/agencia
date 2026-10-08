# PuroCode — informe de correcciones

Revisión realizada en un worktree aislado, a partir del commit `5fcca07b99713058a1cf325ce07c6ac56ea9b416`, conservando los cambios del Diseño 1. Vista local: http://127.0.0.1:3002/. La publicación en `main` fue autorizada posteriormente a esta revisión.

## 1. Regresiones encontradas

La comparación con el código anterior confirmó pérdidas de opciones del navbar, enlaces y datos del footer, ES/EN, redes flotantes y acceso a Gilberto desde la home. El CTA de WhatsApp había perdido el mensaje precargado. El banner promocional original ya devolvía `null`: no había una promoción visual activa que recuperar. Los precios siguen en Planes, conforme al diseño aprobado.

## 2. Funciones recuperadas

| Elemento | Integración actual |
| --- | --- |
| Navbar | Servicios; Portafolio con Proyectos Web y Labs; Proceso; Planes con Desarrollo y Mantenimiento; FAQ; Contacto; cotización. Menú completo y desplazable en móvil. |
| Footer | Descripción original, Servicios/Contacto/Empresa, correo, teléfono, redes, copyright y enlaces legales. |
| Redes | Instagram `purocodecl`, Facebook `PuroCode.com`, WhatsApp `56949255006`, selector de contacto y volver arriba. |
| Gilberto | Botón original a la derecha, apertura/cierre, mensajes por sesión y transporte a `/api/gilberto`. Escape devuelve el foco. Panel contenido en pantallas pequeñas. |
| Tema e idioma | Persistencia original, oscuro por defecto y ES/EN. La detección de país ya no sobrescribe un idioma elegido explícitamente. |
| Contacto | Formulario de cotización, página Contacto, correo, teléfono y WhatsApp con el texto original. |
| Cookies | Mismos valores `all`/`essential`, almacenamiento, cookie anual y evento `consent-updated`. Aviso en flujo normal y botones de 44 px. |

Toda la home vuelve a Inter, la fuente existente. Se conservan composición, proyectos y espacios; los ajustes en móviles pequeños y bajos despejan el CTA inicial.

## 3. Qué fallaba en el isotipo

La máscara anterior mostraba una silueta incompleta y perdía la C. Las capas CSS no construían una malla extruida real. El movimiento quedaba limitado a escritorio y la forma podía confundirse con una P aproximada.

## 4. Construcción fiel

`scripts/build-brand-model.mjs` procesa las curvas de `public/img/logo.svg`, la transformación original y el hueco de la máscara. Conserva dos contornos independientes y un hueco en la P; no usa trazado manual ni tipografía. El modelo tiene 7.360 vértices, 5.084 triángulos, extrusión de 34 unidades y 237.648 bytes. El fallback conserva esas mismas curvas con `evenodd`, sin máscaras.

El SVG oficial permanece intacto, SHA-256 `aea8acc6fc53bd1d0d36dfffbf5695f5c48381c4599030562fdff1b0772d90d2`.

[Comparación frontal: original, fallback y WebGL](evidence/comparacion-geometria-frontal.jpg).

## 5. Animación verificada

Three.js carga mediante importación dinámica cuando el PC entra en pantalla y no hay preferencia de movimiento reducido. El ciclo sinusoidal de 18 segundos gira aproximadamente ±35,5 grados, manteniendo PC reconocible y sin salto matemático de reinicio. Se limita a 30 fps/DPR 1,5 en escritorio y 24 fps/DPR 1 en móvil; se pausa fuera de pantalla y con el documento oculto. Se liberan los recursos al desmontar y se muestra el fallback ante fallos de WebGL o falta de observadores.

Caras y laterales son negros en claro y lila/púrpura en oscuro. No existen botones de vista frontal ni pausa. El chunk de Three medido ocupa unos 134 kB con gzip y queda diferido; el parser SVG solo se usa durante la generación. No se añade React Three Fiber.

## 6. Capturas finales

| Formato | Oscuro | Claro |
| --- | --- | --- |
| Escritorio | [Captura completa](evidence/desktop-oscuro.jpg) | [Captura completa](evidence/desktop-claro.jpg) |
| Móvil | [Captura completa](evidence/mobile-oscuro.jpg) | [Captura completa](evidence/mobile-claro.jpg) |

[Menú móvil](evidence/menu-mobile.jpg), [chat oscuro](evidence/gilberto-mobile-oscuro.jpg), [chat claro](evidence/gilberto-mobile-claro.jpg).

## 7. Evidencia del movimiento

[Grabación de escritorio, GIF](evidence/desktop-3d.gif) y [grabación móvil, GIF](evidence/mobile-3d.gif).

Cada GIF contiene 72 capturas reales del canvas, en orden y con los intervalos registrados: extractos de 6,96 y 6,39 segundos, reproducidos una vez. No se sintetizaron poses ni fotogramas. El movimiento se observó y el canvas informó `running` en móvil y `paused` fuera de pantalla.

## 8. Resultados de pruebas y SEO

- Build de producción Next 16.1.6 y TypeScript: correctos, 60 páginas generadas. Ruta temporal de comparación retirada.
- Siete pruebas de geometría, huecos, fidelidad, navegación, footer, SSR y metadatos: correctas.
- Catorce destinos originales de navegación/footer: HTTP 200.
- Auditoría estática de título, descripción y canonical: 15 páginas correctas.
- ESLint focalizado en archivos modificados, hooks e imágenes: correcto. El script global falla al usar el comando eliminado `next lint`; limitación preexistente.
- Navegador real a 320, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal. Menú, Escape/foco, tema e idioma persistentes, selector WhatsApp, consentimiento, chat, movimiento y pausa fuera de pantalla revisados.
- El aviso de cookies ocupa espacio antes del hero y no cubre proyectos. No se han cambiado sus valores ni la lógica de analítica.
- Ambos botones de consentimiento se comprobaron tras recargar; `all` activa el inicializador de Analytics y `essential` conserva la opción limitada. Volver arriba llega a `scrollY = 0`. El salto al contenido enfoca `main` y deja el titular debajo del navbar.
- Consola de la home de producción sin errores ni avisos durante la revisión final.

Se instaló y aplicó [seo-audit de Marketing Skills](https://github.com/coreyhaines31/marketingskills/tree/b9ba399dd88b082b926e261e8ccfb843d20aa066/skills/seo-audit), MIT, versión 2.1.0. La revisión considera una agencia chilena con proyectos y productos reales. Los resultados públicos se usaron como indicio de intención comercial; no prueban volúmenes ni posiciones de PuroCode.

| Elemento | Texto final |
| --- | --- |
| H1 | Desarrollo web y software a medida. |
| H2 proyectos | Proyectos web y productos propios. |
| H2 servicios | Servicios de desarrollo. |
| H2 contacto | Hablemos de tu proyecto. |
| H3 proyectos | Puragenda; JuntAPP; Florería Wildgarden. |
| Título | Desarrollo web y software a medida en Chile \| PuroCode |
| Descripción | Desarrollo web y software a medida para empresas en Chile. Creamos sitios web, tiendas online y sistemas de gestión. Conoce nuestros proyectos y cotiza el tuyo. |

La oferta concreta aparece en el H1; Chile, en título, descripción y texto inicial. Las páginas de servicios conservan sus URLs y temas. Canonical y JSON-LD originales de Organization, WebSite y ProfessionalService se comprobaron en el DOM. Se añadió la imagen PNG de marca de 1200 × 630 que faltaba en Open Graph/Twitter.

Título y contenido siguen las [recomendaciones de Google sobre títulos](https://developers.google.com/search/docs/appearance/title-link); la descripción sigue la [guía de snippets](https://developers.google.com/search/docs/appearance/snippet). Las longitudes sugeridas por la skill son orientativas, no garantías de visualización.

## 9. Limitaciones y pendientes

La interfaz y el transporte original de Gilberto están recuperados. Su backend exige `DEEPSEEK_API_KEY`, ausente en este entorno, por lo que no se verificó una respuesta real de IA. No se inventaron respuestas. Los envíos reales y las promociones requieren configuración de correo/base de datos que no acompaña al clon; no se enviaron mensajes a personas ni se alteró la base de datos.

Movimiento reducido, fallo WebGL y pausa de pestaña oculta se revisaron en código; no se emularon esas condiciones. La pausa fuera de pantalla sí se comprobó en ejecución. Los tamaños móviles se probaron en navegador de escritorio, sin teléfono físico. No se afirma una puntuación Lighthouse, Core Web Vitals de producción, indexación ni mejora de rankings.
