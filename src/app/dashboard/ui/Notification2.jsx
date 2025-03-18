'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notification2({ message, onHide, type = 'success' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (!isVisible && message && onHide) {
      const timer = setTimeout(onHide, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, message, onHide]);

  const typeStyles = {
    success: 'text-green-600 border-gray-200 bg-white',
    error: 'text-red-600 border-red-300 bg-red-100',
    info: 'text-blue-600 border-blue-300 bg-blue-100',
    warning: 'text-yellow-600 border-yellow-300 bg-yellow-100',
  };

  const typeIcons = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M12 2l10 18H2L12 2z"
        />
      </svg>
    ),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="alert"
          className="fixed top-16 right-6 z-50 w-96 max-w-[calc(100%-3rem)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div
            className={`bg-white border rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 transition-all ${typeStyles[type]}`}
          >
            {/* Type Icon */}
            <span className="flex-shrink-0">{typeIcons[type]}</span>

            {/* Message Content */}
            <div className="flex-1">
              <strong className="block text-base font-semibold text-gray-900 capitalize">
                {type}
              </strong>
              <p className="mt-1 text-sm text-gray-600 leading-tight">
                {message}
              </p>
            </div>

            {/* Close Button (X) */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
