'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface SaasProject {
  href: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  gradient: string;
  features: string[];
  status: 'Live' | 'Beta' | 'En Desarrollo';
  thumbnail: string;
}

const saasProjects: SaasProject[] = [
  {
    href: 'https://www.puragenda.cl/',
    title: 'Puragenda',
    description: 'Sistema integral de reservas y gestión diseñado específicamente para centros de estética, barberías y clínicas. Automatiza agendamientos, recordatorios por WhatsApp y control financiero en una plataforma intuitiva.',
    tag: 'SaaS / Health & Beauty',
    tagColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    gradient: 'from-indigo-600/40 via-blue-600/30 to-violet-800/40',
    status: 'Live',
    features: [
      'Agendamiento online 24/7',
      'Recordatorios automatizados',
      'Gestión de equipo y comisiones',
      'Reportes financieros en tiempo real'
    ],
    thumbnail: '/img/FotosPaginas/Puragenda.png'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function Labs() {
  const { ref, isVisible } = useInView();

  return (
    <section id="labs" ref={ref} className="relative py-24 px-6 overflow-hidden bg-[var(--bg)]">
      {/* Premium background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_60%)] opacity-70" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-32 lg:gap-48 mt-12">
          {saasProjects.map((project, i) => {
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={project.title}
                className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
                {/* Live Real-time Iframe Section */}
                <div className="w-full lg:w-[55%]">
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="block relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl transition-transform duration-700 hover:scale-[1.02] hover:shadow-[rgba(var(--primary-rgb),0.1)]">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.thumbnail || '/img/placeholder.png'}
                        alt={`Vista de ${project.title}`}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110 bg-[#111]"
                        loading="lazy"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 mix-blend-overlay z-10 pointer-events-none`} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ExternalLink size={24} className="text-white" />
                      </div>
                    </div>
                  </a>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${project.tagColor} bg-transparent`}>
                      {project.tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)]">
                      {project.status === 'Live' ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl sm:text-5xl font-black text-[var(--text)] mb-6 tracking-tight leading-[1.1]">
                    {project.title}
                  </h3>
                  
                  <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-3 mb-10 w-full">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0" />
                        <span className="text-sm font-medium text-[var(--text-secondary)]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group flex items-center gap-2 h-12 px-6 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all"
                  >
                    <span>Visitar Plataforma</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* CTA Banner Bottom */}
        <motion.div 
          className="mt-32 p-8 sm:p-12 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-hover)] to-transparent flex flex-col items-center text-center relative overflow-hidden"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={4}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none" />
          <Rocket className="w-12 h-12 text-[var(--primary)] mb-6" />
          <h4 className="text-2xl sm:text-3xl font-black text-[var(--text)] mb-4">¿Buscas una solución SaaS a medida?</h4>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-8">Nuestra experiencia construyendo nuestros propios productos nos permite entender a la perfección los desafíos de crear, lanzar y escalar plataformas SaaS para nuestros clientes.</p>
          <a href="https://wa.me/56949255006" target="_blank" rel="noopener noreferrer" className="btn-secondary h-12 px-8 rounded-xl font-bold flex items-center gap-2">
            <span>Hablemos de tu idea</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
