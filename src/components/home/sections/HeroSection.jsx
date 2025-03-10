'use client';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <section className="relative h-[calc(100vh-314px)]">
      <div className="absolute inset-0 bg-cover bg-center bg-[url(/bg-1.jpg)] bg-fixed"></div>

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
        <motion.h1
          className="text-4xl font-bold mb-4 drop-shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mb-6 text-lg drop-shadow-2xl"
        >
          {t('description')}
        </motion.p>

        <motion.div
          className="px-6 py-3 bg-main hover:bg-main-light text-white font-semibold rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <Link href="/projects">{t('button')}</Link>
        </motion.div>
      </div>
    </section>
  );
}
