import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.HOME_TEST_URL || "http://127.0.0.1:3002";
const destinations = ["/servicios", "/portafolio", "/labs", "/proceso", "/planes", "/mantenimiento", "/faq", "/contacto", "/formulario"];
const publicRoutes = ["/", ...destinations.filter(route => route !== "/formulario"), "/terminos", "/privacidad", "/formulario/landing", "/formulario/oferta", "/formulario/success", "/soluciones", "/soluciones/landing-pages", "/soluciones/desarrollo-software-medida", "/sobre-purocode", "/casos-de-exito", "/ecosistema-digital"];

test("public pages render one shared navbar with every original destination and both responsive menus", async () => {
  for (const route of publicRoutes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal([...html.matchAll(/id="site-header"/g)].length, 1, route);
    const header = html.match(/<header id="site-header"[^>]*>(.*?)<\/header>/s)?.[1];
    assert.ok(header, route);
    for (const href of destinations) assert.ok(header.includes(`href="${href}"`), `${route}: missing ${href}`);
    assert.match(header, /id="site-mobile-menu"[^>]*hidden/);
    assert.ok(header.includes("Activar modo claro"));
    assert.ok(header.includes("English") && header.includes("Español"));
    assert.ok(html.includes("Hablar con Gilberto"), `${route}: bot access`);
  }
});

test("quote entry redirects to the existing pricing section with original briefing links", async () => {
  const response = await fetch(base + "/formulario", { redirect: "manual" });
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "/planes#planes");
  const html = await (await fetch(base + "/planes")).text();
  assert.ok(html.includes('id="planes"'));
  for (const type of ["landing", "web-corporativa", "ecommerce"])
    assert.ok(html.includes(`href="/formulario/${type}"`), type);
});

test("public navbar does not replace private admin or customer portal navigation", async () => {
  for (const route of ["/admin", "/mi-sitio"]) {
    const html = await (await fetch(base + route)).text();
    assert.ok(!html.includes('id="site-header"'), route);
  }
});
