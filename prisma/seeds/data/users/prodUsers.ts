import { hashPassword } from '../../../../services/auth';
import { Role, UserCreateInput } from '../../../../types';

const PROD_PASSWORD = 'strong_a_pw';

export const initialProdUsers = (orgId: string): UserCreateInput[] => [
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@client.com',
    password: hashPassword(PROD_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'PM' }] },
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@client.com',
    password: hashPassword(PROD_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'React' }] },
  },
];
