import Image from 'next/image';
import ApproveButton from './ApproveButton';
import RemoveButton from './RemoveButton';

export default function Item({ item, removeAction, approveAction }) {
  return (
    <div className="grid grid-cols-12 w-full px-6 pb-5 justify-start items-center md:gap-8 gap-3 border-b border-gray-300">
      <div className="lg:col-span-4 md:col-span-5 col-span-12 justify-start items-center md:gap-6 gap-3 md:pb-5 flex md:flex-row flex-col">
        {item.images && (
          <Image
            className="object-cover rounded-lg h-auto"
            src={item?.images[0]}
            alt={item?.title}
            width={128}
            height={128}
          />
        )}
        <div className="flex-col justify-start md:items-start items-center gap-1.5 inline-flex">
          <h2 className="text-gray-900 text-xl font-medium leading-8 line-clamp-1">
            {item?.email || item?.title || `${item.firstName} ${item.lastName}`}
          </h2>
          <h3 className="text-gray-500 text-base font-normal leading-7">
            {item?.name || item?.user?.name || item?.text}
          </h3>
        </div>
      </div>
      <div className="lg:col-span-8 md:col-span-7 col-span-12 w-full justify-start items-center md:gap-8 gap-3 flex md:flex-row flex-col">
        {item?.goal && (
          <>
            <h5 className="md:col-span-2 col-span-12 w-full text-center text-gray-500 text-lg font-medium leading-8">
              ${item?.raised}
            </h5>
            <p className="md:col-span-2 col-span-12 w-full focus:outline-none text-center text-gray-500 text-lg font-medium leading-8">
              ${item?.goal}
            </p>
          </>
        )}
        <div className="space-x-2 md:col-span-2 col-span-12 w-full flex justify-center text-center text-gray-900 text-lg font-medium leading-8">
          {item?.isApproved === false && (
            <ApproveButton onApprove={approveAction} id={item.id} />
          )}
          <RemoveButton
            onRemove={removeAction}
            id={item.id}
            email={item.email}
          />
        </div>
      </div>
    </div>
  );
}
