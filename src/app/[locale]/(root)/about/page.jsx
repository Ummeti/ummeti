'use client';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/widgets/Breadcrumb';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('AboutPage');

  return (
    <motion.section
      className="px-4 sm:px-6 md:px-8 mx-auto mt-20 max-w-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
    >
      <Breadcrumb />

      <div className="mt-4 grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
        <motion.div
          className="relative aspect-video rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            className="object-cover"
            src="/bg-4.jpg"
            alt={t('heroImageAlt')}
            fill
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 lg:items-start items-center text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-gray-900 text-3xl font-bold font-manrope leading-normal">
            {t('title')}
          </h1>
          <p className="text-gray-500 text-base font-normal leading-relaxed">
            {t('description')}
          </p>
          {/* Stats */}
          <div className="w-full flex justify-center lg:justify-start gap-10">
            {[
              { number: '33+', label: t('stats.projects') },
              { number: '125+', label: t('stats.supporters') },
              { number: '52+', label: t('stats.peopleServed') },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <h2 className="text-gray-900 text-3xl font-bold font-manrope">
                  {item.number}
                </h2>
                <h3 className="text-gray-500 text-base font-normal">
                  {item.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {[
            {
              title: t('sections.vision.title'),
              content: t('sections.vision.content'),
            },
            {
              title: t('sections.objectives.title'),
              content: t('sections.objectives.content'),
            },
            {
              title: t('sections.uniqueness.title'),
              content: t('sections.uniqueness.content'),
            },
            {
              title: t('sections.targetGroups.title'),
              content: t('sections.targetGroups.content'),
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              className="mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <h2 className="text-gray-900 text-2xl font-bold font-manrope">
                {section.title}
              </h2>
              <p className="text-gray-600 mt-2">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="relative aspect-square rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            className="object-cover"
            src="/bg-1.jpg"
            alt={t('secondImageAlt')}
            fill
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
