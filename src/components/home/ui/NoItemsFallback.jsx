import { useTranslations } from 'next-intl';

export default function NoItemsFallback() {
  const t = useTranslations('noItemsFallback');

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900 mb-3">
        {t('heading')}
      </h3>
      <p className="text-gray-600 mb-4 max-w-md">{t('message')}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4rem"
        height="4rem"
        viewBox="0 0 24 24"
        stroke="#9ca3af"
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
  );
}
