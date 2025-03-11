import { fetchContact } from '@/lib/fetchData';
import UpdateContactForm from './UpdateContactFrom';

export default async function ContactEditPage() {
  const contact = await fetchContact();
  return (
    <div>
      <UpdateContactForm contact={contact} />
    </div>
  );
}
