import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function PostCard({
  post: { title, description, images, slug, createdAt },
}) {
  return (
    <article className="relative h-full overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
      <Image
        src={images[0]}
        alt={title}
        fill
        className="inset-0 object-cover"
      />
      <div className="relative bg-gradient-to-t h-full w-full from-gray-900/50 to-gray-900/25 pt-24 sm:pt-32 lg:pt-48">
        <div className="p-4 sm:p-6">
          <time dateTime="2022-10-10" className="block text-xs text-white/90">
            {createdAt.toLocaleDateString()}
          </time>
          <Link href={`/blog/${slug}`}>
            <h2 className="mt-0.5 line-clamp-3 text-lg text-white">{title}</h2>
          </Link>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
