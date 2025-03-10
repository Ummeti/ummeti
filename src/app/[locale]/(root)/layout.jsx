import { Geist, Geist_Mono } from 'next/font/google';
import '../../globals.css';
import '../../embla.css';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getLangDir } from 'rtl-detect';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://ummati.org/${locale}`,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({ children }) {
  const locale = await getLocale();

  const direction = getLangDir(locale);

  if (!routing.locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={direction}
      className="scroll-smooth overflow-x-hidden"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
