import { fetchCategories, fetchProjectBySlug } from '@/lib/fetchData';
import UpdateProjectForm from './UpdateProjectForm';
import { notFound } from 'next/navigation';

export default async function EditProject({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const project = await fetchProjectBySlug(decodedSlug);
  if (!project) notFound();

  const categories = await fetchCategories();

  return <UpdateProjectForm project={project} categories={categories} />;
}
