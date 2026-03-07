// ── Domain Availability Checker ──
// Uses Porkbun API for availability check + price filtering.
// If a domain's registration price exceeds the threshold, it's shown as "not available".

const PORKBUN_API_URL = "https://api.porkbun.com/api/json/v3/domain/check";

const EXTENSIONS = [".com", ".cl", ".net", ".io"];

// Default threshold in USD
const DEFAULT_PRICE_THRESHOLD = 15;

interface DomainResult {
    domain: string;
    extension: string;
    available: boolean;
    error?: boolean;
}

interface PorkbunResponse {
    status: string;
    avail?: string;
    pricing?: {
        registration?: string;
        renewal?: string;
    };
}

async function checkSingleDomain(
    fullDomain: string,
    apiKey: string,
    secretKey: string,
    priceThreshold: number
): Promise<DomainResult> {
    const ext = "." + fullDomain.split(".").slice(1).join(".");

    try {
        const response = await fetch(`${PORKBUN_API_URL}/${fullDomain}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apikey: apiKey,
                secretapikey: secretKey,
            }),
            signal: AbortSignal.timeout(8000),
        });

        if (!response.ok) {
            return { domain: fullDomain, extension: ext, available: false, error: true };
        }

        const data: PorkbunResponse = await response.json();

        if (data.status !== "SUCCESS") {
            return { domain: fullDomain, extension: ext, available: false, error: true };
        }

        // Check availability
        // Porkbun returns "avail" field — value can be "yes" or "no" (or similar)
        const isAvailable = data.avail === "yes";

        if (!isAvailable) {
            return { domain: fullDomain, extension: ext, available: false };
        }

        // Check price threshold
        const registrationPrice = parseFloat(data.pricing?.registration || "0");
        if (registrationPrice > priceThreshold) {
            // Too expensive → show as "not available" (mentira piadosa)
            return { domain: fullDomain, extension: ext, available: false };
        }

        return { domain: fullDomain, extension: ext, available: true };
    } catch {
        // Timeout or network error → hide this extension
        return { domain: fullDomain, extension: ext, available: false, error: true };
    }
}

export async function checkDomainAvailability(
    baseName: string,
    apiKey: string,
    secretKey: string,
    priceThreshold: number = DEFAULT_PRICE_THRESHOLD
): Promise<DomainResult[]> {
    // Clean the base name
    const clean = baseName
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 63);

    if (!clean || clean.length < 2) {
        return [];
    }

    // Check all extensions in parallel
    const results = await Promise.allSettled(
        EXTENSIONS.map((ext) =>
            checkSingleDomain(`${clean}${ext}`, apiKey, secretKey, priceThreshold)
        )
    );

    // Filter out errors (hide failed extensions)
    return results
        .filter(
            (r): r is PromiseFulfilledResult<DomainResult> =>
                r.status === "fulfilled" && !r.value.error
        )
        .map((r) => r.value);
}
