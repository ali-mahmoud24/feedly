import { useInfiniteQuery } from '@tanstack/react-query';
import http from '@/lib/axios';

import type { User } from '@/types/user';


type Pagination = {
  total: number;
  limit: number;
  offset: number;
  hasNext: boolean;
  nextPage: number | null;
};

type ApiResponse = {
  status: string;
  message: string;
  data: User[];
  pagination: Pagination;
};

const fetchUsersPage = async (
  offset: number,
  query: string
): Promise<ApiResponse> => {
  const res = await http.get('/users', {
    params: {
      limit: 20, // default page size
      offset,
      q: query || undefined,
    },
  });
  return res.data;
};

export const USERS_QK = 'USERS' as const;

export function useUsersInfiniteQuery(query: string) {
  return useInfiniteQuery({
    queryKey: [USERS_QK, query],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchUsersPage(pageParam, query),
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.pagination;

      if (!pagination || typeof pagination.hasNext !== 'boolean') {
        return undefined;
      }

      return pagination.hasNext ? pagination.nextPage : undefined;
    },
  });
}
