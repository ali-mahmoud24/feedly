import { faker } from '@faker-js/faker';

const TOTAL_ITEMS = 200;

export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  birthdate: string;
  avatarUrl: string;
};

export const users: User[] = Array.from({ length: TOTAL_ITEMS }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatarUrl: faker.image.avatar(), // consistent avatar URL
  address: `${faker.location.city()}, ${faker.location.country()}`,
  birthdate: faker.date
    .birthdate({ min: 18, max: 65, mode: 'age' })
    .toISOString()
    .split('T')[0],
}));
