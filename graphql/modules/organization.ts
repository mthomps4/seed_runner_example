import { Role } from '@prisma/client';
import { arg, inputObjectType, list, mutationField, nonNull, objectType, queryField } from 'nexus';

// Organization Type
export const Organization = objectType({
  name: 'Organization',
  description: 'An organization',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('slug');
    t.list.field('users', {
      type: 'User',
      resolve: async (root, args, ctx) => {
        return ctx.db.organization.findUnique({ where: { id: root.id } }).users();
      },
    });

    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
  },
});

// Queries
export const OrganizationsQuery = queryField('organizations', {
  type: list('Organization'),
  description: 'Returns a list of Organizations',
  args: {
    where: nonNull(arg({ type: 'OrganizationWhereInput' })),
    orderBy: arg({ type: 'OrganizationOrderByInput', list: true }),
  },
  authorize: (_root, _args, ctx) => !!ctx.user,
  resolve: (_parent, args, ctx) => {
    const { where, orderBy } = args;
    return ctx.db.organization.findMany({
      where,
      orderBy,
    });
  },
});

export const OrganizationQuery = queryField('organization', {
  type: 'Organization',
  description: 'Returns a single Organizations',
  args: {
    where: nonNull(arg({ type: 'OrganizationWhereUniqueInput' })),
  },
  authorize: (_root, _args, ctx) => !!ctx.user,
  resolve: (_parent, args, ctx) => {
    return ctx.db.organization.findUnique({ where: args.where });
  },
});

// Mutations
export const CreateOrganizationMuation = mutationField('createOrganization', {
  type: 'Organization',
  description: 'Creates a new organization',
  args: {
    data: nonNull(arg({ type: 'CreateOrganizationInput' })),
  },
  authorize: (_parent, _args, ctx) => ctx.user.roles.includes(Role.ADMIN),
  resolve: async (_root, args, ctx) => {
    const { data } = args;

    return ctx.db.organization.create({ data });
  },
});

// Inputs
export const CreateOrganizationInput = inputObjectType({
  name: 'CreateOrganizationInput',
  description: 'Input used to create an Organization',
  definition: (t) => {
    t.nonNull.string('name');
    t.nonNull.string('slug');
  },
});

export const OrganizationWhereUniqueInput = inputObjectType({
  name: 'OrganizationWhereUniqueInput',
  description: 'Input used to query a specific organization',
  definition: (t) => {
    t.id('id');
    t.id('userId');
  },
});

export const OrganizationWhereInput = inputObjectType({
  name: 'OrganizationWhereInput',
  description: 'Input used to query a organization(s)',
  definition: (t) => {
    t.id('id');
    t.field('name', { type: 'StringFilter' });
  },
});

export const OrganizationOrderByInput = inputObjectType({
  name: 'OrganizationOrderByInput',
  description: 'Order organization by a specific field',
  definition(t) {
    t.field('name', { type: 'SortOrder' });
  },
});

export const OrganizationRelationInput = inputObjectType({
  name: 'OrganizationRelationInput',
  description: 'Input matching prisma relational connect for Organization',
  definition(t) {
    t.field('connect', { type: 'OrganizationWhereUniqueInput' });
  },
});
