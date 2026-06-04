import { NextRequest, NextResponse } from 'next/server';

/**
 * Screenshot API Route
 * 
 * Takes a screenshot of a given URL server-side using Puppeteer.
 * Falls back to a local thumbnail if Puppeteer is not available (e.g. in dev without chrome).
 * 
 * Usage: /api/screenshot?url=https://example.com
 * 
 * Caching: Screenshots are cached for 7 days via Cache-Control headers.
 */

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    // Try to use puppeteer for real screenshots
    let puppeteer;
    let chromium;

    try {
      // In serverless (Vercel), use @sparticuz/chromium + puppeteer-core
      chromium = await import('@sparticuz/chromium').then(m => m.default);
      puppeteer = await import('puppeteer-core').then(m => m.default);
    } catch {
      // In local dev, try regular puppeteer
      try {
        puppeteer = await import('puppeteer').then(m => m.default);
      } catch {
        // No puppeteer available at all - proxy through microlink as server-side fallback
        return await microlinkFallback(url);
      }
    }

    const executablePath = chromium
      ? await chromium.executablePath()
      : undefined; // puppeteer full will find its own Chrome

    const browser = await puppeteer.launch({
      args: chromium ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1440, height: 900 },
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    // Small delay for animations to settle
    await new Promise(r => setTimeout(r, 1500));
    const screenshot = await page.screenshot({ type: 'webp', quality: 85 });
    await browser.close();

    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Screenshot error, falling back to microlink:', error);
    return await microlinkFallback(url);
  }
}

async function microlinkFallback(url: string): Promise<NextResponse> {
  try {
    const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
    const response = await fetch(microlinkUrl, { 
      next: { revalidate: 604800 } // cache for 7 days 
    });

    if (!response.ok) throw new Error(`Microlink returned ${response.status}`);

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/png',
        'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
      },
    });
  } catch {
    // Ultimate fallback: return a 1x1 transparent pixel so the img tag doesn't break
    // The onError handler in the component will swap to the local thumbnail
    return new NextResponse(
      Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64'),
      {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=3600',
        },
      }
    );
  }
}
