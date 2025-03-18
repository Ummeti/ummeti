import { fetchUserById } from '@/lib/fetchData';
import '../globals.css';
import Sidebar from './layout/Sidebar';
import ProfileDropdown from './layout/ProfileDropdown';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { NotificationProvider } from './context/NotificationContext';

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
        <NotificationProvider>
          <Sidebar />
          <div className="flex-1">
            <ProfileDropdown user={user} />
            {children}
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
