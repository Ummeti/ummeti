import { fetchCategoy } from '@/lib/fetchData';
import UpdateCategoryForm from './UpdateCategoryForm';

export default async function EditCategory({ params }) {
  const { id } = await params;
  const category = await fetchCategoy(id);
  return <UpdateCategoryForm categoryId={id} initialTitle={category?.title} />;
}
