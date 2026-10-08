# Home PuroCode — implementación vigente

La home conserva la composición del Diseño 1: hero con PC a la derecha, Puragenda destacado, JuntAPP y Florería Wildgarden, tres servicios y contacto minimalista. Las últimas instrucciones del usuario sustituyen Instrument Serif por Inter y el titular anterior por «Desarrollo web y software a medida».

Navbar, footer, ES/EN, cotización, redes, contacto y Gilberto están recuperados. La lógica de cookies conserva sus valores, almacenamiento y activación de analítica; el aviso ocupa su propio espacio al principio del documento.

El PC usa Three.js y geometría extruida desde las curvas oficiales de `public/img/logo.svg`, que permanece intacto. Se conservan las dos piezas y el hueco de la P. La animación funciona también en móvil, respeta movimiento reducido y se detiene fuera de pantalla o con la pestaña oculta. El fallback utiliza las mismas curvas. No hay controles de vista frontal ni pausa. El material es negro en claro y lila en oscuro.

La implementación anterior de capas CSS queda reemplazada. Sus afirmaciones sobre logo estático en móvil, Instrument Serif y ocultación del bot ya no describen el estado actual. El informe completo está en `docs/home-correcciones.md`.

Comandos reproducibles:

```powershell
pnpm build:brand
pnpm build
$env:HOME_TEST_URL = 'http://127.0.0.1:3002'
pnpm test:home
$env:SEO_AUDIT_BASE_URL = 'http://127.0.0.1:3002'
pnpm seo:audit
```

El script global `lint` llama a `next lint`, ausente en Next 16. Se ejecutó ESLint focalizado directamente. La respuesta real de Gilberto requiere configurar `DEEPSEEK_API_KEY`; su interfaz y transporte original están recuperados.
