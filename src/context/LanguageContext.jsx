"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { translations } from '../translations';
import { pagesTranslations } from '../translations/pagesTranslations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  // Ambil language dari URL segment pertama (contoh: /en/wisata -> 'en')
  // Fallback ke 'id' jika undefined
  const language = params?.lang || 'id';

  const setLanguage = (newLang) => {
    if (!pathname) return;
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    const segments = pathname.split('/');
    // pathname selalu mulai dengan / (contoh: ['', 'id', 'wisata'])
    if (segments.length >= 2) {
      segments[1] = newLang;
      router.push(segments.join('/'));
    }
  };

  useEffect(() => {
    // Update attribute lang pada html element untuk SEO & Geo-targeting
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Helper function t yang kuat (Mendukung nested keys dari translations & pagesTranslations)
  const t = (key) => {
    if (!key) return '';
    const keys = key.split('.');
    
    const resolve = (obj) => {
      let curr = obj;
      for (const k of keys) {
        if (curr && curr[k] !== undefined) {
          curr = curr[k];
        } else {
          return undefined;
        }
      }
      return curr;
    };

    // 1. Cari di translations[language]
    let res = resolve(translations[language]);
    if (res !== undefined) return res;

    // 2. Cari di pagesTranslations[language]
    res = resolve(pagesTranslations[language]);
    if (res !== undefined) return res;

    // 3. Fallback ke translations['id']
    res = resolve(translations['id']);
    if (res !== undefined) return res;

    // 4. Fallback ke pagesTranslations['id']
    res = resolve(pagesTranslations['id']);
    if (res !== undefined) return res;

    // Jika tidak ditemukan sama sekali, kembalikan undefined agar operasi fallback seperti (t('...') || []) aman dan tidak crash (.map is not a function)
    return undefined;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage harus digunakan di dalam LanguageProvider');
  }
  return context;
}
