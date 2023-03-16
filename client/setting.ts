import Env from './next.config.js';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8000',
  title: '🐸 Learning Azure AD 🐸',
  clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID,
  authority: process.env.NEXT_PUBLIC_MSAL_AUTHORITY,
  redirectUri: isProd ? `${Env.basePath}/account` : '/account',
};

export default setting;
