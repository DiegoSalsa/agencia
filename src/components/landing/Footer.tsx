'use client';

import Image from 'next/image';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer id="footer" className="w-full border-t border-[var(--border)] bg-[var(--bg)] pt-16 pb-10">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/img/logo.svg" alt="PuroCode Logo" width={32} height={32} className="h-8 w-auto" />
              <span className="font-bold text-lg text-[var(--text)]">PuroCode</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t('footer_desc')}</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/purocodecl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[rgba(var(--primary-rgb),0.3)] transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/PuroCode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[rgba(var(--primary-rgb),0.3)] transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://wa.me/56956994930"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#25D366] hover:border-[#25D366]/30 transition-all cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-[var(--text)]">{t('footer_services')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
              <li><a className="hover:text-[var(--primary)] transition-colors cursor-pointer" href="#servicios">{t('nav_services')}</a></li>
              <li><a className="hover:text-[var(--primary)] transition-colors cursor-pointer" href="#portafolio">{t('nav_portfolio')}</a></li>
              <li><a className="hover:text-[var(--primary)] transition-colors cursor-pointer" href="#planes">{t('nav_pricing')}</a></li>
              <li><a className="hover:text-[var(--primary)] transition-colors cursor-pointer" href="#proceso">{t('nav_process')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-[var(--text)]">{t('footer_contact')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
              <li><a className="hover:text-[var(--primary)] transition-colors cursor-pointer" href="mailto:contactopurocode@gmail.com">contactopurocode@gmail.com</a></li>
              <li><a className="hover:text-[var(--primary)] transition-colors cursor-pointer" href="https://wa.me/56956994930" target="_blank" rel="noopener noreferrer">+56 9 5699 4930</a></li>
              <li><a className="hover:text-[var(--primary)] transition-colors cursor-pointer" href="https://wa.me/56934908579" target="_blank" rel="noopener noreferrer">+56 9 3490 8579</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-[var(--text)]">{t('footer_company')}</h3>
            <ul className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
              <li><a className="hover:text-[var(--primary)] transition-colors cursor-pointer" href="#contacto">{t('nav_contact')}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-tertiary)] text-sm">&copy; {new Date().getFullYear()} PuroCode. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}
