import Projects from '../ui/Projects';
import { unstable_noStore as noStore } from 'next/cache';
import { fetchProjects } from '@/lib/fetchData';

export default async function ProjectsSection() {
  noStore();

  const projects = await fetchProjects();
  const mainProjects = projects.filter((project) => project.isMain);

  return (
    <section>
      <Projects projects={mainProjects} />
    </section>
  );
}
