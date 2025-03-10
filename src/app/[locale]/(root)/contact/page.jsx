'use client';
import { useActionState } from 'react';
import { sendEmailAction } from '@/app/actions/sendEmail';
import Breadcrumb from '@/components/widgets/Breadcrumb';
import ContactInfo from '@/components/widgets/ContactInfo';
import Socials from '@/components/widgets/Socials';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('ContactPage');

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
    <section className="bg-white px-4 sm:px-6 md:px-8 mx-auto mt-20 max-w-6xl">
      <Breadcrumb />
      <div className="flex flex-col items-center text-gray-900 rounded-lg px-0 md:px-20 mt-4">
        <div className="max-w-2xl text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600">{t('description')}</p>
        </div>
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
            <button
              type="submit"
              className="w-full bg-main text-white py-3 rounded-lg font-bold hover:bg-main-light transition disabled:bg-main-lightest"
              disabled={isPending}
            >
              {isPending ? t('form.button.sending') : t('form.button.send')}
            </button>
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
        <ContactInfo color="text-gray-900" />
        <Socials color="text-gray-900" />
      </div>
    </section>
  );
}
