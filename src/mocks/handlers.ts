import { http, HttpResponse } from 'msw';

import { users } from '@/data/users';
import { type User } from '@/types/user';

// -------------------------
// Random 300–1000ms delay
// -------------------------
const delay = () =>
  new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 700));

// -------------------------
// OFFSET pagination
// ?offset=0&limit=20
// -------------------------
function paginate<T>(data: T[], params: URLSearchParams) {
  const limit = Number(params.get('limit')) || 20;
  const offset = Number(params.get('offset')) || 0;

  const items = data.slice(offset, offset + limit);

  return {
    items,
    pagination: {
      total: data.length,
      limit,
      offset,
      hasNext: offset + limit < data.length,
      nextPage: offset + limit < data.length ? offset + limit : null,
    },
  };
}

// -------------------------
// Generic search function
// -------------------------
export function search<T extends Record<string, unknown>>(
  data: T[],
  query: string | null,
  keys: (keyof T)[] // specify which fields to search
): T[] {
  if (!query) return data;

  const q = query.toLowerCase();

  return data.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      return typeof value === 'string' && value.toLowerCase().includes(q);
    })
  );
}

// -------------------------
// Helper: validate params
// -------------------------
function validateParams(params: URLSearchParams) {
  const limit = params.get('limit');
  const offset = params.get('offset');

  if (limit && Number(limit) <= 0) {
    return { error: 'limit must be a positive number', status: 400 };
  }

  if (offset && Number(offset) < 0) {
    return { error: 'offset must be a non-negative number', status: 400 };
  }

  return null;
}

// -------------------------
// Factory for LIST endpoints
// -------------------------
function listHandler<T extends Record<string, unknown>>(
  data: T[],
  searchableKeys: (keyof T)[], // fields to search
  forceError = false
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async ({ request }: any) => {
    try {
      await delay();

      if (forceError) {
        return HttpResponse.json(
          { status: 'error', message: 'Simulated server error' },
          { status: 500 }
        );
      }

      const params = new URL(request.url).searchParams;

      // Validate params (optional)
      const validation = validateParams(params);
      if (validation) {
        return HttpResponse.json(
          {
            status: 'error',
            message: validation.error,
          },
          { status: validation.status }
        );
      }

      // Search using typed keys
      const q = params.get('q');
      const filtered = search(data, q, searchableKeys);

      // Pagination
      const { items, pagination } = paginate(filtered, params);

      return HttpResponse.json(
        {
          status: 'success',
          message: 'Fetched successfully',
          data: items,
          pagination,
        },
        { status: 200 }
      );
    } catch {
      return HttpResponse.json(
        {
          status: 'error',
          message: 'Internal server error',
        },
        { status: 500 }
      );
    }
  };
}

// -------------------------
// API Handlers
// -------------------------
export const handlers = [
  // GET api/users: offset-based pagiantion search by name, email
  http.get('/api/users', listHandler<User>(users, ['name', 'email'])),
];
