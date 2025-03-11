import Breadcrumb from '@/components/widgets/Breadcrumb';
import ContactInfo from '@/components/widgets/ContactInfo';
import Socials from '@/components/widgets/Socials';
import ContactForm from './ContactForm';
import Headings from './Headings';

export default function Contact() {
  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 mx-auto mt-20 max-w-6xl">
      <Breadcrumb />
      <div className="flex flex-col items-center text-gray-900 rounded-lg px-0 md:px-20 mt-4">
        <Headings />
        <ContactForm />
        <ContactInfo color="text-gray-900" />
        <Socials color="text-gray-900" />
      </div>
    </section>
  );
}
