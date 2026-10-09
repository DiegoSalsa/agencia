# PuroCode — Implementación móvil C y acceso a Contacto
8 de octubre de 2026. Continúa el trabajo local de navbar global; el usuario seleccionó C y autorizó implementarla.

## Resultado
- Composición móvil C hasta 900 px: Inter, hero compacto, CTA contenido, Puragenda antes de las imágenes y proyectos secundarios apilados.
- Sin 3D ni espacio reservado en móvil. La condición de ancho y movimiento se comprueba antes de importar el renderer. Al volver a móvil desde escritorio se aborta la carga y se elimina el canvas.
- Servicios, contacto y footer completos. Footer móvil de dos columnas con contacto debajo y enlaces táctiles de al menos 44 px.
- Dock móvil compartido: Redes abre WhatsApp, Instagram y Facebook; Gilberto abre el chat existente. Incluye Volver arriba tras desplazarse. Respeta el área segura inferior y reserva espacio al final de la página.
- Foco en el primer enlace al abrir Redes; Escape cierra y devuelve el foco. El chat enfoca su campo al abrir y devuelve el foco al cerrar. El navbar oculta temporalmente el dock.
- Conversemos en el hero y en Hablemos de tu proyecto lleva a /contacto, tanto en móvil como en escritorio. El CtaBanner compartido también invita a Conversemos y lleva a /contacto. La ruta se centralizó en CONTACT_PATH.
- Se conservan los enlaces directos de email, teléfono y redes en el footer y en Contacto, así como los flujos específicos de cotización.
- Escritorio conserva composición, tipografía y PC animado. El cambio de Contacto aplica globalmente.

## Validación
Build de producción correcto (60 páginas), TypeScript correcto, lint enfocado correcto y 11 pruebas correctas sobre la compilación final. El comando general next lint conserva la incompatibilidad previa con Next 16.

Revisión con navegador a 320, 390, 768 y 1440 px: sin desbordamiento horizontal; modo oscuro y claro; cambio de móvil a escritorio y de vuelta; apertura/cierre de Redes y chat; Escape y foco; Volver arriba; navbar; footer; navegación real desde ambos CTA de Home y desde FAQ hacia Contacto.

En una carga nueva a 390 px no había canvas ni script o precarga del chunk que contiene Three y el renderer (b4de6ba78269b61b.js). Como control, al pasar a 1440 px ese script apareció y se creó un canvas. Tras volver a 390 px el canvas se eliminó; al recargar en móvil volvió a estar ausente el script. Esto verifica que no se trata solo de ocultar visualmente el 3D.

No se enviaron mensajes ni formularios. Se comprobó la interfaz del asistente; las respuestas reales requieren la clave local ausente, como en la revisión anterior. No se añadieron dependencias ni se cambiaron planes o precios. La validación se realizó localmente. El usuario autorizó subir esta implementación a main el 8 de octubre de 2026.

Preview actualizado: http://127.0.0.1:3002/.

## Capturas reales
![Primera pantalla móvil](mobile-c/mobile-hero.jpg)
[Home móvil completa](mobile-c/mobile-complete.jpg)
![Footer móvil](mobile-c/mobile-footer.jpg)
[Escritorio](mobile-c/desktop.jpg)
