'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type Lang, type Currency, TRANSLATIONS, CURRENCY_CONFIG, COUNTRY_CURRENCY, COUNTRY_LANG, formatPrice as formatPriceFn, detectCountry } from '@/lib/i18n';
import { getCookie, setCookie } from '@/lib/cookies';

interface I18nContextType {
  lang: Lang;
  currency: Currency;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  formatPrice: (priceInCLP: number) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');
  const [currency, setCurrencyState] = useState<Currency>('CLP');

  useEffect(() => {
    const savedLang = getCookie('userLang') as Lang | null;
    const savedCurrency = getCookie('userCurrency') as Currency | null;

    if (savedLang && savedCurrency) {
      setLangState(savedLang);
      setCurrencyState(savedCurrency);
    } else {
      detectCountry().then(({ currency: c, lang: l }) => {
        setLangState(l);
        setCurrencyState(c);
        setCookie('userLang', l, 30);
        setCookie('userCurrency', c, 30);
      });
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setCookie('userLang', l, 30);
  }, []);

  const t = useCallback((key: string) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.es[key] || key;
  }, [lang]);

  const formatPrice = useCallback((priceInCLP: number) => {
    return formatPriceFn(priceInCLP, currency);
  }, [currency]);

  return (
    <I18nContext.Provider value={{ lang, currency, setLang, t, formatPrice }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
