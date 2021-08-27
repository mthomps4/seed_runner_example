import { hashPassword } from '../../../services/auth';
import { Role, UserCreateInput } from '../../../types';

const INITIAL_PASSWORD = 'test1234';

const initialDevUsers = (orgId: string): UserCreateInput[] => [
  {
    firstName: 'Alex',
    lastName: 'Patrón',
    email: 'alexpatron@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'Designer' }] },
  },
  {
    firstName: 'Chris',
    lastName: 'Ball',
    email: 'chris@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'React' }] },
  },
  {
    firstName: 'Isaac',
    lastName: 'Myman',
    email: 'isaac@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'PM' }] },
  },
  {
    firstName: 'Michael',
    lastName: 'Yared',
    email: 'michael@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'Ruby' }] },
  },
  {
    firstName: 'Ryan',
    lastName: 'Toronto',
    email: 'rtoronto@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'React' }] },
  },
  {
    firstName: 'Sam',
    lastName: 'Selikoff',
    email: 'sselikoff@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'React' }] },
  },
  {
    firstName: 'Matt',
    lastName: 'Thompson',
    email: 'matt@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'React' }] },
  },
  {
    firstName: 'Shae',
    lastName: 'Trissler',
    email: 'shae@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'PM' }] },
  },
  {
    firstName: 'Deloris',
    lastName: 'Thompson',
    email: 'deloris@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'Ruby' }] },
  },
  {
    firstName: 'Mariah',
    lastName: 'Grey',
    email: 'mariah@echobind.com',
    password: hashPassword(INITIAL_PASSWORD),
    roles: [Role.ADMIN],
    organization: { connect: { id: orgId } },
    skills: { connect: [{ name: 'React' }] },
  },
];

const PROD_PASSWORD = 'strong_a_pw';

const initialProdUsers = (orgId: string): UserCreateInput[] => [
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

const appENV = process.env.APP_ENV || 'development';

export const userCreateData = (orgId: string): UserCreateInput[] =>
  appENV === 'production' ? initialProdUsers(orgId) : initialDevUsers(orgId);
