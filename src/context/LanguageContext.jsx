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
  // Fallback ke 'id' jika undefined atau di root/unprefixed path
  const language = params?.lang || 'id';

  // Helper untuk menghasilkan URL yang tepat sesuai bahasa aktif
  // Jika bahasa 'id', URL tidak menggunakan prefix '/id' (contoh: '/wisata', '/')
  // Jika bahasa lain ('en', 'ms', 'zh'), URL menggunakan prefix (contoh: '/en/wisata', '/en')
  const getHref = (path = '/') => {
    if (!path || path === '/') {
      return language === 'id' ? '/' : `/${language}`;
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (language === 'id') {
      return cleanPath;
    }
    return `/${language}${cleanPath}`;
  };

  const setLanguage = (newLang) => {
    if (!pathname) return;
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;

    const nonDefaultLocales = ['en', 'ms', 'zh', 'id'];
    const segments = pathname.split('/').filter(Boolean);

    let pathWithoutLocale = pathname;
    if (segments.length > 0 && nonDefaultLocales.includes(segments[0])) {
      pathWithoutLocale = '/' + segments.slice(1).join('/');
    }
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    let targetPath = '';
    if (newLang === 'id') {
      targetPath = pathWithoutLocale || '/';
    } else {
      targetPath = `/${newLang}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }

    router.push(targetPath);
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

    // Jika tidak ditemukan sama sekali, kembalikan undefined agar operasi fallback aman
    return undefined;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getHref }}>
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

