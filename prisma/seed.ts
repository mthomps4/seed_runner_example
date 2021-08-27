import { PrismaClient } from '@prisma/client';

import { orgCreateData } from './seeds/data/organization';
import { skillCreateData } from './seeds/data/skills';
import { userCreateData } from './seeds/data/user';
import { seedOrganizations } from './seeds/runners/organizations';
import { seedSkills } from './seeds/runners/skills';
import { seedUsers } from './seeds/runners/users';
const prisma = new PrismaClient();

// QUESTION: Should we use this here instead?
// import { prisma, connect, disconnect } from '../../lib/prisma';

async function main() {
  // Example of needing a dependency from the return
  const [{ id: orgId }] = await seedOrganizations(prisma, orgCreateData);
  // Example of table seeds
  await seedSkills(prisma, skillCreateData);
  // Example of Prod VS Dev Seeds with a dependency
  await seedUsers(prisma, userCreateData(orgId));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
