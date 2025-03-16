import { fetchPostBySlug } from '@/lib/fetchData';

export default async function EditPost({ params }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  return <div>{post?.title}</div>;
}
