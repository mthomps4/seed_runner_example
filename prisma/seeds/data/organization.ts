import { CreateOrganizationInput } from '../../../types';

const devOrgs: CreateOrganizationInput[] = [
  {
    name: 'Echobind',
    slug: 'echobind',
  },
];

const prodOrgs: CreateOrganizationInput[] = [
  {
    name: 'Cypress Design',
    slug: 'cypress-design',
  },
];

const appEnv = process.env.APP_ENV || 'development';

export const orgCreateData: CreateOrganizationInput[] =
  appEnv === 'production' ? prodOrgs : devOrgs;
