'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ProgressBar({ raised, goal }) {
  const t = useTranslations('ProjectsSection');

  const progressPercentage = Math.min(Math.round((raised / goal) * 100), 100);
  return (
    <div className="space-y-2">
      <div className="text-gray-900 flex justify-between">
        <span className="font-bold">${raised}</span>
        <span className="font-medium text-gray-600 uppercase">
          ${goal} {t('projectCard.goal')}
        </span>
      </div>
      <div className="bg-main-lightest relative h-4 rounded-lg">
        <motion.div
          className="bg-main h-4 rounded-lg"
          initial={{ width: 0 }}
          whileInView={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        ></motion.div>
        <div className="absolute right-0 font-semibold">
          {progressPercentage}%
        </div>
      </div>
    </div>
  );
}
