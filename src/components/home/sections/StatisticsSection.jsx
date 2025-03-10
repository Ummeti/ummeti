'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function StatisticsSection() {
  const t = useTranslations('StatisticsSection');

  const stats = [
    { label: t('projects'), value: 150 },
    { label: t('supporters'), value: 5000 },
    { label: t('served'), value: 25000 },
  ];

  return (
    <section className="p-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center rounded-lg shadow-sm bg-second-lightest overflow-hidden">
        {stats.map((stat, idx) => (
          <StatCard key={idx} label={stat.label} value={stat.value} />
        ))}
        <div className="flex-1 p-8 text-center bg-main text-white">
          <motion.h3
            className="text-xl font-semibold"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {t('ctaTitle')}
          </motion.h3>
          <motion.p
            className="mt-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <Link href="/#volunteer" className="text-white underline">
              {t('ctaLink')}
            </Link>
            <span className="text-white"> →</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= value) {
          clearInterval(interval);
          return value;
        }
        return prev + Math.ceil(value / 50);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div
      className="flex-1 p-8 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-4xl font-bold text-main">{count}</h2>
      <div className="w-12 mx-auto border-t-2 border-black mt-2 mb-4"></div>
      <p className="text-gray-600 capitalize">{label}</p>
    </motion.div>
  );
}
