import Link from 'next/link';

export default function ContactInfo({ color }) {
  return (
    <ul className="flex flex-col items-center sm:items-start justify-center mt-8 space-y-4 text-sm">
      <li>
        <Link
          className="flex items-center gap-2 ltr:sm:justify-start rtl:sm:justify-end"
          href="mailto:info@example.com"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-5 shrink-0 ${color}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>

          <span className={color}>john@doe.com</span>
        </Link>
      </li>

      <li>
        <Link
          className="flex items-center gap-2 ltr:sm:justify-start rtl:sm:justify-end"
          href="tel:+90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-5 shrink-0 ${color}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>

          <span className={color}>0123456789</span>
        </Link>
      </li>

      <li className="flex items-start gap-2 ltr:sm:justify-start rtl:sm:justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`size-5 shrink-0 ${color}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <address className={`-mt-0.5 not-italic ${color}`}>
          213 Lane, London, United Kingdom
        </address>
      </li>
    </ul>
  );
}
