# PuroCode — Agencia de Desarrollo Web

Plataforma web completa para una agencia de desarrollo: landing page profesional, sistema de briefing interactivo con cotización en tiempo real, panel de administración y sistema de emails automáticos.

## Características

- **Briefing interactivo multi-paso** con cotización dinámica en tiempo real
- **3 tipos de proyecto**: Landing Page, Web Corporativa, E-commerce
- **Panel de administración** con dashboard, gestión de briefings, exportación CSV/DOCX/XLSX
- **Multi-idioma** (ES/EN) con detección automática por geolocalización
- **Detección de moneda** por IP (CLP/USD/EUR/MXN)
- **4 proveedores de email** en cascada (Resend → Gmail → Gmail OAuth2 → SendGrid)
- **Rate limiting** por IP (5 solicitudes/minuto)
- **Exportación automática** a DOCX y XLSX adjuntos en email
- **Diseño responsive** con tema claro/oscuro
- **Portfolio** con thumbnails dinámicos

## Tech Stack

| Categoría | Tecnología |
|-----------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS 3 + CSS Variables |
| Animaciones | Framer Motion |
| ORM | Prisma 7 |
| Base de datos | SQLite (local) / Turso (producción) |
| Email | Nodemailer + Resend |
| Documentos | docx + exceljs |
| Deploy | Vercel |

## Estructura del Proyecto

```
src/
├── app/                    → Rutas (pages, API routes, layouts)
│   ├── admin/              → Panel de administración
│   │   └── dashboard/      → Dashboard + detalle de briefings
│   ├── api/                → API routes
│   │   ├── auth/           → Autenticación admin
│   │   ├── briefings/      → CRUD + submit + export
│   │   └── ...
│   └── formulario/         → Formulario de briefing multi-step
│       └── [type]/         → Ruta dinámica por tipo
├── components/
│   ├── briefing/           → Componentes del formulario
│   ├── landing/            → Componentes de la landing page
│   └── shared/             → Componentes compartidos
├── lib/                    → Utilidades y servicios
│   ├── emailService.ts     → Envío de emails (cascada 4 proveedores)
│   ├── pricingEngine.ts    → Motor de cotización
│   ├── generateDocx.ts     → Generador de documentos Word
│   ├── generateXlsx.ts     → Generador de hojas de cálculo
│   ├── i18n.ts             → Internacionalización
│   └── prisma.ts           → Cliente Prisma
├── modules/
│   └── briefingEngine/     → Motor de briefing
│       ├── configs/        → Configuraciones por tipo de proyecto
│       ├── context.tsx      → Estado global del formulario
│       ├── FieldRenderer.tsx
│       └── StepRenderer.tsx
└── types/                  → Tipos TypeScript
```

## Instalación

### Requisitos

- Node.js 20+
- npm

### Setup local

```bash
npm install
cp .env.example .env       # Configurar variables de entorno
npx prisma generate
npx prisma db push
npm run dev                 # http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo (Turbopack)
npm run build     # Build de producción
npm run start     # Iniciar servidor de producción
npm run lint      # Linter
```

## Variables de Entorno

Ver [.env.example](.env.example) para la lista completa con descripciones.

### Mínimo requerido para desarrollo local

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="tu-password"
EMAIL_FROM="Tu Nombre <tu@email.com>"
EMAIL_USER="tu@email.com"
EMAIL_PASS="tu-app-password"
```

## Deploy a Vercel

1. Conectar repositorio a Vercel
2. Configurar variables de entorno en el dashboard de Vercel
3. Configurar Turso:
   - Crear base de datos en [turso.tech](https://turso.tech)
   - Obtener URL y auth token
   - Agregar `DATABASE_URL` y `DATABASE_AUTH_TOKEN` en Vercel
4. El deploy es automático en cada push a `main`

## Configuración de Email

El sistema prueba proveedores en cascada hasta encontrar uno que funcione:

1. **Resend** (recomendado para Vercel) — `RESEND_API_KEY`
2. **Gmail App Password** — `EMAIL_USER` + `EMAIL_PASS`
3. **Gmail OAuth2** — `GMAIL_CLIENT_ID` + `GMAIL_CLIENT_SECRET` + `GMAIL_REFRESH_TOKEN`
4. **SendGrid** — `SENDGRID_API_KEY`

Se envían 2 correos por cada briefing:
- **Admin**: briefing completo con documentos DOCX/XLSX adjuntos
- **Cliente**: confirmación con resumen de lo solicitado

## Licencia

Proyecto privado. Todos los derechos reservados.
