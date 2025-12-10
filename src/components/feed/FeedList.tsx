import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/Spinner";
import { FeedCard } from "./FeedCard";
import { FeedSkeletonCard } from "./FeedSkeletonCard";
import { useUsersInfiniteQuery } from "@/hooks/useUsers";


export function FeedList({ search }: { search: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    refetch
  } = useUsersInfiniteQuery(search);

  const { ref } = useInView({
    threshold: 0,
    rootMargin: "800px",
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const pages = data?.pages ?? [];

  // Total items across all pages
  const totalItems = pages.reduce((acc, page) => acc + page.data.length, 0);


  return (
    <>
      {/* Initial Loading */}
      {isFetching && totalItems === 0 && (
        <>
          {Array.from({ length: 9 }).map((_, i) => (
            <FeedSkeletonCard key={i} />
          ))}
        </>
      )}

      {/* No items found */}
      {!isFetching && !isError && totalItems === 0 && (
        <motion.div
          className="text-center text-sm text-muted-foreground col-span-full py-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          No users found, try a different search.
        </motion.div>
      )}

      {/* Feed Items */}
      {pages.map((page) =>
        page.data.map((item) => (
          <motion.div
            key={item.id}
            className="break-inside-avoid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FeedCard item={item} />
          </motion.div>
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
          <Button variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {/* Intersection Observer Trigger */}
      {hasNextPage && <div ref={ref} className="h-1 col-span-full" />}

      {/* End Of Feed */}
      {!isFetchingNextPage && totalItems > 0 && !hasNextPage && (
        <div className="col-span-full py-6 flex flex-col items-center text-muted-foreground">
          <div className="text-base font-medium">🎉 You're all caught up</div>
          <div className="text-xs">No more users to load.</div>
        </div>
      )}
    </>
  );
}
