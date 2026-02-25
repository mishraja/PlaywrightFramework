import fs from 'node:fs';
import path from 'node:path';

export type EnvName = 'qa' | 'uat' | 'prod' | 'dev';

export type SwagCredentials = {
  password: string;
  usernames: Record<string, string>;
};

export type RuntimeConfig = {
  env: EnvName;
  baseUrl: string;
  swag: SwagCredentials;
};

function readJsonFile<T>(absolutePath: string): T {
  const raw = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function resolveEnv(): EnvName {
  const env = (process.env.ENV ?? 'qa').toLowerCase();
  if (env === 'qa' || env === 'uat' || env === 'prod' || env === 'dev') return env;
  return 'qa';
}

function loadBaseUrl(env: EnvName): string {
  const envOverride = process.env.SWAG_BASE_URL?.trim();
  if (envOverride) return envOverride;

  const configPath = path.join(__dirname, `config-${env}.json`);
  if (fs.existsSync(configPath)) {
    const json = readJsonFile<{ baseUrl?: string }>(configPath);
    if (json.baseUrl) return json.baseUrl;
  }

  return 'https://www.saucedemo.com';
}

function loadSwagCredentials(): SwagCredentials {
  const credsPath = path.join(__dirname, 'swag.credentials.json');
  let json: Partial<SwagCredentials> = {};

  if (fs.existsSync(credsPath)) {
    json = readJsonFile<SwagCredentials>(credsPath);
  } else {
    // If file is missing, we must rely on env vars or Azure Key Vault
    // Placeholder for Azure Key Vault integration:
    // if (process.env.USE_AZURE_KEYVAULT) {
    //   const secretClient = new SecretClient(vaultUrl, credential);
    //   json.password = await secretClient.getSecret('SwagPassword');
    // }
  }

  const passwordOverride = process.env.SWAG_PASSWORD?.trim();
  const usernameOverride = process.env.SWAG_USERNAME?.trim();

  // Prefer env var, then file, then empty string (or throw error in real app)
  const password = passwordOverride || json.password || '';
  
  // Use file usernames as base, override standard_user if env var provided
  const usernames = json.usernames ? { ...json.usernames } : {
    standard_user: '',
    locked_out_user: '',
    problem_user: '',
    performance_glitch_user: '',
    error_user: '',
    visual_user: ''
  };

  if (usernameOverride) usernames.standard_user = usernameOverride;

  // Validation: Ensure we have at least the standard user and password
  if (!password || !usernames.standard_user) {
    console.warn('⚠️ WARNING: Missing Swag Labs credentials. Set SWAG_PASSWORD and SWAG_USERNAME env vars or ensure swag.credentials.json exists.');
  }

  return { password, usernames };
}

export const runtimeConfig: RuntimeConfig = (() => {
  const env = resolveEnv();
  return {
    env,
    baseUrl: loadBaseUrl(env),
    swag: loadSwagCredentials(),
  };
})();
