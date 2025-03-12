'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  DashboardIcon,
  AddIcon,
  ContactIcon,
  SettingsIcon,
  ProfileIcon,
} from './Icons';

export default function LargeNav() {
  const pathname = usePathname();

  const navLinks = useMemo(
    () => [
      { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
      { href: '/dashboard/add', label: 'Add Item', icon: AddIcon },
      { href: '/dashboard/contact', label: 'Edit Contact', icon: ContactIcon },
      { href: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
      { href: '/dashboard/profile', label: 'My Profile', icon: ProfileIcon },
    ],
    []
  );

  return (
    <div className="hidden md:flex flex-col items-center w-40 h-full overflow-hidden text-gray-700">
      <Link className="flex items-center w-full p-2" href="/" aria-label="Home">
        <Image src="/logo.webp" alt="Ummati" width={52} height={52} />
        <span className="ml-2 text-sm font-bold">Ummati</span>
      </Link>

      <ul className="flex flex-col justify-center w-full px-2 space-y-1 border-t border-gray-200">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center w-full h-12 p-1 px-4 rounded transition-all duration-200
                  ${
                    isActive
                      ? 'bg-main text-white'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon />
                <span className="ml-2 text-sm font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
