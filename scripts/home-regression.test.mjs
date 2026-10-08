import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.HOME_TEST_URL || "http://localhost:3002";
const originalRoutes = [
  "/servicios", "/portafolio", "/labs", "/proceso", "/planes",
  "/mantenimiento", "/faq", "/contacto", "/formulario",
  "/soluciones/landing-pages", "/soluciones/paginas-web-corporativas",
  "/soluciones/tienda-online", "/terminos", "/privacidad",
];
test("SSR Home keeps original navigation, complete footer, socials and contact", async () => {
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const route of originalRoutes) assert.ok(html.includes('href="' + route + '"'), "Missing " + route);
  for (const href of ["https://www.instagram.com/purocodecl/", "https://www.facebook.com/PuroCode.com", "https://wa.me/56949255006", "mailto:contacto@purocode.com"])
    assert.ok(html.includes('href="' + href + '"'), "Missing " + href);
  assert.ok(html.includes("Hablar con Gilberto"));
  assert.ok(html.includes("Todos los derechos reservados."));
  assert.ok(html.includes('id="hero-title"'));
  assert.ok(html.includes('id="footer"'));
  assert.ok(html.includes("Configuración de cookies"));
});
test("all original navigation destinations still return HTTP 200", async () => {
  for (const route of originalRoutes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
  }
});

test("Home has one descriptive H1, aligned metadata and a working sharing image", async () => {
  const html = await (await fetch(base)).text();
  const headings = [...html.matchAll(/<(h[123])\b[^>]*>(.*?)<\/\1>/gs)]
    .map(match => ({ tag: match[1], text: match[2].replace(/<[^>]*>/g, "").trim() }));
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1];
  assert.ok(main, "Main content must be server-rendered");
  assert.deepEqual(headings.filter(h => h.tag === "h1").map(h => h.text), ["Desarrollo web y software a medida."]);
  assert.match(html, /<title>Desarrollo web y software a medida en Chile \| PuroCode<\/title>/);
  assert.ok(html.includes('name="description" content="Desarrollo web y software a medida para empresas en Chile.'));
  assert.ok(html.includes('rel="canonical" href="https://www.purocode.com"'));
  for (const heading of ["Proyectos web y productos propios.", "Servicios de desarrollo.", "Hablemos de tu proyecto."])
    assert.ok(headings.some(h => h.tag === "h2" && h.text === heading));
  for (const project of ["Puragenda", "JuntAPP", "Florería Wildgarden"])
    assert.ok(headings.some(h => h.tag === "h3" && h.text === project));
  const image = await fetch(base + "/img/og-image.png");
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type") || "", /image\/png/);
});
