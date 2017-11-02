// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  aadAuthority: 'https://login.microsoftonline.com/',
  aadTenant: 'common',
  aadClientId: '789b7daa-39aa-4a80-925c-5af317dcbef1',
  graphResource: 'https://graph.microsoft.com',
  adalLogging: true,
  adalLogLevel: 3,
  // this is not working with electron.
  popUp: true
};
