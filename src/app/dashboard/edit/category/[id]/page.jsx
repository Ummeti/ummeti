import { fetchCategoy } from '@/lib/fetchData';
import UpdateCategoryForm from './UpdateCategoryForm';
import { notFound } from 'next/navigation';

export default async function EditCategory({ params }) {
  const { id } = await params;
  const category = await fetchCategoy(id);
  if (!category) notFound();

  return <UpdateCategoryForm categoryId={id} initialTitle={category?.title} />;
}
