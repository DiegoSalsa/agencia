'use client';

import Image from 'next/image';
import { useI18n } from '@/context/I18nContext';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-white/5 bg-background-dark pt-20 pb-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/img/logo.svg" alt="PuroCode Logo" width={32} height={32} className="h-8 w-auto" />
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">{t('footer_desc')}</p>
            <div className="flex gap-4">
              {/* LinkedIn */}
              <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 transition-all" href="#">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              {/* GitHub */}
              <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 transition-all" href="#">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              {/* X/Twitter */}
              <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 transition-all" href="#">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H14.07l-5.214-6.817L3.99 21.75H.68l7.73-8.835L.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase">{t('footer_services')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#servicios">{t('nav_services')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#portafolio">{t('nav_portfolio')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#precios">{t('nav_pricing')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#proceso">Proceso</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase">{t('footer_company')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">Sobre Nosotros</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Carreras</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase">Soporte</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">Centro de Ayuda</a></li>
              <li><a className="hover:text-primary transition-colors" href="#contacto">{t('nav_contact')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">© 2026 PuroCode. {t('footer_rights')}</p>
          <div className="flex items-center gap-6">
            <a className="text-slate-600 hover:text-slate-400 text-xs font-medium transition-colors" href="#">Términos</a>
            <a className="text-slate-600 hover:text-slate-400 text-xs font-medium transition-colors" href="#">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
