// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  aadAuthority: 'https://login.microsoftonline.com/',
  aadTenant: 'common',
  aadClientId: '2df1b6c9-1406-40f9-a730-b5d0462c651c',
  graphResource: 'https://graph.microsoft.com',
  redirectUri: 'http://localhost:4200',
  aadLogging: true,
  aadLogLevel: 3,
  // this is not working with electron.
  popUp: false
};
