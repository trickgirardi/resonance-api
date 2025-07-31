import {
  PrismaClient,
  Gender,
  FriendshipLevel,
  RelationshipContext,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clear existing data
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('123456', 10);

  // Create 10 users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
      },
    });

    console.log(`Created user: ${user.name} (ID: ${user.id})`);

    // Create between 5 and 15 contacts for each user
    const numContacts = faker.number.int({ min: 5, max: 15 });
    for (let j = 0; j < numContacts; j++) {
      const contact = await prisma.contact.create({
        data: {
          userId: user.id,
          name: faker.person.fullName(),
          gender: faker.helpers.arrayElement(Object.values(Gender)),
          birthDay: faker.number.int({ min: 1, max: 28 }),
          birthMonth: faker.number.int({ min: 1, max: 12 }),
          birthYear: faker.number.int({ min: 1950, max: 2005 }),
          friendshipLevel: faker.helpers.arrayElement(
            Object.values(FriendshipLevel),
          ),
          relationshipContext: faker.helpers.arrayElement(
            Object.values(RelationshipContext),
          ),
          contactFrequency: faker.number.int({ min: 1, max: 30 }),
          lastInteraction: faker.date.past(),
          notes: faker.lorem.sentence(),
        },
      });
      console.log(`  - Created contact: ${contact.name}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
