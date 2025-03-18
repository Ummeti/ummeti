'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notification({ message, onHide, type = 'success' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (!isVisible && message && onHide) {
      const timer = setTimeout(() => onHide(), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, message, onHide]);

  const variants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const typeStyles = {
    success: 'text-green-500 border-green-500/20 bg-green-50',
    error: 'text-red-500 border-red-500/20 bg-red-50',
    info: 'text-blue-500 border-blue-500/20 bg-blue-50',
    warning: 'text-yellow-500 border-yellow-500/20 bg-yellow-50',
  };

  if (!message) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="alert"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-24 right-6 z-50 w-80 max-w-[90vw] pointer-events-auto"
        >
          <div
            className={`relative overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm bg-opacity-80 ${typeStyles[type]}`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent to-main-lightest/10"
              animate={{
                x: ['-100%', '100%'],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear',
                },
              }}
            />

            <div className="relative flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      type === 'success'
                        ? 'M20 6L9 17l-5-5'
                        : 'M12 6v6m0 0v6m0-6h6m-6 0H6'
                    }
                  />
                </svg>
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{message}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
