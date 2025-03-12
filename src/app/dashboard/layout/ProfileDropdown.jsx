'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOutAction } from '@/app/actions/signOutAction';
import { ProfileIcon, ContactIcon, SettingsIcon } from './Icons';

const Notification = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 512 512"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M427.68 351.43C402 320 383.87 304 383.87 217.35C383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53c-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43C73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57M320 384v16a64 64 0 0 1-128 0v-16"
    ></path>
  </svg>
);

export default function ProfileDropdown({ user }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <div className="relative">
      <header className="bg-main text-white p-4 shadow-lg">
        <div className="flex justify-end items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-main-light transition">
            <Notification />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>

          <button
            onClick={toggleDropdown}
            className="focus:outline-none relative"
            aria-label="User menu"
          >
            <Image
              src={user?.profilePicture || '/user.png'}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-main-light hover:border-main-lighter transition object-cover"
              width={96}
              height={96}
            />
          </button>
        </div>
      </header>

      {isDropdownOpen && (
        <div className="absolute right-2 w-52 p-4 mt-2 bg-main text-white rounded-lg shadow-lg z-20 overflow-hidden">
          <div className="flex gap-2 pb-4 mb-2 border-b border-main-light">
            <Image
              src={user?.profilePicture || '/user.png'}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
              width={96}
              height={96}
            />
            <div>
              <h2 className="text-sm font-semibold">{user?.name}</h2>
              <p className="text-xs text-gray-200">{user?.email}</p>
            </div>
          </div>

          <ul>
            {[
              { icon: ProfileIcon, label: 'My Profile', href: 'profile' },
              { icon: ContactIcon, label: 'Edit Contact', href: 'contact' },
              { icon: SettingsIcon, label: 'Settings', href: 'settings' },
            ].map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link
                  href={`/dashboard/${href}`}
                  className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-main-light transition rounded-lg"
                >
                  <Icon className="w-5 h-5 mr-2 text-gray-400" />
                  {label}
                </Link>
              </li>
            ))}

            <li className="pt-4 border-t border-main-light mt-2">
              <button
                onClick={signOutAction}
                className="flex items-center justify-center gap-2 rounded-lg w-full py-2 text-sm bg-red-600 hover:bg-red-700 text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  >
                    <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path>
                    <path d="M9 12h12l-3-3m0 6l3-3"></path>
                  </g>
                </svg>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
