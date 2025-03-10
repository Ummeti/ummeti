'use client';

import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Breadcrumb() {
  const t = useTranslations('Header');
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const supportedLocales = routing.locales;
  let cleanedSegments = [...pathSegments];

  if (supportedLocales.includes(cleanedSegments[0])) {
    cleanedSegments = cleanedSegments.slice(1);
  }

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex overflow-hidden rounded-lg border border-gray-300 text-white">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex h-10 items-center gap-1.5 bg-main px-4 transition hover:text-white/75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="ms-1.5 text-xs font-medium uppercase">
              {t('home')}
            </span>
          </Link>
        </li>
        {cleanedSegments.map((segment, index) => {
          const isLast = index === cleanedSegments.length - 1;
          const href = '/' + cleanedSegments.slice(0, index + 1).join('/');
          const decodedSegment = decodeURIComponent(segment).replace(/-/g, ' ');

          return (
            <li key={href} className="relative flex items-center">
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-main [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>
              <Link
                href={href}
                className={`flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition uppercase text-gray-600 ${
                  isLast ? 'text-gray-600' : 'hover:text-gray-900'
                }`}
              >
                {decodedSegment}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
