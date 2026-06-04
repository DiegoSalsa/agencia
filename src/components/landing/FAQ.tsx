'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const faqData = [
  { questionKey: 'faq_q1', answerKey: 'faq_a1' },
  { questionKey: 'faq_q2', answerKey: 'faq_a2' },
  { questionKey: 'faq_q3', answerKey: 'faq_a3' },
  { questionKey: 'faq_q8', answerKey: 'faq_a8' },
  { questionKey: 'faq_q4', answerKey: 'faq_a4' },
  { questionKey: 'faq_q5', answerKey: 'faq_a5' },
  { questionKey: 'faq_q6', answerKey: 'faq_a6' },
  { questionKey: 'faq_q9', answerKey: 'faq_a9' },
  { questionKey: 'faq_q7', answerKey: 'faq_a7' },
];

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border border-[var(--border)] bg-[var(--bg-secondary)] rounded-none overflow-hidden transition-colors hover:border-[rgba(var(--primary-rgb),0.3)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
      >
        <span className="text-[15px] font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-snug">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180 text-[var(--text)]' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  // Split FAQs into two columns
  const midPoint = Math.ceil(faqData.length / 2);
  const leftCol = faqData.slice(0, midPoint);
  const rightCol = faqData.slice(midPoint);

  return (
    <section id="faq" ref={ref} className="py-24 px-6 bg-[var(--bg)]">
      <motion.div
        className="max-w-[1200px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--text)] text-[var(--bg)] text-[10px] font-bold tracking-widest uppercase mb-5">
            <HelpCircle size={14} />
            {t('faq_tag')}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-6 tracking-tight">
            {t('faq_title')}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {t('faq_subtitle')}
          </p>
        </div>

        {/* 2 Column FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="space-y-4">
            {leftCol.map((faq, i) => (
              <FaqItem
                key={faq.questionKey}
                question={t(faq.questionKey)}
                answer={t(faq.answerKey)}
                index={i}
              />
            ))}
          </div>
          <div className="space-y-4">
            {rightCol.map((faq, i) => (
              <FaqItem
                key={faq.questionKey}
                question={t(faq.questionKey)}
                answer={t(faq.answerKey)}
                index={i + leftCol.length}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
