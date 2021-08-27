// export const foo = 2;
import { PrismaClient } from '@prisma/client';

import { User, UserCreateInput } from '../../../types';

type SeedUserResult = Pick<User, 'id' | 'email'>;

export const seedUsers = async (
  prisma: PrismaClient,
  users: UserCreateInput[]
): Promise<SeedUserResult[]> => {
  const userPromiseArray = users.map(
    async (user): Promise<SeedUserResult> =>
      prisma.user.upsert({
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          roles: user.roles,
          organization: user.organization,
          skills: user.skills,
        },
        update: {},
        select: {
          id: true,
          email: true,
        },
      })
  );

  return Promise.all(userPromiseArray);
};
