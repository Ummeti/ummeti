'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import CloseIcon from '../icons/CloseIcon';
import MenuIcon from '../icons/MenuIcon';
import LocaleSwitcher from '../widgets/LocaleSwitcher';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('Header');

  const menuItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('projects'), href: '/projects' },
    { label: t('blog'), href: '/#blog' },
    { label: t('contact'), href: '/contact' },
  ];

  return (
    <header className="bg-white sticky z-50 shadow-lg">
      <div className="px-4 sm:px-6 md:px-8 mx-auto max-w-6xl h-32 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Ummeti"
            width={100}
            height={100}
            priority
          />
        </Link>
        <nav className="hidden md:flex gap-8 lg:gap-12 items-center justify-center">
          <ul className="flex gap-4 lg:gap-6">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-gray-800 hover:text-main duration-300 text-sm font-semibold uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/projects"
            className="hidden lg:block rounded-full px-4 py-2 uppercase border duration-300 bg-main hover:bg-white text-white hover:text-gray-900 hover:scale-105 font-bold shadow-lg"
          >
            {t('donate')}
          </Link>
          <LocaleSwitcher />
        </nav>
        <div className="md:hidden">
          <button className="text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          {menuOpen && (
            <nav className="absolute z-50 top-24 rtl:left-4 ltr:right-4 bg-white shadow-lg p-4 rounded-lg">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-gray-800 hover:text-main duration-300 py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <LocaleSwitcher />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
