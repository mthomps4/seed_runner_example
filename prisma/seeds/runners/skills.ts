import { PrismaClient } from '@prisma/client';

import { Skill, SkillCreateInput } from '../../../types';

type SeedSkillResult = Pick<Skill, 'id' | 'name'>;

export const seedSkills = async (
  prisma: PrismaClient,
  skills: SkillCreateInput[]
): Promise<SeedSkillResult[]> => {
  const skillPromiseArray = skills.map(
    async (skill): Promise<SeedSkillResult> =>
      prisma.skill.upsert({
        where: {
          name: skill.name,
        },
        create: {
          name: skill.name,
          description: skill.description,
        },
        update: {},
        select: {
          id: true,
          name: true,
        },
      })
  );

  return Promise.all(skillPromiseArray);
};
