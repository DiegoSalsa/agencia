'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import type { Lang, Currency } from '@/lib/i18n';

const currencies: Currency[] = ['CLP', 'USD', 'EUR', 'MXN', 'ARS', 'COP', 'PEN', 'BRL'];

export default function LocaleSelector() {
  const { lang, currency, setLang, setCurrency, t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <button
        onClick={() => setOpen(!open)}
        className="bg-card-dark/90 backdrop-blur-md border border-white/10 rounded-full p-3 cursor-pointer hover:border-primary/50 transition-all shadow-xl"
      >
        <span className="material-symbols-outlined text-white text-xl">language</span>
      </button>

      {open && (
        <div className="flex flex-col gap-4 bg-[#0f0f0f] backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl min-w-[220px]">
          {/* Language */}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-2">{t('lang_select')}</label>
            <div className="flex gap-2">
              {(['es', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    lang === l ? 'bg-primary text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-2">{t('currency_select')}</label>
            <div className="grid grid-cols-2 gap-2">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    currency === c ? 'bg-primary text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
