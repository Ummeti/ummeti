import { useTranslations } from 'next-intl';

export default function Headings() {
  const t = useTranslations('ContactPage');

  return (
    <div className="max-w-2xl text-center mb-8">
      <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
      <p className="text-lg text-gray-600">{t('description')}</p>
    </div>
  );
}
