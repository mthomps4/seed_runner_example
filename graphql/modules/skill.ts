import { objectType, extendType, inputObjectType, list, arg, nonNull } from 'nexus';

import { isAdmin } from '../../services/permissions';

// Skill Type
export const Skill = objectType({
  name: 'Skill',
  description: 'A Skill',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.boolean('archived');

    t.field('users', {
      type: list('User'),
      resolve: async (parent, _, context) => {
        return context.prisma.skill.findUnique({ where: { id: parent.id } }).users();
      },
    });
  },
});

// Queries
export const SkillQueries = extendType({
  type: 'Query',
  definition: (t) => {
    // List Skills Query
    t.field('skills', {
      type: list('Skill'),
      authorize: (_root, _args, ctx) => !!ctx.user,
      args: {
        where: arg({ type: 'SkillWhereInput' }),
        orderBy: arg({ type: 'SkillOrderByInput', list: true }),
      },
      description: 'Returns found skills',
      resolve: async (_root, args, ctx) => {
        const { where = {}, orderBy = [] } = args;

        return await ctx.db.skill.findMany({ where, orderBy });
      },
    });

    // single query
    t.field('skill', {
      type: 'Skill',
      description: 'Returns a specific Skill',
      authorize: (_root, _args, ctx) => !!ctx.user,
      args: {
        where: nonNull(arg({ type: 'SkillWhereUniqueInput' })),
      },
      resolve: (_root, args, ctx) => {
        const { where } = args;
        return ctx.prisma.skill.findUnique({ where });
      },
    });
  },
});

// Mutations
export const SkillMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createSkill', {
      type: 'Skill',
      description: 'Creates a Skill',
      authorize: (_root, _args, ctx) => isAdmin(ctx.user),
      args: {
        data: nonNull(arg({ type: 'SkillCreateInput' })),
      },
      resolve: async (_root, args, ctx) => {
        const { data } = args;
        const existingSkill = await ctx.db.skill.findUnique({ where: { name: data.name } });

        if (existingSkill) {
          throw new Error('Skill already exists.');
        }

        return await ctx.db.skill.create(args);
      },
    });

    t.field('updateSkill', {
      type: 'Skill',
      description: 'Updates a Skill',
      authorize: (_root, _args, ctx) => isAdmin(ctx.user),
      args: {
        where: nonNull(arg({ type: 'SkillWhereUniqueInput' })),
        data: nonNull(arg({ type: 'UpdateSkillInput' })),
      },
      resolve: async (_root, args, ctx) => {
        const { where, data } = args;
        return await ctx.db.skill.update({ where, data });
      },
    });
  },
});

// MUTATION INPUTS
export const SkillCreateInput = inputObjectType({
  name: 'SkillCreateInput',
  description: 'Input used to create a skill',
  definition: (t) => {
    t.nonNull.string('name');
    t.string('description');
    t.string('id');
    t.boolean('archived');
  },
});

export const UpdateSkillInput = inputObjectType({
  name: 'UpdateSkillInput',
  description: 'Input used to update a skill',
  definition: (t) => {
    t.string('name');
    t.boolean('archived');
    t.string('description');
  },
});

// QUERY INPUTS
export const SkillOrderByInput = inputObjectType({
  name: 'SkillOrderByInput',
  description: 'Order skill by a specific field',
  definition(t) {
    t.field('name', { type: 'SortOrder' });
  },
});

export const SkillWhereUniqueInput = inputObjectType({
  name: 'SkillWhereUniqueInput',
  description: 'Input to find skills based on unique fields',
  definition(t) {
    t.id('id');
    t.string('name');
  },
});

export const SkillWhereInput = inputObjectType({
  name: 'SkillWhereInput',
  description: 'Input to find skills based on other fields',
  definition(t) {
    t.field('name', { type: 'StringFilter' });
    t.boolean('archived');
  },
});

export const SkillRelationFilterInput = inputObjectType({
  name: 'SkillRelationFilterInput',
  description: 'Input matching prisma relational filters for Skill',
  definition(t) {
    // NOTE: 'every' returns users with empty list - Unexpected
    // t.field('every', { type: 'SkillWhereInput' });
    t.field('none', { type: 'SkillWhereInput' });
    t.field('some', { type: 'SkillWhereInput' });
  },
});

export const SkillRelationInput = inputObjectType({
  name: 'SkillRelationInput',
  description: 'Input matching prisma relational connect for Skill',
  definition(t) {
    t.list.field('connect', { type: 'SkillWhereUniqueInput' });

    //note: for now, using set instead of disconnect but could leverage later
    // t.list.field('disconnect', { type: 'SkillWhereUniqueInput' });
    t.list.field('set', { type: 'SkillWhereUniqueInput' });
  },
});

//NOTE: SkillFieldRelationInput is used for ProjectResources specifically since skill is not a list
export const SkillFieldRelationInput = inputObjectType({
  name: 'SkillFieldRelationInput',
  description: 'Input matching prisma relational connect for Skill',
  definition(t) {
    t.field('connect', { type: 'SkillWhereUniqueInput' });
  },
});
