import { fetchPostBySlug } from '@/lib/fetchData';
import UpdatePostForm from './UpdatePostForm';

export default async function EditPost({ params }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  return <UpdatePostForm post={post} />;
}
