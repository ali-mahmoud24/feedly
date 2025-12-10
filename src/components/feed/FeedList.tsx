import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { FeedCard } from "./FeedCard";
import { useUsersInfiniteQuery } from "@/hooks/useUsers";
import { SkeletonCard } from "./SkeletonCard";

function Spinner() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
    </div>
  );
}

export function FeedList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
  } = useUsersInfiniteQuery();

  const { ref } = useInView({
    threshold: 0,
    rootMargin: "500px",
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const pages = data?.pages ?? [];

  return (
    <>
      {/* Initial Loading */}
      {isFetching && pages.length === 0 &&
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />

          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />

          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      }

      {/* No items found */}
      {pages.length === 0 && !isFetching && !isError && (
        <p className="text-center text-sm text-muted-foreground col-span-full">
          No items found.
        </p>
      )}

      {/* Feed Items */}
      {pages.map((page) =>
        page.data.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <FeedCard item={item} />
          </div>
        ))
      )}

      {/* Infinite Loading */}
      {isFetchingNextPage && (
        <div className="col-span-full flex justify-center">
          <Spinner />
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="col-span-full flex flex-col items-center gap-2 py-4">
          <p className="text-sm text-red-600">
            Something went wrong while fetching the feed.
          </p>
          <Button variant="outline" onClick={() => fetchNextPage()}>
            Retry
          </Button>
        </div>
      )}

      {/* Intersection Observer Trigger */}
      {hasNextPage && <div ref={ref} className="h-1 col-span-full" />}

      {/* End Of Feed */}
      {!hasNextPage && !isFetchingNextPage && pages.length > 0 && (
        <div className="col-span-full py-6 flex flex-col items-center text-muted-foreground">
          <div className="text-base font-medium">🎉 You're all caught up</div>
          <div className="text-xs">No more users to load.</div>
        </div>
      )}
    </>
  );
}
