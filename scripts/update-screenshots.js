/**
 * Script para regenerar automáticamente las capturas del portafolio.
 * 
 * Uso: npm run update-screenshots
 * 
 * Requiere: puppeteer (npm install -D puppeteer)
 * 
 * Este script visita cada URL del portafolio, toma una captura de pantalla
 * y la guarda en public/img/FotosPaginas/ sobreescribiendo la anterior.
 * Así el portafolio siempre refleja el estado actual de cada web.
 */

const puppeteer = require('puppeteer');
const path = require('path');

const projects = [
  { url: 'https://pagina-podomed-clinical.vercel.app', file: 'PodoMedLanding.png' },
  { url: 'https://jessica-belmar-podologia.vercel.app', file: 'JessicaBelmarPodologia.png' },
  { url: 'https://www.floreriawildgarden.cl', file: 'FloreriaWildGarden.png' },
  { url: 'https://stride-landing-v1.vercel.app', file: 'StrideLanding.png' },
  { url: 'https://sushi-weld.vercel.app', file: 'SushiDemo.png' },
  { url: 'https://pagina-bioimpacto.vercel.app', file: 'Bioimpacto.png' },
  { url: 'https://banqueteria-demo.vercel.app', file: 'DemoBanqueteria.png' },
  { url: 'https://satisfaccion-clientes-alpha.vercel.app', file: 'ValoraLocal.png' },
  { url: 'https://www.puragenda.cl/', file: 'Puragenda.png' },
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'img', 'FotosPaginas');

async function main() {
  console.log('🚀 Iniciando actualización de capturas del portafolio...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900 },
  });

  for (const project of projects) {
    const outputPath = path.join(OUTPUT_DIR, project.file);
    try {
      console.log(`📸 Capturando: ${project.url}`);
      const page = await browser.newPage();
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 20000 });
      // Esperar un poco para que las animaciones terminen
      await new Promise((r) => setTimeout(r, 2000));
      await page.screenshot({ path: outputPath, type: 'png', fullPage: false });
      await page.close();
      console.log(`   ✅ Guardada → ${project.file}`);
    } catch (err) {
      console.log(`   ❌ Error en ${project.url}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n🎉 ¡Capturas actualizadas! Los cambios se reflejarán automáticamente en el portafolio.');
}

main();
