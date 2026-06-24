const fs = require('fs');
const path = require('path');

const pages = {
  'src/app/page.tsx': {
    title: 'Desarrollo Web, Software y Automatización',
    description: 'Agencia chilena especializada en desarrollo web premium, aplicaciones SaaS, e-commerce y sistemas a medida. Automatizamos tus procesos.',
    path: '/'
  },
  'src/app/servicios/page.tsx': {
    title: 'Servicios de Desarrollo Web y Software',
    description: 'Conoce nuestros servicios profesionales de desarrollo web, tiendas online (e-commerce), SaaS y mantenimiento digital continuo.',
    path: '/servicios'
  },
  'src/app/contacto/page.tsx': {
    title: 'Contacto y Cotizaciones',
    description: 'Contacta a PuroCode para recibir asesoría gratuita y cotizar tu próximo proyecto de desarrollo web o software a medida.',
    path: '/contacto'
  },
  'src/app/faq/page.tsx': {
    title: 'Preguntas Frecuentes sobre Desarrollo Web',
    description: 'Respuestas claras sobre tiempos de desarrollo, metodologías, costos y mantención de sitios web, e-commerce y sistemas SaaS.',
    path: '/faq'
  },
  'src/app/planes/page.tsx': {
    title: 'Planes y Precios de Desarrollo Web',
    description: 'Descubre nuestros planes y precios para sitios web corporativos, tiendas online y mantenimiento digital integral.',
    path: '/planes'
  },
  'src/app/proceso/page.tsx': {
    title: 'Nuestro Proceso de Trabajo Ágil',
    description: 'Conoce el paso a paso de cómo desarrollamos productos digitales de alto rendimiento. Desde la planificación hasta el despliegue.',
    path: '/proceso'
  },
  'src/app/portafolio/page.tsx': {
    title: 'Portafolio y Casos de Éxito',
    description: 'Explora los proyectos, páginas web, e-commerce y sistemas desarrollados por nuestro equipo de ingenieros para clientes de distintas industrias.',
    path: '/portafolio'
  },
  'src/app/soluciones/desarrollo-web-concepcion/page.tsx': {
    title: 'Desarrollo Web en Concepción',
    description: 'Servicio premium de desarrollo web en Concepción. Creamos sitios corporativos, landing pages y e-commerce de alto rendimiento.',
    path: '/soluciones/desarrollo-web-concepcion'
  },
  'src/app/soluciones/desarrollo-aplicaciones-web/page.tsx': {
    title: 'Desarrollo de Aplicaciones Web y PWAs',
    description: 'Construimos aplicaciones web interactivas, SaaS y Progressive Web Apps (PWAs) rápidas y escalables con tecnologías modernas.',
    path: '/soluciones/desarrollo-aplicaciones-web'
  },
  'src/app/soluciones/desarrollo-software-medida/page.tsx': {
    title: 'Desarrollo de Software a Medida',
    description: 'Diseño y desarrollo de sistemas empresariales, plataformas SaaS y automatización de procesos operativos a medida.',
    path: '/soluciones/desarrollo-software-medida'
  },
  'src/app/ecosistema-digital/page.tsx': {
    title: 'Ecosistema Digital Integral',
    description: 'Construimos un ecosistema digital completo para tu empresa integrando web, software, automatizaciones y marketing.',
    path: '/ecosistema-digital'
  },
  'src/app/mantenimiento/page.tsx': {
    title: 'Mantenimiento Web y Soporte',
    description: 'Servicios profesionales de mantenimiento web, actualizaciones de seguridad, soporte técnico y optimización continua de tu plataforma.',
    path: '/mantenimiento'
  }
};

const importRegex = /import\s+type\s+\{\s*Metadata\s*\}\s+from\s+["']next["'];?\n?(import\s+\{\s*generatePageMetadata\s*\}\s+from\s+["']@\/lib\/seo["'];?\n?)?/;
const metadataRegex = /export\s+const\s+metadata(?:\s*:\s*Metadata)?\s*=\s*\{[\s\S]*?\};/;

for (const [file, meta] of Object.entries(pages)) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Insert imports if not present
  if (!content.includes('import type { Metadata } from "next"')) {
    content = `import type { Metadata } from "next";\nimport { generatePageMetadata } from "@/lib/seo";\n` + content;
  } else if (!content.includes('generatePageMetadata')) {
    content = content.replace(/import\s+type\s+\{\s*Metadata\s*\}\s+from\s+["']next["'];?/, `import type { Metadata } from "next";\nimport { generatePageMetadata } from "@/lib/seo";`);
  }

  const metadataCode = `export const metadata: Metadata = generatePageMetadata({
  title: "${meta.title}",
  description: "${meta.description}",
  path: "${meta.path}",
});`;

  // Replace existing or append
  if (metadataRegex.test(content)) {
    content = content.replace(metadataRegex, metadataCode);
  } else {
    // Insert after imports
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfImports = content.indexOf('\\n', lastImportIndex);
    const insertPos = content.indexOf('\\n', lastImportIndex > -1 ? content.indexOf('\\n', lastImportIndex) : 0);
    
    // safe fallback to just inserting after first line if regex fails
    const match = content.match(/import.*?;\n/g);
    let lastImport = 0;
    if (match) {
        let currentPos = 0;
        for (const m of match) {
            currentPos = content.indexOf(m, currentPos) + m.length;
            lastImport = currentPos;
        }
    }
    
    content = content.slice(0, lastImport) + '\n' + metadataCode + '\n' + content.slice(lastImport);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated metadata for ${file}`);
}
