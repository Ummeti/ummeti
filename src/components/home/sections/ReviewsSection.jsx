import { fetchApprovedReviews } from '@/lib/fetchData';
import Reviews from '../ui/Reviews';

export default async function ReviewsSection() {
  const reviews = await fetchApprovedReviews();
  return <Reviews reviews={reviews} />;
}

// export default function Testimonials() {
//   return (
//     <section className="bg-white py-20">
//       <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//         <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//           What people say about Ummati
//         </h2>

//         <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
//                 sit rerum incidunt, a consequuntur recusandae ab saepe illo est
//                 quia obcaecati neque quibusdam eius accusamus error officiis
//                 atque voluptates magnam!
//               </p>
//             </blockquote>
//           </div>

//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
//                 mollitia rerum quo unde neque atque molestias quas pariatur!
//                 Sint, maxime?
//               </p>
//             </blockquote>
//           </div>

//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Reprehenderit esse delectus, maiores fugit, reiciendis culpa
//                 inventore sint accusantium libero dolore eos quasi a ex aliquam
//                 molestiae. Tenetur hic delectus maxime.
//               </p>
//             </blockquote>
//           </div>

//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
//                 fuga?
//               </p>
//             </blockquote>
//           </div>

//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                 Cupiditate officia natus blanditiis rerum incidunt ex autem
//                 repudiandae doloribus eveniet quia? Culpa commodi quae atque
//                 perspiciatis? Provident, magni beatae saepe porro aspernatur
//                 facere neque sunt possimus assumenda perspiciatis aperiam
//                 quisquam animi libero voluptatem fuga. Repudiandae, facere? Nemo
//                 reprehenderit quas ratione quis.
//               </p>
//             </blockquote>
//           </div>

//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
//                 rerum. Nobis laborum praesentium necessitatibus vero.
//               </p>
//             </blockquote>
//           </div>

//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Maiores quaerat quasi ipsa repellendus quam! Beatae pariatur
//                 quia distinctio fugit repellendus repudiandae nostrum
//                 consectetur quibusdam quo.
//               </p>
//             </blockquote>
//           </div>

//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit,
//                 modi!
//               </p>
//             </blockquote>
//           </div>

//           <div className="mb-8 sm:break-inside-avoid">
//             <blockquote className="rounded-lg bg-second-lightest p-6 shadow-sm sm:p-8">
//               <Rate />

//               <p className="mt-4 text-gray-700">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
//                 numquam, unde molestiae commodi temporibus dicta.
//               </p>
//             </blockquote>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
