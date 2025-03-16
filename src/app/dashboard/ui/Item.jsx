import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import ApproveButton from './ApproveButton';
import RemoveButton from './RemoveButton';
import ToggleProjectForm from './ToggleItemMain';

const getItemRoute = (item) => {
  if (item.goal) return `/dashboard/edit/project/${item.slug}`;
  if (item.description && !item.goal)
    return `/dashboard/edit/post/${item.slug}`;
  return `/dashboard/edit/category/${item.id}`;
};

const ItemTitle = ({ item }) => (
  <h2 className="text-gray-900 text-xl font-medium leading-8 line-clamp-1">
    {item.email ||
      item.title ||
      `${item.firstName || ''} ${item.lastName || ''}`}
  </h2>
);

const ItemSubtitle = ({ item }) => (
  <h3 className="text-gray-500 text-base font-normal leading-7">
    {item.name || item.user?.name || item.text || 'No description'}
  </h3>
);

const Item = memo(
  ({ item, removeAction, approveAction, ToggleItemMainAction }) => {
    const hasLink = !!item.title;
    const route = hasLink ? getItemRoute(item) : '';

    const content = (
      <article
        className="grid grid-cols-12 w-full px-6 pb-5 justify-start items-center md:gap-8 gap-3 border-b border-gray-300"
        aria-label={`Item ${item.title || item.email || item.id}`}
      >
        <div className="lg:col-span-4 md:col-span-5 col-span-12 justify-start items-center md:gap-6 gap-3 md:pb-5 flex md:flex-row flex-col">
          {hasLink ? (
            <Link href={route} className="flex items-center gap-3">
              {item.images?.[0] && (
                <Image
                  className="object-cover rounded-lg h-auto"
                  src={item.images[0]}
                  alt={item.title || 'Item image'}
                  width={128}
                  height={128}
                  priority={false}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI+wN4o3G8swAAAABJRU5ErkJggg=="
                />
              )}
              <div className="flex-col justify-start md:items-start items-center gap-1.5 inline-flex">
                <ItemTitle item={item} />
                <ItemSubtitle item={item} />
              </div>
            </Link>
          ) : (
            <>
              {item.images?.[0] && (
                <Image
                  className="object-cover rounded-lg h-auto"
                  src={item.images[0]}
                  alt={item.title || 'Item image'}
                  width={128}
                  height={128}
                  priority={false}
                  placeholder="blur"
                />
              )}
              <div className="flex-col justify-start md:items-start items-center gap-1.5 inline-flex">
                <ItemTitle item={item} />
                <ItemSubtitle item={item} />
              </div>
            </>
          )}
        </div>
        <div className="lg:col-span-8 md:col-span-7 col-span-12 w-full justify-start items-center md:gap-8 gap-3 flex md:flex-row flex-col">
          {'isMain' in item && (
            <div className="md:col-span-2 col-span-12 w-full text-center text-gray-500 text-lg font-medium leading-8">
              <ToggleProjectForm
                isMain={item.isMain}
                id={item.id}
                ToggleItemMainAction={ToggleItemMainAction}
              />
            </div>
          )}
          {item.goal && (
            <>
              <p
                className="md:col-span-2 col-span-12 w-full text-center text-gray-500 text-lg font-medium leading-8"
                aria-label="Amount raised"
              >
                ${item.raised?.toLocaleString() || 0}
              </p>
              <p
                className="md:col-span-2 col-span-12 w-full text-center text-gray-500 text-lg font-medium leading-8"
                aria-label="Goal amount"
              >
                ${item.goal.toLocaleString()}
              </p>
            </>
          )}
          <div className="space-x-2 md:col-span-2 col-span-12 w-full flex justify-center text-center text-gray-900 text-lg font-medium leading-8">
            {item.isApproved === false && (
              <ApproveButton onApprove={approveAction} id={item.id} />
            )}
            <RemoveButton
              onRemove={removeAction}
              id={item.id}
              email={item.email}
            />
          </div>
        </div>
      </article>
    );

    return content;
  }
);

Item.displayName = 'Item';

export default Item;
