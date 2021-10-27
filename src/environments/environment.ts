// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  aadAuthority: 'https://login.microsoftonline.com/',
  aadTenant: 'common',
  aadClientId: '8797802a-c6d8-4cf2-9be6-268f12398247',
  graphResource: 'https://graph.microsoft.com',
  redirectUri: 'http://localhost:4200',
  aadLogging: true,
  aadLogLevel: 3,
  // this is not working with electron.
  popUp: false
};
