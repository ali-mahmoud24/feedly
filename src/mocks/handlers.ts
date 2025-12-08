import { http, HttpResponse } from 'msw';
import { users, posts, products } from './data';

export const handlers = [
  http.get('/api/users', () => HttpResponse.json(users)),
  http.get('/api/posts', () => HttpResponse.json(posts)),
  http.get('/api/products', () => HttpResponse.json(products)),
];
