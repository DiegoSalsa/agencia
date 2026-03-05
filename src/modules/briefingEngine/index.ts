import { BriefingTypeConfig } from "@/types/briefing";
import { landingConfig } from "./configs/landing";
import { webCorporativaConfig } from "./configs/webCorporativa";
import { ecommerceConfig } from "./configs/ecommerce";

const configs: Record<string, BriefingTypeConfig> = {
    LANDING: landingConfig,
    WEB_CORPORATIVA: webCorporativaConfig,
    ECOMMERCE: ecommerceConfig,
};

export function getBriefingConfig(type: string): BriefingTypeConfig | null {
    return configs[type.toUpperCase()] || null;
}

export function getAllConfigs(): BriefingTypeConfig[] {
    return Object.values(configs);
}

export function getEnabledConfigs(): BriefingTypeConfig[] {
    return Object.values(configs).filter((c) => c.enabled);
}

export { landingConfig, webCorporativaConfig, ecommerceConfig };
