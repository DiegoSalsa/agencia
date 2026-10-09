type NavigationLink = { key: string; href: string };
type NavigationGroup = { key: string; children: readonly NavigationLink[] };

export const CONTACT_PATH = "/contacto";

// Original public routes and translation keys from Header at 5fcca07.
export const siteNavigation: readonly (NavigationLink | NavigationGroup)[] = [
  { key: "nav_services", href: "/servicios" },
  { key: "nav_portfolio", children: [
    { key: "nav_dropdown_web", href: "/portafolio" },
    { key: "nav_dropdown_saas", href: "/labs" },
  ] },
  { key: "nav_process", href: "/proceso" },
  { key: "nav_pricing", children: [
    { key: "nav_dropdown_dev", href: "/planes" },
    { key: "nav_dropdown_maint", href: "/mantenimiento" },
  ] },
  { key: "nav_faq", href: "/faq" },
  { key: "nav_contact", href: CONTACT_PATH },
];

export function isPublicSiteRoute(pathname: string) {
  return !["/admin", "/mi-sitio"].some(root => pathname === root || pathname.startsWith(root + "/"));
}

export function needsHeaderSpace(pathname: string) {
  // Other marketing pages already reserve the header height in PageHeader.
  return ["/", "/terminos", "/privacidad"].includes(pathname) || pathname.startsWith("/formulario");
}
