'use client';

import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useTransition, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import {
  ArFlagIcon,
  EnFlagIcon,
  IdFlagIcon,
  RuFlagIcon,
  TrFlagIcon,
} from '../icons/FlagIcons';

export default function LocaleDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const localeIcons = {
    en: <EnFlagIcon />,
    tr: <TrFlagIcon />,
    ar: <ArFlagIcon />,
    id: <IdFlagIcon />,
    ru: <RuFlagIcon />,
  };

  const localeNames = {
    en: 'English',
    tr: 'Türkçe',
    ar: 'العربية',
    id: 'Indonesia',
    ru: 'Русский',
  };

  const switchLocale = (newLocale) => {
    if (newLocale !== currentLocale) {
      startTransition(() => {
        router.push(pathname, { locale: newLocale });
        setIsOpen(false);
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 border px-3 py-1 text-sm font-medium rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-expanded={isOpen}
        aria-label={`Current language: ${
          localeNames[currentLocale] || currentLocale
        }, click to change`}
      >
        {localeIcons[currentLocale]}
        {localeNames[currentLocale] || currentLocale}
        <span
          className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 overflow-hidden">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              disabled={isPending || locale === currentLocale}
              className="w-full flex items-center gap-2 border-b last:border-b-0 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {localeIcons[locale]}
              {localeNames[locale] || locale}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
