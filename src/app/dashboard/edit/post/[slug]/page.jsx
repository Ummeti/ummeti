import { fetchPostBySlug } from '@/lib/fetchData';
import UpdatePostForm from './UpdatePostForm';
import { notFound } from 'next/navigation';

export default async function EditPost({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await fetchPostBySlug(decodedSlug);
  if (!post) notFound();

  return <UpdatePostForm post={post} />;
}
