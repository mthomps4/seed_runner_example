import { PrismaClient } from '@prisma/client';

import { CreateOrganizationInput, Organization } from '../../../types';

type SeedOrgResult = Pick<Organization, 'name' | 'id'>;

export const seedOrganizations = async (
  prisma: PrismaClient,
  organizations: CreateOrganizationInput[]
): Promise<SeedOrgResult[]> => {
  const orgPromiseArray = organizations.map(
    (orgArgs): Promise<SeedOrgResult> =>
      prisma.organization.upsert({
        where: {
          slug: orgArgs.slug,
        },
        create: {
          name: orgArgs.name,
          slug: orgArgs.slug,
        },
        update: {},
        select: {
          name: true,
          id: true,
        },
      })
  );

  return Promise.all(orgPromiseArray);
};
