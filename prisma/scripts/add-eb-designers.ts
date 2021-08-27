import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../services/auth';
import { Role, UserCreateInput } from '../../types';

import { seedUsers } from '../seeds/runners/users';
const prisma = new PrismaClient();

// Hey, we've had a few more employees join -- can you create an account for them?!
// one off script to add new folks
const main = async () => {
  const org = await prisma.organization.findFirst({ where: { name: 'Echobind' } });

  if (!org) {
    console.log('\n\n\n Organization: "Echobind" not found... \n\n\n');

    return;
  }

  const INITIAL_PASSWORD = 'test1234';

  const newEmployees: UserCreateInput[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@echobind.com',
      password: hashPassword(INITIAL_PASSWORD),
      roles: [Role.ADMIN],
      organization: { connect: { id: org.id } },
      skills: { set: [{ name: 'Design' }] },
    },
    {
      firstName: 'Alex',
      lastName: 'Patrón',
      email: 'alexpatron@echobind.com',
      password: hashPassword(INITIAL_PASSWORD),
      roles: [Role.ADMIN],
      organization: { connect: { id: org.id } },
      skills: { set: [{ name: 'Design' }] },
    },
  ];

  await seedUsers(prisma, newEmployees);
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
