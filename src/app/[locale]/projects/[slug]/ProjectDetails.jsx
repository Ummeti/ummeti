import Image from 'next/image';
import ProgressBar from '@/components/widgets/ProgressBar';
import EmblaCarousel from '@/components/widgets/carousel/EmblaCarousel';

export default function ProjectDetails({
  project: { title, description, raised, goal, images },
}) {
  if (!project) throw new Error('Failed to Delete Invoice');
  return (
    <div className="bg-white md:col-span-3 p-4 sm:p-6 md:p-12">
      <div className="relative aspect-video rounded-lg overflow-hidden mt-4">
        <Image src={images[0]} alt="test" fill className="object-cover" />
      </div>
      <div className="space-y-8 mt-4">
        <ProgressBar raised={raised} goal={goal} />
        <h2 className="text-base font-medium text-gray-900">{title}</h2>
        <p className="text-gray-700 whitespace-pre-wrap pb-8">
          {description.trim()}
        </p>
      </div>
      <EmblaCarousel>
        {images.map((image) => (
          <div key={image} className=" embla__slide !flex-[0_0_25%]">
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
  );
}
