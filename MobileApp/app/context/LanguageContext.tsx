import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface LanguageContextType {
  isSinhala: boolean;
  toggleLanguage: () => void;
  t: (text: string) => string;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  isSinhala: false,
  toggleLanguage: () => {},
  t: (text) => text,
  isTranslating: false,
});

// ✅ Switched to Google Translate unofficial API — works on Android, no key needed
const translateText = async (text: string): Promise<string> => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=si&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0][0][0] ?? text;
  } catch (err) {
    console.log('Translation error for:', text, err);
    return text; // fallback to English
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isSinhala, setIsSinhala] = useState(false);
  const [cache, setCache] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const pendingTexts = useRef<Set<string>>(new Set());

  const t = useCallback((text: string): string => {
    pendingTexts.current.add(text);
    if (!isSinhala) return text;
    return cache[text] ?? text;
  }, [isSinhala, cache]);

  const toggleLanguage = useCallback(async () => {
    const next = !isSinhala;
    setIsSinhala(next);

    if (!next) return; // back to English, no API call needed

    // find texts not yet translated
    const textsToTranslate = [...pendingTexts.current].filter(t => !cache[t]);

    if (textsToTranslate.length === 0) return;

    setIsTranslating(true);

    try {
      // ✅ translate one by one to avoid rate limiting
      const newEntries: Record<string, string> = {};

      for (const text of textsToTranslate) {
        const translated = await translateText(text);
        newEntries[text] = translated;
      }

      setCache(prev => ({ ...prev, ...newEntries }));

    } catch (err) {
      console.log('Batch translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  }, [isSinhala, cache]);

  return (
    <LanguageContext.Provider value={{ isSinhala, toggleLanguage, t, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
