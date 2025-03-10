import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginLayout({ children }) {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
