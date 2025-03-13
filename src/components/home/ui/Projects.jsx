'use client';
import EmblaCarousel from '@/components/widgets/carousel/EmblaCarousel';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useTranslations } from 'next-intl';
import NoItemsFallback from './NoItemsFallback';

export default function Projects({ projects }) {
  const t = useTranslations('ProjectsSection');
  return (
    <motion.div
      className="mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {t('title')}
      </h2>

      <motion.div
        className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto mt-8"
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
          hidden: { opacity: 0 },
        }}
      >
        {projects.length < 1 ? (
          <NoItemsFallback />
        ) : (
          <EmblaCarousel>
            {projects.map((project) => (
              <div key={project.id} className="embla__slide">
                <ProjectCard project={project} />
              </div>
            ))}
          </EmblaCarousel>
        )}
      </motion.div>
    </motion.div>
  );
}
