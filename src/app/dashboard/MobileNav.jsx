import Image from 'next/image';
import Link from 'next/link';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2zm2 2H5V5h14v14.1M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"
              ></path>
            </svg>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center w-12 h-12 rounded hover:bg-main hover:text-white"
            href="/dashboard/add"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3zm-3 14H5V5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2zm-4-6v4h2v-4zm-4 4h2V9h-2zm-2 0v-6H7v6z"
              ></path>
            </svg>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-center w-12 h-12 rounded hover:bg-main hover:text-white"
            href="/dashboard/settings"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
}
