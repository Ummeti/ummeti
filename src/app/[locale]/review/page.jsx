import Breadcrumb from '@/components/widgets/Breadcrumb';
import ReviewForm from './ReviewForm';
import Heading from './Heading';

export default function Review() {
  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 mx-auto mt-20 max-w-6xl">
      <Breadcrumb />
      <div className="flex flex-col items-center text-gray-900 rounded-lg px-0 md:px-20 mt-4">
        <Heading />
        <ReviewForm />
      </div>
    </section>
  );
}
