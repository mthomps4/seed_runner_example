import { UserCreateInput } from '../../../../types';

import { initialDevUsers } from './devUsers';
import { initialProdUsers } from './prodUsers';

const appEnv = process.env.APP_ENV || 'development';

export const userCreateData = (orgId: string): UserCreateInput[] =>
  appEnv === 'production' ? initialProdUsers(orgId) : initialDevUsers(orgId);
