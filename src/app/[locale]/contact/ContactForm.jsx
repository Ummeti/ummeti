'use client';
import { useActionState, useState } from 'react';
import { motion } from 'framer-motion';
import { sendEmailAction } from '@/app/actions/sendEmail';
import { useTranslations } from 'next-intl';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ContactForm() {
  const initialState = {
    success: false,
    message: '',
    errors: {},
    formObject: {},
  };

  const [token, setToken] = useState('');

  const [state, formAction, isPending] = useActionState(
    sendEmailAction,
    initialState
  );

  const t = useTranslations('ContactPage');

  return (
    <div className="bg-gray-100 p-4 sm:p-8 md:p-12 rounded-lg shadow-lg w-full">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-2">
              {t('form.name.label')}
            </label>
            <input
              type="text"
              name="name"
              placeholder={t('form.name.placeholder')}
              className="w-full p-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              defaultValue={state.formObject?.name}
            />
            {state.errors?.name && (
              <p className="text-red-500 text-sm">{state.errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 mb-2">
              {t('form.subject.label')}
            </label>
            <input
              type="text"
              name="subject"
              placeholder={t('form.subject.placeholder')}
              className="w-full p-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              defaultValue={state.formObject?.subject}
            />
            {state.errors?.subject && (
              <p className="text-red-500 text-sm">{state.errors.subject}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">
            {t('form.email.label')}
          </label>
          <input
            type="email"
            name="email"
            placeholder={t('form.email.placeholder')}
            className="w-full p-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            defaultValue={state.formObject?.email}
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            {t('form.message.label')}
          </label>
          <textarea
            name="message"
            placeholder={t('form.message.placeholder')}
            className="w-full p-3 bg-gray-50 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main h-32"
            defaultValue={state.formObject?.message}
          ></textarea>
          {state.errors?.message && (
            <p className="text-red-500 text-sm">{state.errors.message}</p>
          )}
        </div>

        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          onSuccess={(token) => setToken(token)}
        />

        <input type="hidden" name="cf-turnstile-response" value={token} />

        <motion.button
          type="submit"
          className="w-full bg-main text-white py-3 rounded-lg font-bold hover:bg-main-light transition disabled:bg-main-lightest"
          whileTap={{ scale: token ? 0.95 : 1 }}
          disabled={isPending || !token}
        >
          {isPending ? t('form.button.sending') : t('form.button.send')}
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
    </div>
  );
}
