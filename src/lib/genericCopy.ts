// ── Generic Copy Generator for Landing Preview ──────────────────────
// Produces short, realistic Spanish placeholder text per section,
// optionally customized by industry.

interface CopyInput {
    businessName: string;
    industry: string;
}

export interface SectionCopy {
    tagline: string;
    services: string[];
    aboutText: string;
    processSteps: string[];
    testimonial: { text: string; author: string };
    faqQuestions: string[];
    teamNames: string[];
    blogTitles: string[];
    contactText: string;
    pricingDesc: string[];
}

type PartialCopy = Partial<SectionCopy>;

const industryData: Record<string, PartialCopy> = {
    gastronomia: {
        tagline: "Sabores que enamoran",
        services: ["Menú del día", "Catering", "Eventos"],
        aboutText: "Más de 10 años creando experiencias gastronómicas únicas para ti.",
        processSteps: ["Reserva", "Personaliza", "Disfruta", "Repite"],
        testimonial: { text: "La mejor comida de la ciudad, siempre volvemos.", author: "Camila R." },
        faqQuestions: ["¿Tienen opciones vegetarianas?", "¿Hacen delivery?", "¿Se puede reservar online?"],
    },
    salud: {
        tagline: "Tu bienestar, nuestra prioridad",
        services: ["Consultas médicas", "Diagnósticos", "Tratamientos"],
        aboutText: "Profesionales comprometidos con tu salud y bienestar integral.",
        processSteps: ["Agenda", "Evaluación", "Tratamiento", "Seguimiento"],
        testimonial: { text: "Atención profesional y humana. Totalmente recomendados.", author: "Roberto M." },
        faqQuestions: ["¿Aceptan Fonasa/Isapre?", "¿Cuál es el horario?", "¿Necesito hora previa?"],
    },
    belleza: {
        tagline: "Resalta tu belleza natural",
        services: ["Corte y estilo", "Coloración", "Tratamientos"],
        aboutText: "Especialistas en realzar tu imagen con las últimas tendencias.",
        processSteps: ["Consulta", "Diagnóstico", "Servicio", "Resultado"],
        testimonial: { text: "Quedé encantada con el resultado. ¡Volveré siempre!", author: "Sofía L." },
        faqQuestions: ["¿Necesito cita previa?", "¿Cuánto dura el servicio?", "¿Tienen estacionamiento?"],
    },
    educacion: {
        tagline: "Aprende con los mejores",
        services: ["Cursos online", "Talleres", "Mentoría"],
        aboutText: "Formación de calidad para impulsar tu carrera profesional.",
        processSteps: ["Inscripción", "Clases", "Práctica", "Certificación"],
        testimonial: { text: "Excelente metodología, aprendí muchísimo.", author: "Fernando A." },
        faqQuestions: ["¿Son clases en vivo?", "¿Entregan certificado?", "¿Cuánto duran los cursos?"],
    },
    tecnologia: {
        tagline: "Soluciones digitales que transforman",
        services: ["Desarrollo web", "Apps móviles", "Soporte TI"],
        aboutText: "Equipo especializado en soluciones tecnológicas a medida.",
        processSteps: ["Análisis", "Diseño", "Desarrollo", "Entrega"],
        testimonial: { text: "Superaron nuestras expectativas. Muy profesionales.", author: "Diego F." },
        faqQuestions: ["¿Qué tecnologías usan?", "¿Cuánto demora un proyecto?", "¿Ofrecen mantenimiento?"],
    },
    inmobiliaria: {
        tagline: "Tu hogar ideal te espera",
        services: ["Venta", "Arriendo", "Asesoría"],
        aboutText: "Conectamos personas con propiedades que cambian vidas.",
        processSteps: ["Búsqueda", "Visita", "Negociación", "Cierre"],
        testimonial: { text: "Encontramos la casa perfecta gracias a su ayuda.", author: "Andrea P." },
        faqQuestions: ["¿Cómo agendar una visita?", "¿Tienen propiedades nuevas?", "¿Financiamiento disponible?"],
    },
    legal: {
        tagline: "Defensa y asesoría con experiencia",
        services: ["Asesoría legal", "Contratos", "Litigios"],
        aboutText: "Abogados con amplia trayectoria en diversas áreas del derecho.",
        processSteps: ["Consulta", "Análisis", "Estrategia", "Resolución"],
        testimonial: { text: "Resolvieron mi caso rápidamente. Muy agradecido.", author: "Martín C." },
        faqQuestions: ["¿Primera consulta es gratuita?", "¿En qué áreas se especializan?", "¿Cuánto cuesta?"],
    },
    fitness: {
        tagline: "Transforma tu cuerpo y mente",
        services: ["Entrenamiento", "Nutrición", "Clases grupales"],
        aboutText: "Entrenadores certificados que te ayudan a alcanzar tus metas.",
        processSteps: ["Evaluación", "Plan", "Entrenamiento", "Resultados"],
        testimonial: { text: "En 3 meses logré resultados increíbles.", author: "Paula V." },
        faqQuestions: ["¿Tienen clase de prueba?", "¿Cuáles son los horarios?", "¿Necesito experiencia?"],
    },
    construccion: {
        tagline: "Construimos tus sueños",
        services: ["Construcción", "Remodelación", "Diseño"],
        aboutText: "Proyectos de construcción y remodelación con calidad garantizada.",
        processSteps: ["Cotización", "Diseño", "Construcción", "Entrega"],
        testimonial: { text: "Entregaron a tiempo y con excelente calidad.", author: "Jorge S." },
        faqQuestions: ["¿Cuánto demora una remodelación?", "¿Dan garantía?", "¿Trabajan fines de semana?"],
    },
    consultoria: {
        tagline: "Estrategia para crecer",
        services: ["Consultoría", "Planificación", "Optimización"],
        aboutText: "Ayudamos a empresas a alcanzar su máximo potencial.",
        processSteps: ["Diagnóstico", "Estrategia", "Implementación", "Medición"],
        testimonial: { text: "Nos ayudaron a duplicar nuestras ventas.", author: "Valentina N." },
        faqQuestions: ["¿Cómo es el proceso?", "¿Cuánto cuesta la consultoría?", "¿Trabajan con PYMEs?"],
    },
    marketing: {
        tagline: "Haz crecer tu marca",
        services: ["Redes sociales", "Publicidad", "Branding"],
        aboutText: "Estrategias de marketing digital que generan resultados reales.",
        processSteps: ["Auditoría", "Estrategia", "Ejecución", "Reportes"],
        testimonial: { text: "Triplicamos nuestro alcance en redes. Increíble.", author: "Nicolás B." },
        faqQuestions: ["¿Manejan redes sociales?", "¿Cuánto cuesta una campaña?", "¿Qué resultados esperar?"],
    },
    automotriz: {
        tagline: "Expertos en tu vehículo",
        services: ["Mantención", "Reparación", "Diagnóstico"],
        aboutText: "Servicio automotriz de confianza con técnicos certificados.",
        processSteps: ["Recepción", "Diagnóstico", "Reparación", "Entrega"],
        testimonial: { text: "Honestos y eficientes. Mi taller de confianza.", author: "Tomás H." },
        faqQuestions: ["¿Trabajan todas las marcas?", "¿Tienen garantía?", "¿Cuánto demora el servicio?"],
    },
    agricultura: {
        tagline: "Del campo a tu mesa",
        services: ["Producción", "Distribución", "Asesoría agrícola"],
        aboutText: "Productos frescos y naturales directamente del campo.",
        processSteps: ["Cultivo", "Cosecha", "Selección", "Entrega"],
        testimonial: { text: "Productos frescos y de excelente calidad.", author: "Carmen O." },
        faqQuestions: ["¿Son productos orgánicos?", "¿Hacen despacho?", "¿Dónde están ubicados?"],
    },
};

const defaultCopy: SectionCopy = {
    tagline: "Profesionales a tu servicio",
    services: ["Asesoría profesional", "Soluciones a medida", "Soporte continuo"],
    aboutText: "Con amplia experiencia, ofrecemos soluciones profesionales para impulsar tu negocio.",
    processSteps: ["Contacto", "Diagnóstico", "Ejecución", "Entrega"],
    testimonial: { text: "Excelente servicio, muy profesionales y comprometidos.", author: "María G." },
    faqQuestions: ["¿Cómo funciona el servicio?", "¿Cuáles son los precios?", "¿Cuánto demora?"],
    teamNames: ["Ana García", "Carlos López", "María Díaz"],
    blogTitles: ["Consejos para tu negocio", "Tendencias del sector 2026"],
    contactText: "¿Tienes dudas? Escríbenos y te responderemos a la brevedad.",
    pricingDesc: ["Ideal para empezar", "El más popular", "Para empresas"],
};

export function getGenericCopy(input: CopyInput): SectionCopy {
    const industrySpecific = industryData[input.industry] || {};
    return {
        ...defaultCopy,
        ...industrySpecific,
    };
}
