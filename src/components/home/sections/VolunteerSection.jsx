'use client';

import { useActionState } from 'react';
import { sendEmailAction } from '@/app/actions/sendEmail';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function VolunteerSection({ children }) {
  const t = useTranslations('VolunteerSection');

  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: {},
  };

  const [state, formAction, isPending] = useActionState(
    sendEmailAction,
    initialState
  );

  return (
    <motion.div
      className="mt-20 bg-second rounded-lg"
      id="volunteer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="grid lg:grid-cols-2 items-center gap-14 sm:p-8 p-4 font-[sans-serif] max-w-6xl max-lg:max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
          hidden: { opacity: 0 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            {t('description')}
          </p>
          {children}{' '}
        </motion.div>

        <motion.div
          className="bg-gray-100 p-6 rounded-lg"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <form action={formAction} className="mt-8 space-y-4" noValidate>
            <input
              type="text"
              name="name"
              placeholder={t('form.name')}
              className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-second"
              defaultValue={state.formObject?.name}
            />
            {state.errors?.name && (
              <p className="text-red-500 text-sm">{state.errors.name}</p>
            )}

            <input
              type="text"
              name="subject"
              placeholder={t('form.subject')}
              className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-second"
              defaultValue={state.formObject?.subject}
            />
            {state.errors?.subject && (
              <p className="text-red-500 text-sm">{state.errors.subject}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder={t('form.email')}
              className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-second"
              defaultValue={state.formObject?.email}
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}

            <textarea
              name="message"
              placeholder={t('form.message')}
              rows="6"
              className="w-full rounded-lg px-4 text-gray-800 text-sm pt-3 outline-second"
              defaultValue={state.formObject?.message}
            ></textarea>
            {state.errors?.message && (
              <p className="text-red-500 text-sm">{state.errors.message}</p>
            )}

            <motion.button
              type="submit"
              className="text-gray-900 bg-second hover:bg-second-light tracking-wide rounded-lg text-sm px-4 py-3 flex items-center justify-center w-full !mt-6 disabled:bg-second-lightest"
              whileTap={{ scale: 0.95 }}
              disabled={isPending}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#333333"
                className="mr-2"
                viewBox="0 0 548.244 548.244"
              >
                <path
                  fillRule="evenodd"
                  d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                  clipRule="evenodd"
                  data-original="#000000"
                />
              </svg>
              {isPending ? t('form.sending') : t('form.sendButton')}
            </motion.button>

            {state.message && (
              <p
                className={`text-sm mt-4 ${
                  state.success ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {state.message}
              </p>
            )}
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
