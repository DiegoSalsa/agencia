'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/context/I18nContext';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Header() {
  const { t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const openMobile = () => {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const navLinks = [
    { href: '#servicios', label: t('nav_services') },
    { href: '#portafolio', label: t('nav_portfolio') },
    { href: '#proceso', label: 'Proceso' },
    { href: '#precios', label: t('nav_pricing') },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 ${
          scrolled ? 'scrolled' : ''
        }`}
      >
        <nav className="flex w-full max-w-[1200px] items-center justify-between glass rounded-full px-6 py-2">
          <Link href="/#hero" className="flex items-center gap-2">
            <Image src="/img/logo.svg" alt="PuroCode Logo" width={32} height={32} className="h-8 w-auto" />
            <span className="text-text-primary font-bold text-lg tracking-tight">PuroCode</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="text-text-muted hover:text-text-primary text-sm font-medium transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <a
              href="#contacto"
              className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-5 btn-primary text-sm font-semibold"
            >
              {t('nav_cta')}
            </a>
            <button onClick={openMobile} className="md:hidden flex items-center justify-center text-text-primary">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-0 z-[60] bg-bg/95 backdrop-blur-lg md:hidden ${
          mobileOpen ? 'active' : ''
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-text-primary text-lg font-extrabold">PuroCode</h2>
            <button onClick={closeMobile} className="text-text-primary">
              <X className="w-7 h-7" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="text-2xl text-text-primary font-bold hover:text-primary transition-colors"
                href={link.href}
                onClick={closeMobile}
              >
                {link.label}
              </a>
            ))}
            <a className="text-2xl text-text-primary font-bold hover:text-primary transition-colors" href="#contacto" onClick={closeMobile}>
              {t('nav_contact')}
            </a>
          </nav>
          <div className="mt-auto flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-12 h-12 rounded-xl border border-border-default text-text-muted hover:text-text-primary transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href="#contacto" onClick={closeMobile} className="flex-1 py-4 btn-primary text-center font-bold rounded-xl">
              {t('nav_cta')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
