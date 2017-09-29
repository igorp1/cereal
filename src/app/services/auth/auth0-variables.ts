interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '74CZKbLb9m7QnhYPdjjpL3CTCQKu35Cj',
  domain: 'cerealstop.auth0.com',
  callbackURL: 'http://localhost:4200/callback',
  apiUrl: 'https://cerealstop.api.com/'
};

