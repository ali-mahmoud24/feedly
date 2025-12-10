export function FeedSkeletonCard() {
  return (
    <div className="w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 animate-pulse
                    bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />

        <div className="flex flex-col gap-2 flex-1">
          <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 space-y-3">
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-2/3 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}