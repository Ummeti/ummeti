'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useActionState } from 'react';
import { sendEmailAction } from '@/app/actions/sendEmail';
import { Turnstile } from '@marsidev/react-turnstile';
import { useTranslations } from 'next-intl';

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
              required
              className="w-full p-3 bg-gray-50 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">
              {t('form.subject.label')}
            </label>
            <input
              type="text"
              name="subject"
              required
              className="w-full p-3 bg-gray-50 border rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">
            {t('form.email.label')}
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-3 bg-gray-50 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">
            {t('form.message.label')}
          </label>
          <textarea
            name="message"
            required
            className="w-full p-3 bg-gray-50 border rounded-lg h-32"
          ></textarea>
        </div>

        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          onSuccess={(token) => setToken(token)}
          theme="light"
        />

        <input type="hidden" name="cf-turnstile-response" value={token} />

        <motion.button
          type="submit"
          className="w-full bg-main text-white py-3 rounded-lg font-bold"
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
