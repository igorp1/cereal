interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'ZvWmQqZBqqatQ7v4SHBD56OezFISC3Xy',
  domain: 'idp-dev.auth0.com',
  callbackURL: 'http://localhost:4200/callback',
  apiUrl: 'http://flux-api-idpcode.c9users.io/'
};
