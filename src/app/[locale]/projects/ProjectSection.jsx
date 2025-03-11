'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '@/components/widgets/Breadcrumb';
import ProjectCard from '@/components/home/ui/ProjectCard';
import { useTranslations } from 'next-intl';

export default function ProjectSection({ projects, categoriesList }) {
  const t = useTranslations('ProjectsPage');
  const categories = categoriesList.map((cat) => cat.title);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(
          (project) => project.category.title === selectedCategory
        );

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto mt-20">
      <Breadcrumb />
      <h1 className="text-3xl font-bold text-center mb-6 mt-4">{t('title')}</h1>
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all uppercase ${
              selectedCategory === category
                ? 'bg-main text-white'
                : 'bg-second-lightest'
            }`}
          >
            {category === 'All' ? t('allTab') : category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
