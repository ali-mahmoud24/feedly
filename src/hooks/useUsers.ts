import { useInfiniteQuery } from '@tanstack/react-query';
import http from '../lib/axios';

export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  address: string;
  birthdate: string;
};

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

const fetchUsersPage = async (offset: number): Promise<ApiResponse> => {
  const res = await http.get('/users', {
    params: {
      limit: 20, // default page size
      offset,
    },
  });
  return res.data;
};

export const USERS_QK = 'USERS' as const;

export function useUsersInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: [USERS_QK],
    initialPageParam: 0,

    queryFn: ({ pageParam }) => fetchUsersPage(pageParam),

    // getNextPageParam: (lastPage) =>
    //   lastPage.pagination.hasNext ? lastPage.pagination.nextPage : undefined,

    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.pagination;

      if (!pagination || typeof pagination.hasNext !== 'boolean') {
        return undefined;
      }

      return pagination.hasNext ? pagination.nextPage : undefined;
    },
  });
}
