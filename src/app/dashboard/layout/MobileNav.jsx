import Image from 'next/image';
import Link from 'next/link';
import {
  AddIcon,
  ContactIcon,
  DashboardIcon,
  ProfileIcon,
  SettingsIcon,
} from './Icons';

export default function MobileNav() {
  return (
    <div className="flex md:hidden flex-col items-center w-16 h-full overflow-hidden text-gray-700">
      <Link className="flex items-center justify-center py-2.5" href="/">
        <Image src="/logo.webp" alt="Ummati" width={48} height={48} />
      </Link>
      <ul className="flex flex-col items-center px-2 space-y-2 border-t border-gray-200">
        <li>
          <Link
            className="flex items-center justify-center mt-2 w-12 h-12 rounded bg-main text-white"
            href="/dashboard"
          >
            <DashboardIcon />
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center w-12 h-12 rounded hover:bg-main hover:text-white"
            href="/dashboard/add"
          >
            <AddIcon />
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center w-12 h-12 rounded hover:bg-main hover:text-white"
            href="/dashboard/contact"
          >
            <ContactIcon />
          </Link>
        </li>
        {/* <li>
          <Link
            className="flex items-center justify-center w-12 h-12 rounded hover:bg-main hover:text-white"
            href="/dashboard/settings"
          >
            <SettingsIcon />
          </Link>
        </li> */}
        <li>
          <Link
            className="flex items-center justify-center w-12 h-12 rounded hover:bg-main hover:text-white"
            href="/dashboard/profile"
          >
            <ProfileIcon />
          </Link>
        </li>
      </ul>
    </div>
  );
}
