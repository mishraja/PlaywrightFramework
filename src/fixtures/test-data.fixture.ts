import { runtimeConfig } from '../config/environments';

export const testData = {
  baseUrl: runtimeConfig.baseUrl,
  password: runtimeConfig.swag.password,
  usernames: runtimeConfig.swag.usernames,
} as const;
