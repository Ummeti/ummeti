import { auth } from '@/lib/auth';
import UpdateUserForm from './UpdateUserForm';
import { fetchUserById } from '@/lib/fetchData';

export default async function Profile() {
  const session = await auth();
  const userId = session.user.id;
  const user = await fetchUserById(userId);
  return <UpdateUserForm user={user} />;
}
