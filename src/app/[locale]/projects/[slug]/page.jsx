import { notFound } from 'next/navigation';
import DonationForm from './DonationForm';
import ProjectDetails from './ProjectDetails';
import Breadcrumb from '@/components/widgets/Breadcrumb';
import { fetchProjectBySlug } from '@/lib/fetchData';

export default async function Project({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const project = await fetchProjectBySlug(decodedSlug);
  if (!project) notFound();

  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 mx-auto mt-20 max-w-6xl">
      <Breadcrumb />
      <div className="grid grid-cols-1 md:grid-cols-5 mt-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <ProjectDetails project={project} />
        <div className="md:col-span-2 mt-20 md:mt-0 shadow-[rgba(100,100,111,0.2)_-2px_7px_29px_0px]">
          <DonationForm />
        </div>
      </div>
    </section>
  );
}
