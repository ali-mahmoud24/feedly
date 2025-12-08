import { faker } from '@faker-js/faker';

// ========================= USERS =============================
const TOTAL_ITEMS = 150;

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export const users: User[] = Array.from({ length: TOTAL_ITEMS }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  avatarUrl: faker.image.avatar(), // consistent avatars
}));


// ========================= POSTS =============================
export type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
};

export const posts: Post[] = Array.from({ length: TOTAL_ITEMS }).map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(2),
  imageUrl: faker.image.urlLoremFlickr({
    width: 640,
    height: 480,
    category: 'nature',
  }),
}));

// ========================= PRODUCTS =============================
export type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
};

export const products: Product[] = Array.from({ length: TOTAL_ITEMS }).map(
  () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price({ min: 10, max: 200, symbol: '$' }),
    imageUrl: faker.image.urlLoremFlickr({
      width: 300,
      height: 300,
      category: 'technics',
    }),
  })
);
