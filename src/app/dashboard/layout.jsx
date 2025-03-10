import { fetchUserById } from '@/lib/fetchData';
import '../globals.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Ummati Dashboard',
};

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const userId = session.user.id;
  const user = await fetchUserById(userId);

  return (
    <html>
      <body className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar user={user} />
          {children}
        </div>
      </body>
    </html>
  );
}
