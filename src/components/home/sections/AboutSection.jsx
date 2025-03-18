'use client';
import { motion } from 'framer-motion';
import Accordion from '@/components/widgets/Accordion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('AboutSection');

  const goals = [
    {
      title: t('goals.vision.title'),
      description: t('goals.vision.description'),
    },
    {
      title: t('goals.mission.title'),
      description: t.raw('goals.mission.description'),
    },
    {
      title: t('goals.goals.title'),
      description: t.raw('goals.goals.description'),
    },
    {
      title: t('goals.values.title'),
      description: t.raw('goals.values.description'),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mt-20 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="md:grid grid-cols-5 items-start">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-3 space-y-4 p-4 sm:px-6 md:px-8 py-6"
          >
            <h2 className="text-black font-manrope text-4xl font-semibold leading-10 text-center md:text-left rtl:text-right">
              {t('title')}
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-7 text-center md:text-left rtl:text-right">
              {t('description')}
            </p>
            <motion.div
              initial={{ opacity: 0, x: -240 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-video flex md:items-center md:justify-start justify-center rounded-lg overflow-hidden"
            >
              <Image
                src="/bg.jpg"
                alt="About Ummeti"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <div className="border-l-2 md:border-second border-white p-4 sm:px-6 md:px-8 py-6 col-span-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="space-y-4"
            >
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Accordion
                    title={goal.title}
                    description={goal.description}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
