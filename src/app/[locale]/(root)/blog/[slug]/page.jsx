import Image from 'next/image';
import { fetchPostBySlug } from '@/lib/fetchData';
import Breadcrumb from '@/components/widgets/Breadcrumb';
import EmblaCarousel from '@/components/widgets/carousel/EmblaCarousel';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const { title, description, images, createdAt } = await fetchPostBySlug(
    decodedSlug
  );

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <Breadcrumb />
      <div className="max-w-3xl mx-auto">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-500 text-sm">
            Published on{' '}
            <time dateTime="2022-04-05">{createdAt.toLocaleDateString()}</time>
          </p>
        </div>

        <div className="relative w-full aspect-video mb-8">
          <Image
            src="/bg.jpg"
            alt="Featured image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>

        <p className="mx-auto whitespace-pre-wrap pb-8">{description.trim()}</p>
        <EmblaCarousel>
          {images.map((image) => (
            <div key={image} className="embla__slide !flex-[0_0_20%]">
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          ))}
        </EmblaCarousel>
      </div>
    </div>
  );
}
