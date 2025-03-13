export default function Loading({ rowCount = 1, tabsCount = 3 }) {
  return (
    <div className="py-8 max-w-6xl space-y-6 px-4 sm:px-6 md:px-8">
      <div className="px-4 sm:px-6 md:px-8 animate-pulse">
        <div className="sm:hidden p-4">
          <div className="w-full h-10 bg-gray-200 rounded-md"></div>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              {Array.from({ length: tabsCount }).map((_, index) => (
                <div
                  key={index}
                  className="inline-flex shrink-0 items-center gap-2 px-1 py-4"
                >
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="w-24 h-8 mx-auto bg-gray-200 rounded"></div>
      <div className="animate-pulse">
        {[...Array(rowCount)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-12 w-full px-6 pb-5 justify-start items-center md:gap-8 gap-3 border border-gray-300 rounded-2xl p-4"
          >
            <div className="lg:col-span-4 md:col-span-5 col-span-12 justify-start items-center md:gap-6 gap-3 md:pb-5 flex md:flex-row flex-col">
              <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
              <div className="flex-col justify-start md:items-start items-center gap-1.5 inline-flex">
                <div className="h-6 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>

            <div className="lg:col-span-8 md:col-span-7 col-span-12 w-full justify-start items-center md:gap-8 gap-3 flex md:flex-row flex-col">
              <div className="md:col-span-2 col-span-12 w-full text-center">
                <div className="h-6 w-20 mx-auto bg-gray-200 rounded"></div>
              </div>
              <div className="md:col-span-2 col-span-12 w-full text-center">
                <div className="h-6 w-20 mx-auto bg-gray-200 rounded"></div>
              </div>
              <div className="md:col-span-2 col-span-12 w-full flex justify-center items-center space-x-2">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
