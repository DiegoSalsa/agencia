'use client';

import { motion } from 'framer-motion';
import { 
  Globe, Shield, Layers, Zap, Code, Server, 
  Smartphone, Search, Rocket, Database, 
  ArrowRight, BarChart, CheckCircle2, Lock, Cpu,
  ShoppingCart, CreditCard, Box
} from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function DetailedServices() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <div className="bg-[#050505] min-h-screen relative overflow-hidden" ref={ref}>
      {/* Global Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-32 md:gap-48 relative z-10">
        
        {/* =========================================
            SERVICE 1: LANDING PAGES
            ========================================= */}
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          {/* Header Block */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Landing Pages <br/> de Alta Conversión.</h2>
            <p className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed">
              No hacemos simples páginas informativas. Construimos embudos visuales diseñados milimétricamente para captar atención, retener interés y convertir visitantes en clientes.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Main Feature */}
            <div className="md:col-span-2 rounded-3xl border border-[#222] bg-[#0A0A0A] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[80px] rounded-full group-hover:bg-violet-500/20 transition-colors duration-500" />
              <BarChart className="w-12 h-12 text-violet-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Optimización de Conversión (CRO)</h3>
              <p className="text-[#888] leading-relaxed max-w-md">
                Estructuramos el contenido basándonos en psicología del consumidor. Cada botón, cada texto y cada imagen está colocado estratégicamente para guiar al usuario hacia la acción deseada (compra, registro o contacto).
              </p>
            </div>
            
            {/* Secondary Features */}
            <div className="rounded-3xl border border-[#222] bg-[#0A0A0A] p-8 flex flex-col justify-center">
              <Smartphone className="w-10 h-10 text-violet-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-3">Mobile First</h3>
              <p className="text-sm text-[#888]">Experiencia impecable y carga instantánea en dispositivos móviles.</p>
            </div>
            
            <div className="rounded-3xl border border-[#222] bg-[#0A0A0A] p-8 flex flex-col justify-center">
              <Search className="w-10 h-10 text-violet-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-3">SEO Técnico</h3>
              <p className="text-sm text-[#888]">Etiquetas semánticas, Core Web Vitals y schema markup listos.</p>
            </div>

            <div className="md:col-span-2 rounded-3xl border border-[#222] bg-[#111] p-8 flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold mb-2">Tech Stack</h4>
                <div className="flex gap-3">
                  {['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map(tech => (
                    <span key={tech} className="text-xs font-semibold px-3 py-1 bg-[#222] text-[#aaa] rounded-lg border border-[#333]">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="hidden sm:block text-5xl font-black text-[#222]">01</div>
            </div>
          </div>

          <Link href="/formulario/landing" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-violet-400 hover:text-white transition-colors duration-300">
            Cotizar Landing Page <ArrowRight size={18} />
          </Link>
        </motion.div>


        {/* =========================================
            SERVICE 2: WEB CORPORATIVA
            ========================================= */}
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          {/* Header Block */}
          <div className="mb-16 md:text-right flex flex-col md:items-end">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Webs Corporativas <br/> a Medida.</h2>
            <p className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed">
              Desarrollamos el cuartel general digital de tu empresa. Arquitectura escalable, diseño que transmite autoridad y sistemas integrados que automatizan tus procesos internos.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            <div className="md:col-span-1 rounded-3xl border border-[#222] bg-[#0A0A0A] p-8 flex flex-col justify-center">
              <Lock className="w-10 h-10 text-blue-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-3">Seguridad Empresarial</h3>
              <p className="text-sm text-[#888]">Protección contra ataques DDoS, encriptación SSL/TLS y auditorías de seguridad.</p>
            </div>

            <div className="md:col-span-2 rounded-3xl border border-[#222] bg-[#0A0A0A] p-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-500" />
              <Database className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">CMS Personalizado y Arquitectura</h3>
              <p className="text-[#888] leading-relaxed max-w-md">
                Olvídate de WordPress genéricos. Construimos gestores de contenido a medida (Headless CMS) que te permiten administrar tu sitio con total libertad, sin comprometer el rendimiento ni la seguridad.
              </p>
            </div>

            <div className="md:col-span-3 rounded-3xl border border-[#222] bg-[#111] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-6">El Proceso de Construcción</h4>
                <div className="flex flex-col sm:flex-row gap-6">
                  {['Arquitectura de Información', 'Diseño UI/UX Custom', 'Desarrollo Frontend/Backend', 'Migración y Despliegue'].map((step, idx) => (
                    <div key={idx} className="flex-1">
                      <div className="text-blue-500 font-black text-2xl mb-2">0{idx + 1}</div>
                      <div className="text-sm text-[#aaa] font-medium">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="flex md:justify-end">
            <Link href="/formulario/web-corporativa" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300">
              Iniciar Proyecto Corporativo <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>


        {/* =========================================
            SERVICE 3: E-COMMERCE & VENTAS
            ========================================= */}
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          {/* Header Block */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">E-commerce <br/> Optimizado.</h2>
            <p className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed">
              Tiendas online rápidas, seguras y preparadas para alto tráfico. Eliminamos la fricción en el proceso de compra e integramos los métodos de pago que tus clientes prefieren.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Main Feature */}
            <div className="md:col-span-2 rounded-3xl border border-[#222] bg-[#0A0A0A] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[80px] rounded-full group-hover:bg-fuchsia-500/20 transition-colors duration-500" />
              <CreditCard className="w-12 h-12 text-fuchsia-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Pagos sin Fricción (Checkouts)</h3>
              <p className="text-[#888] leading-relaxed max-w-md">
                Diseñamos un proceso de pago en un solo paso, reduciendo el abandono del carrito. Integraciones directas con Webpay, Stripe, MercadoPago y múltiples pasarelas locales.
              </p>
            </div>
            
            {/* Secondary Features */}
            <div className="rounded-3xl border border-[#222] bg-[#0A0A0A] p-8 flex flex-col justify-center">
              <Box className="w-10 h-10 text-fuchsia-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-3">Gestión de Stock</h3>
              <p className="text-sm text-[#888]">Sincronización de inventario en tiempo real con tu sistema ERP.</p>
            </div>
            
            <div className="rounded-3xl border border-[#222] bg-[#0A0A0A] p-8 flex flex-col justify-center">
              <Search className="w-10 h-10 text-fuchsia-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-3">SEO E-commerce</h3>
              <p className="text-sm text-[#888]">Schema markup para productos y optimización de URLs.</p>
            </div>

            <div className="md:col-span-2 rounded-3xl border border-[#222] bg-[#111] p-8 flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold mb-2">Tech Stack</h4>
                <div className="flex gap-3">
                  {['Shopify', 'Next.js Commerce', 'Stripe', 'Tailwind'].map(tech => (
                    <span key={tech} className="text-xs font-semibold px-3 py-1 bg-[#222] text-[#aaa] rounded-lg border border-[#333]">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="hidden sm:block text-5xl font-black text-[#222]">03</div>
            </div>
          </div>

          <Link href="/formulario/ecommerce" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-fuchsia-500 hover:text-white transition-colors duration-300">
            Cotizar Tienda Online <ArrowRight size={18} />
          </Link>
        </motion.div>


        {/* =========================================
            SERVICE 4: SAAS & SISTEMAS
            ========================================= */}
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
        >
          {/* Header Block */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Sistemas Custom <br/> y Plataformas SaaS.</h2>
            <p className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed">
              Materializamos ideas complejas. Desde plataformas de software como servicio (SaaS) hasta ERPs internos y dashboards analíticos en tiempo real, diseñados para procesar millones de peticiones.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Main Feature */}
            <div className="md:col-span-2 rounded-3xl border border-[#222] bg-[#0A0A0A] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-colors duration-500" />
              <Layers className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Arquitectura Cloud y Microservicios</h3>
              <p className="text-[#888] leading-relaxed max-w-md">
                Diseñamos infraestructuras serverless y distribuidas capaces de escalar automáticamente según la demanda de tus usuarios, garantizando un uptime del 99.99%.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {['Bases de Datos Relacionales', 'APIs REST / GraphQL', 'Autenticación Segura (JWT)', 'Websockets / Tiempo real'].map(feat => (
                  <div key={feat} className="flex items-center gap-2 text-sm text-[#aaa]">
                    <CheckCircle2 size={16} className="text-emerald-500" /> {feat}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Secondary Features */}
            <div className="rounded-3xl border border-[#222] bg-[#0A0A0A] p-8 flex flex-col justify-between">
              <div>
                <Server className="w-10 h-10 text-emerald-400 mb-5" />
                <h3 className="text-xl font-bold text-white mb-3">Integraciones API</h3>
                <p className="text-sm text-[#888] mb-6">Conectamos tu sistema con Stripe, AWS, SendGrid, OpenAI y cualquier API externa que tu negocio necesite.</p>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Tech Core</h4>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'PostgreSQL', 'Prisma', 'Docker', 'AWS', 'Redis'].map(tech => (
                    <span key={tech} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <Link href="/contacto" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-emerald-500 hover:text-white transition-colors duration-300">
            Contactar para Evaluación Técnica <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
