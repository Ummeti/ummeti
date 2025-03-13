'use client';

import { motion } from 'framer-motion';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { submitReviewAction } from '@/app/actions/reviewActions';

export default function ReviewForm() {
  const t = useTranslations('ReviewPage');
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: {},
  };

  const [state, formAction, isPending] = useActionState(
    submitReviewAction,
    initialState
  );

  return (
    <div className="bg-gray-100 p-4 sm:p-8 md:p-12 rounded-lg shadow-lg w-full">
      <form action={formAction} className="space-y-6" noValidate>
        <div className="md:flex gap-6">
          <div className="flex-1">
            <input
              type="text"
              name="firstName"
              placeholder={t('firstNamePlaceholder')}
              defaultValue={state.formObject?.firstName || ''}
              maxLength={50}
              className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
              disabled={isPending}
              required
            />
            {state.errors?.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.firstName}
              </p>
            )}
          </div>
          <div className="flex-1 mt-6 md:mt-0">
            <input
              type="text"
              name="lastName"
              placeholder={t('lastNamePlaceholder')}
              defaultValue={state.formObject?.lastName || ''}
              maxLength={50}
              className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
              disabled={isPending}
              required
            />
            {state.errors?.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="text"
            placeholder={t('reviewPlaceholder')}
            defaultValue={state.formObject?.text || ''}
            maxLength={300}
            rows={4}
            className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-2 focus:ring-main focus:outline-none"
            disabled={isPending}
            required
          />
          {state.errors?.text && (
            <p className="text-red-500 text-sm mt-1">{state.errors.text}</p>
          )}
        </div>
        <motion.button
          type="submit"
          className="w-full text-white bg-main hover:bg-main-lighter rounded-lg px-4 py-3 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          {isPending ? t('submitting') : t('submitButton')}
        </motion.button>
        {state.message && (
          <p
            className={`text-sm mt-4 text-center ${
              state.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.success ? t('successMessage') : state.message}
          </p>
        )}
      </form>
    </div>
  );
}
