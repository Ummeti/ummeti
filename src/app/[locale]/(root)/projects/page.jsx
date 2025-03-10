import ProjectSection from './ProjectSection';
import { unstable_noStore as noStore } from 'next/cache';
import { fetchCategories, fetchProjects } from '@/lib/fetchData';

export default async function Projects() {
  noStore();
  const projects = await fetchProjects();
  const categories = await fetchCategories();

  return <ProjectSection projects={projects} categoriesList={categories} />;
}
