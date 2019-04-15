import env from '../../env';

// const parentUserHasApp = (user, subdomain, appName) => {
//   if (!parentsSubdomainOnly(user, subdomain)) {
//     return false
//   }
//   let app = user.apps.find(app => app.name.toLowerCase().indexOf(appName) !== -1)
//   return app
// }
//
// const parentsSubdomainOnly = (user, subdomain) => {
//   return subdomain == 'parents'
// }
//
// // const parentsSubdomainOnly = (user, subdomain) => {
// //   return subdomain == 'parents'
// // }
//
// const schoolsSubdomainOnly = (user, subdomain) => {
//   return !(!subdomain) && env.SUBDOMAINS.indexOf(subdomain) == -1
// }
//
// const domainOnly = (user, subdomain) => {
//   return !subdomain
// }

export default [
  {
    name: 'guest',
    roles: '*',
    servers: '*',
  },
];
