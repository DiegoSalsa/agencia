import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import puppeteer from "puppeteer";

const base = process.env.HOME_TEST_URL || "http://127.0.0.1:3002";
const canvasSelector = "canvas[data-brand-canvas]";
let browser;

before(async () => {
  browser = await puppeteer.launch({
    headless: true,
    protocol: "cdp",
    pipe: true,
    ...(process.env.HOME_TEST_BROWSER ? { executablePath: process.env.HOME_TEST_BROWSER } : {}),
  });
});
after(async () => { await browser?.close(); });

async function newPage() {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem("cookie_consent", "essential");
    document.cookie = "userLang=es;path=/";
    document.cookie = "userCurrency=CLP;path=/";
  });
  return page;
}
async function ready(page) {
  await page.waitForFunction(() => document.querySelector("[data-ready='true'] canvas")?.dataset.motion === "running");
}
async function metrics(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("canvas[data-brand-canvas]");
    const rect = canvas.getBoundingClientRect();
    const hero = document.querySelector("#hero").getBoundingClientRect();
    const title = document.querySelector("#hero-title").getBoundingClientRect();
    return {
      width: rect.width, height: rect.height, bufferWidth: canvas.width, bufferHeight: canvas.height,
      dpr: devicePixelRatio, overflow: document.documentElement.scrollWidth > innerWidth,
      contained: rect.left >= hero.left && rect.right <= hero.right,
      aboveTitle: rect.bottom <= title.top,
      count: document.querySelectorAll("canvas[data-brand-canvas]").length,
    };
  });
}

test("3D stays sharp, visible and contained across mobile, tablet and desktop sizes", { timeout: 120_000 }, async () => {
  const page = await newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  try {
    for (const [width, height, dpr] of [[320, 640, 2], [375, 667, 3], [390, 844, 3], [430, 932, 3], [768, 1024, 2], [900, 1000, 2], [901, 1000, 2], [1440, 900, 2]]) {
      await page.setViewport({ width, height, deviceScaleFactor: dpr, isMobile: true, hasTouch: true });
      await page.goto(base, { waitUntil: "domcontentloaded" });
      await ready(page);
      const result = await metrics(page);
      const expected = Math.min(dpr, 3, Math.sqrt(1_440_000 / (result.width * result.height)));
      assert.equal(result.count, 1, `${width}: one canvas`);
      assert.ok(Math.abs(result.bufferWidth - result.width * expected) <= 1, `${width}: horizontal resolution`);
      assert.ok(Math.abs(result.bufferHeight - result.height * expected) <= 1, `${width}: vertical resolution`);
      assert.ok(result.bufferWidth * result.bufferHeight <= 1_440_000, `${width}: pixel budget`);
      assert.equal(result.overflow, false, `${width}: no horizontal overflow`);
      assert.equal(result.contained, true, `${width}: contained in hero`);
      if (width <= 900) assert.equal(result.aboveTitle, true, `${width}: sculpture above title`);
    }
    assert.deepEqual(errors, []);
  } finally { await page.close(); }
});

test("animation changes the rendered image, pauses offscreen and resumes", async () => {
  const page = await newPage();
  try {
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await ready(page);
    const canvas = await page.$(canvasSelector);
    const first = await canvas.screenshot();
    await new Promise(resolve => setTimeout(resolve, 400));
    assert.notDeepEqual(await canvas.screenshot(), first, "rendered pose must change");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForFunction(() => document.querySelector("canvas[data-brand-canvas]")?.dataset.motion === "paused");
    await page.evaluate(() => window.scrollTo(0, 0));
    await ready(page);
  } finally { await page.close(); }
});

test("resolution updates when DPR changes without crossing the mobile breakpoint", async () => {
  const page = await newPage();
  try {
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await ready(page);
    for (const deviceScaleFactor of [1, 2, 3]) {
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor, isMobile: true, hasTouch: true });
      await page.waitForFunction(dpr => {
        const canvas = document.querySelector("canvas[data-brand-canvas]");
        return Math.abs(canvas.width / canvas.getBoundingClientRect().width - dpr) < .01;
      }, {}, deviceScaleFactor);
    }
    // Keep the same renderer while changing orientation and desktop layout.
    for (const [width, height] of [[844, 390], [1440, 900], [390, 844]]) {
      await page.setViewport({ width, height, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
      await ready(page);
      assert.equal((await metrics(page)).count, 1);
    }
  } finally { await page.close(); }
});

test("reduced motion keeps the SVG and responds to preference changes", async () => {
  const page = await newPage();
  const geometryRequests = [];
  page.on("request", request => { if (request.url().endsWith("/pc-model.bin")) geometryRequests.push(request.url()); });
  try {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(base, { waitUntil: "domcontentloaded" });
    // A working React control confirms hydration before checking deferred work.
    await page.click('[aria-label="Activar modo claro"]');
    await page.waitForSelector('[aria-label="Activar modo oscuro"]');
    assert.equal(await page.$(canvasSelector), null);
    assert.deepEqual(geometryRequests, []);
    assert.equal(await page.$eval("#hero img[src='/img/pc-mark.svg']", img => getComputedStyle(img).visibility), "visible");
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await ready(page);
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.waitForFunction(() => !document.querySelector("canvas[data-brand-canvas]"));
  } finally { await page.close(); }
});

test("geometry failure leaves the vector fallback visible", async () => {
  const page = await newPage();
  try {
    await page.setRequestInterception(true);
    page.on("request", request => request.url().endsWith("/pc-model.bin") ? request.abort() : request.continue());
    const failed = page.waitForRequest(request => request.url().endsWith("/pc-model.bin"));
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await failed;
    await page.waitForFunction(() => document.querySelector("#hero img[src='/img/pc-mark.svg']")?.complete);
    assert.equal(await page.$(canvasSelector), null);
    assert.equal(await page.$eval("#hero img[src='/img/pc-mark.svg']", img => img.complete && getComputedStyle(img).visibility === "visible"), true);
  } finally { await page.close(); }
});

test("context loss releases the canvas and reveals the vector fallback", async () => {
  const page = await newPage();
  try {
    await page.goto(base, { waitUntil: "domcontentloaded" });
    await ready(page);
    await page.$eval(canvasSelector, canvas => canvas.getContext("webgl2").getExtension("WEBGL_lose_context").loseContext());
    await page.waitForFunction(() => !document.querySelector("canvas[data-brand-canvas]"));
    assert.equal(await page.$eval("#hero img[src='/img/pc-mark.svg']", img => getComputedStyle(img).visibility), "visible");
  } finally { await page.close(); }
});
