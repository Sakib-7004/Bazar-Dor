export default function Skeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
      role="status"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 sm:p-4"
          aria-hidden="true"
        >
          <div className="skeleton h-28 sm:h-36" />
          <div className="space-y-3 p-2 pt-4">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="skeleton h-7 w-24" />
              <div className="skeleton h-7 w-16 rounded-full" />
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে...</span>
    </div>
  );
}
