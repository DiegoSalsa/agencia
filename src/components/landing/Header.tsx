'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown, Code, Settings2, Globe, Beaker } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useTheme } from '@/context/ThemeContext';
import type { Lang } from '@/lib/i18n';

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
    { href: '/servicios', label: t('nav_services') },
    { 
      label: t('nav_portfolio'),
      dropdown: [
        { href: '/portafolio', label: t('nav_dropdown_web'), icon: Globe },
        { href: '/labs', label: t('nav_dropdown_saas'), icon: Beaker },
      ]
    },
    { href: '/proceso', label: t('nav_process') },
    { 
      label: t('nav_pricing'),
      dropdown: [
        { href: '/planes', label: t('nav_dropdown_dev'), icon: Code },
        { href: '/mantenimiento', label: t('nav_dropdown_maint'), icon: Settings2 },
      ]
    },
    { href: '/faq', label: t('nav_faq') },
    { href: '/contacto', label: t('nav_contact') },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ${
          scrolled ? 'py-1.5 scrolled' : 'py-4'
        }`}
        style={{ top: 'var(--promo-banner-height, 0px)' }}
      >
        <nav className={`flex w-full max-w-[1200px] items-center justify-between px-6 transition-all duration-500 relative ${
          scrolled
            ? 'py-2 rounded-xl bg-white/85 dark:bg-[rgba(9,9,11,0.9)] backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.06] shadow-lg shadow-black/8 dark:shadow-black/20'
            : 'py-2.5 rounded-2xl nav-glass'
        }`}>
          {/* Logo */}
          <Link href="/#hero" className="flex items-center gap-2.5">
            <Image src="/img/logo.svg" alt="PuroCode Logo" width={32} height={32} className="h-8 w-auto dark:brightness-100 brightness-0" priority />
            <span className="font-bold text-lg tracking-tight text-[var(--text)]">PuroCode</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div 
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text)] text-sm font-medium transition-colors cursor-pointer py-4">
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[280px] bg-white dark:bg-[#111] border border-black/[0.08] dark:border-[#222] rounded-2xl shadow-xl overflow-hidden py-2"
                      >
                        {link.dropdown.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link 
                              key={item.href} 
                              href={item.href}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-hover)] transition-colors group/item"
                              onClick={() => setDropdownOpen(null)}
                            >
                              <div className="w-8 h-8 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center shrink-0 group-hover/item:text-[var(--primary)] text-[var(--text-secondary)] transition-colors">
                                <Icon size={16} />
                              </div>
                              <span className="text-sm font-medium text-[var(--text)] group-hover/item:text-[var(--primary)] transition-colors">
                                {item.label}
                              </span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  className="text-[var(--text-secondary)] hover:text-[var(--text)] text-sm font-medium transition-colors cursor-pointer"
                  href={link.href!}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right: Theme Toggle + Locale + CTA + Mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="hidden md:flex w-10 h-10 rounded-xl items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Language Toggle */}
            <div className="hidden sm:flex items-center bg-[var(--surface-hover)] rounded-xl p-0.5">
              {(['es', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    lang === l
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  {l === 'es' ? 'ES' : 'EN'}
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <Link href="/formulario" className="btn-primary text-sm !py-2.5 !px-5 !rounded-xl cursor-pointer">
                {t('nav_cta')}
              </Link>
            </div>

            <button onClick={openMobile} className="md:hidden flex items-center justify-center w-10 h-10 text-[var(--text)] cursor-pointer" aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-[60] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobile} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[var(--bg)] border-l border-[var(--border)] shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-10">
                  <span className="font-bold text-lg text-[var(--text)]">PuroCode</span>
                  <button onClick={closeMobile} className="text-[var(--text)] cursor-pointer" aria-label="Close menu"><X size={24} /></button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    link.dropdown ? (
                      <div key={link.label} className="flex flex-col">
                        <button 
                          className="flex items-center justify-between text-lg font-semibold text-[var(--text)] py-3 px-4 rounded-xl hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                        >
                          {link.label}
                          <ChevronDown size={18} className={`transition-transform duration-300 ${mobileDropdownOpen === link.label ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileDropdownOpen === link.label && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pl-4 pb-2">
                                {link.dropdown.map(item => (
                                  <Link 
                                    key={item.href}
                                    href={item.href}
                                    className="text-[var(--text-secondary)] hover:text-[var(--text)] py-2.5 px-4 rounded-xl hover:bg-[var(--surface-hover)] transition-colors text-base"
                                    onClick={closeMobile}
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.1 }}>
                        <Link className="block text-lg font-semibold text-[var(--text)] hover:text-[var(--primary)] py-3 px-4 rounded-xl hover:bg-[var(--surface-hover)] transition-colors cursor-pointer" href={link.href!} onClick={closeMobile}>
                          {link.label}
                        </Link>
                      </motion.div>
                    )
                  ))}
                  </nav>
                <button onClick={toggleTheme} className="mt-6 flex items-center gap-3 py-3 px-4 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer">
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  <span className="text-sm font-medium">{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
                </button>

                {/* Mobile Language Toggle */}
                <div className="mt-4 px-4">
                  <label className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-bold block mb-1.5">{t('lang_select')}</label>
                  <div className="flex gap-1.5">
                    {(['es', 'en'] as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          lang === l
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
                        }`}
                      >
                        {l === 'es' ? 'ES' : 'EN'}
                      </button>
                    ))}
                  </div>
                </div>
                <Link href="/formulario" onClick={closeMobile} className="btn-primary mt-auto text-center justify-center !rounded-xl">
                  {t('nav_cta')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
