'use client';
import { motion } from 'framer-motion';
import EmblaCarousel from '../../widgets/carousel/EmblaCarousel';
import { useTranslations } from 'next-intl';
import NoItemsFallback from './NoItemsFallback';

export default function Reviews({ reviews }) {
  const t = useTranslations('ReviewsSection');

  return (
    <motion.section
      className="bg-white mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('title')}
        </h2>
        {reviews.length < 1 ? (
          <NoItemsFallback />
        ) : (
          <div className="mt-8">
            <EmblaCarousel>
              {reviews?.map((review, i) => (
                <div key={review.id} className="embla__slide">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="h-full"
                  >
                    <blockquote className="rounded-lg bg-second-lightest p-6 h-full shadow-sm sm:p-8">
                      <p className="mt-0.5 text-lg font-medium text-gray-900 capitalize">
                        {review.firstName} {review.lastName}
                      </p>
                      <p className="mt-4 text-gray-700 line-clamp-4 first-letter:capitalize">
                        {review.text}
                      </p>
                    </blockquote>
                  </motion.div>
                </div>
              ))}
            </EmblaCarousel>
          </div>
        )}
      </div>
    </motion.section>
  );
}
