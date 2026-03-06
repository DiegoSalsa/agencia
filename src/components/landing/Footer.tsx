'use client';

import Image from 'next/image';
import { useI18n } from '@/context/I18nContext';
import { Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-border-default bg-bg pt-20 pb-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/img/logo.svg" alt="PuroCode Logo" width={32} height={32} className="h-8 w-auto" />
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{t('footer_desc')}</p>
            <div className="flex gap-3">
              <a className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all" href="#" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all" href="#" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all" href="#" aria-label="X / Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase text-text-primary">{t('footer_services')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-text-muted">
              <li><a className="hover:text-primary transition-colors" href="#servicios">{t('nav_services')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#portafolio">{t('nav_portfolio')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#precios">{t('nav_pricing')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#proceso">Proceso</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase text-text-primary">{t('footer_company')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-text-muted">
              <li><a className="hover:text-primary transition-colors" href="#">Sobre Nosotros</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Carreras</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase text-text-primary">Soporte</h3>
            <ul className="flex flex-col gap-2 text-sm text-text-muted">
              <li><a className="hover:text-primary transition-colors" href="#">Centro de Ayuda</a></li>
              <li><a className="hover:text-primary transition-colors" href="#contacto">{t('nav_contact')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-default flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">© 2026 PuroCode. {t('footer_rights')}</p>
          <div className="flex items-center gap-6">
            <a className="text-text-muted hover:text-text-secondary text-xs font-medium transition-colors" href="#">Términos</a>
            <a className="text-text-muted hover:text-text-secondary text-xs font-medium transition-colors" href="#">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
