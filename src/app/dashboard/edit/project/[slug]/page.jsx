import { fetchCategories, fetchProjectBySlug } from '@/lib/fetchData';
import UpdateProjectForm from './UpdateProjectForm';

export default async function EditProject({ params }) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  const categories = await fetchCategories();
  return <UpdateProjectForm project={project} categories={categories} />;
}
