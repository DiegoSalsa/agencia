'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  highlight?: string;
  badge?: React.ReactNode;
  breadcrumb?: { label: string; href: string }[];
}

export default function PageHeader({ title, subtitle, highlight, badge, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-[#1A1A1A] bg-[#050505]">
      {/* Very subtle architectural lines, no neon glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0A0A0A] to-transparent opacity-50" />
      </div>

      <div className="px-6 max-w-[1200px] w-full mx-auto relative z-10 flex flex-col items-start">
        
        {/* Breadcrumbs - Clean and corporate */}
        {breadcrumb && (
          <motion.div 
            className="flex items-center gap-2 text-xs font-medium text-[#666] mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            {breadcrumb.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ChevronRight size={14} className="text-[#444]" />
                {idx === breadcrumb.length - 1 ? (
                  <span className="text-white font-semibold">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-white max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}{' '}
          {highlight && (
            <span className="text-white opacity-60">
              {highlight}
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[#888] text-lg md:text-xl leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        
      </div>
    </section>
  );
}
