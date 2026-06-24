import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const urlsToTest = [
  "http://localhost:3000/",
  "http://localhost:3000/servicios",
  "http://localhost:3000/contacto",
  "http://localhost:3000/faq",
  "http://localhost:3000/planes",
  "http://localhost:3000/soluciones/desarrollo-web-concepcion",
  "http://localhost:3000/soluciones/desarrollo-software-medida",
  "http://localhost:3000/soluciones/desarrollo-aplicaciones-web",
  "http://localhost:3000/sobre-purocode",
  "http://localhost:3000/precios-pagina-web-chile",
  "http://localhost:3000/cuanto-cuesta-un-ecommerce-en-chile",
  "http://localhost:3000/desarrollo-saas-chile",
  "http://localhost:3000/mantencion-web-chile",
  "http://localhost:3000/casos-de-exito",
];

async function runAudit() {
  console.log("Starting Static SEO Audit...");
  let errors = 0;

  for (const url of urlsToTest) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`❌ [${url}] FAILED TO LOAD: HTTP ${res.status}`);
        errors++;
        continue;
      }
      
      const html = await res.text();
      
      // 1. Title (we look in raw HTML or next.js payload)
      let titlePass = false;
      if (html.includes('<title>') || html.includes('"title"')) {
        titlePass = true;
        if (html.includes('PuroCode | PuroCode') || html.includes(' | PuroCode | PuroCode')) {
           console.error(`❌ [${url}] Duplicate Brand in Title.`);
           errors++;
           titlePass = false;
        }
      } else {
        console.error(`❌ [${url}] No <title> found.`);
        errors++;
      }

      // 2. Canonical
      let canonicalPass = false;
      if (html.includes('rel="canonical"') || html.includes('"canonical"')) {
        canonicalPass = true;
      } else {
        console.error(`❌ [${url}] No canonical link found.`);
        errors++;
      }

      // 3. Description
      let descPass = false;
      if (html.includes('name="description"') || html.includes('"description"')) {
        descPass = true;
      } else {
        console.error(`❌ [${url}] No meta description found.`);
        errors++;
      }
      
      if(titlePass && canonicalPass && descPass) {
        console.log(`✅ [${url}] PASSED (Title, Description, Canonical OK)`);
      }

    } catch (e: any) {
      console.error(`❌ [${url}] Error fetching: ${e.message}`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\n❌ SEO Audit Failed with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log("\n✅ All SEO Checks Passed Successfully.");
    process.exit(0);
  }
}

runAudit();
