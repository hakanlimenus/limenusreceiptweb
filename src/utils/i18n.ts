// src/utils/i18n.ts
import tr from '@/locales/tr.json';
import en from '@/locales/en.json';

export function getTranslations(lang: string): Record<string, string> {
  const dict = lang.toUpperCase() === 'EN' ? en : tr;
  return dict;
}