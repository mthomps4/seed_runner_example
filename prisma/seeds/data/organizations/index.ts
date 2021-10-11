import { CreateOrganizationInput } from '../../../../types';

import { prodOrgs } from './prodOrganizations';
import { devOrgs } from './devOrganizations';

const appEnv = process.env.APP_ENV || 'development';

export const orgCreateData: CreateOrganizationInput[] =
  appEnv === 'production' ? prodOrgs : devOrgs;
