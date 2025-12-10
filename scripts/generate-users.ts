import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOTAL_ITEMS = 200;

const users = Array.from({ length: TOTAL_ITEMS }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatarUrl: faker.image.avatar(),
  address: `${faker.location.city()}, ${faker.location.country()}`,
  birthdate: faker.date
    .birthdate({ min: 18, max: 65, mode: 'age' })
    .toISOString()
    .split('T')[0],
}));

// Output as TS file that exports the array
const output = `
// Auto-generated. Do not edit manually.
export const users = ${JSON.stringify(users, null, 2)};
`;

const filePath = path.resolve(__dirname, '../src/data/users.ts');
fs.writeFileSync(filePath, output.trim() + '\n');

console.log(`✅ Generated users.ts (${TOTAL_ITEMS} items) → ${filePath}`);
