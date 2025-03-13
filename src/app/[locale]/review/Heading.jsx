import { useTranslations } from 'next-intl';

export default function Heading() {
  const t = useTranslations('ReviewPage');
  return (
    <h2 className="text-center text-gray-900 text-2xl font-bold mb-6">
      {t('title')}
    </h2>
  );
}
