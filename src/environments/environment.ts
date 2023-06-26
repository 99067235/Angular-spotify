export const environment = {
  spotifyAuthConfig: {
    clientId: 'YOUR_CLIENT_ID',
    redirectUri: 'http://localhost:4200/callback',
    responseType: 'token',
    scope: 'user-read-private user-read-email',
    showDebugInformation: true,
  },
};
