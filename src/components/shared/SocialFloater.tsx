'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Instagram, Facebook, X, ChevronUp } from 'lucide-react';

const whatsappContacts = [
  { name: 'PuroCode', phone: '56949255006', label: '+56 9 4925 5006' },
];

export default function SocialFloater() {
  const [visible, setVisible] = useState(true);
  const [wspOpen, setWspOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);

      // Hide floater when the bottom of the viewport reaches the contact or footer section
      const contact = document.getElementById('contacto');
      const footer = document.getElementById('footer');
      const target = contact || footer;
      if (!target) return;

      const targetTop = target.getBoundingClientRect().top;
      // Hide when the target section enters the bottom 200px of the viewport
      setVisible(targetTop > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3 items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* WhatsApp Selector Popup */}
          <AnimatePresence>
            {wspOpen && (
              <motion.div
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden mb-2 w-56"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--text)]">WhatsApp</span>
                  <button onClick={() => setWspOpen(false)} className="text-[var(--text-tertiary)] hover:text-[var(--text)] cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
                {whatsappContacts.map((c) => (
                  <a
                    key={c.phone}
                    href={`https://wa.me/${c.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                      <MessageCircle size={14} className="text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text)]">{c.name}</p>
                      <p className="text-[11px] text-[var(--text-tertiary)]">{c.label}</p>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            {/* Scroll to top */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  onClick={scrollToTop}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] flex items-center justify-center shadow-lg hover:scale-110 hover:text-[var(--text)] transition-all cursor-pointer"
                  aria-label="Volver arriba"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronUp size={22} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* WhatsApp */}
            <button
              onClick={() => setWspOpen(!wspOpen)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              aria-label="WhatsApp"
            >
              <MessageCircle size={22} />
            </button>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/purocodecl/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/PuroCode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
