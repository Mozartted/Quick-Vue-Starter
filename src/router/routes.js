import Route from 'vue-routisan';
import activeModules from '../pages/active';

Route.setViewResolver(component => () => import(`../${component}.vue`));

activeModules.forEach((modul) => {
  try {
    const moduleRoute = require(`../pages/${modul.name}/router.js`).default;
    const view = (route) => {
      let viewed = {};
      const innerGuards = {};
      if (route.path && route.component) {
        viewed = Route.view(route.path, route.component);
      }
      const guards = [];
      // guards.push(checkUserRole);
      // route.options = route.options || {};
      // route.options.meta = route.options.meta || {};
      // route.options.meta.allowIf = route.options.meta.allowIf || modul.allowIf;
      // route.options.meta.servers = route.options.meta.servers || modul.servers;
      // route.options.meta.roles = route.options.meta.roles || modul.roles;
      // route.options.meta.redirect = route.redirect || false;
      //
      //   if (viewed) {
      //     viewed.options(route.options);
      //   }
      //
      //   if (!route.hasOwnProperty('subdomain') && parentGuards.hasOwnProperty('subdomain')) {
      //     route.subdomain = parentGuards.subdomain
      //   }
      //
      //   if (route.subdomain) {
      //     guards.push(subdomain)
      //     innerGuards.subdomain = true
      //   } else if (route.subdomain === false) {
      //     innerGuards.subdomain = false
      //     guards.push(domain)
      //   }
      //
      //   if (!route.hasOwnProperty('protected') && parentGuards.hasOwnProperty('protected')) {
      //     route.protected = parentGuards.protected
      //   }

      // if (route.protected) {
      //   guards.push(track)
      //   guards.push(auth)
      //   innerGuards.protected = true
      // } else if (route.protected === false) {
      //   guards.push(guest)
      //   innerGuards.protected = false
      // }

      // if (route.protected && route.subdomain && route.sessioned !== false) {
      //   guards.push(sessioned)
      // }

      // if (viewed) {
      //   viewed.guard(guards)
      // }

      if (!route.redirect && route.children) {
        if (viewed) {
          viewed.children(() => {
            route.children.forEach((childRoute) => {
              view(childRoute, innerGuards);
            });
          });
        } else {
          route.children.forEach((childRoute) => {
            view(childRoute, innerGuards);
          });
        }
      }
    };
    view(moduleRoute);
  } catch (e) {
    console.error(modul.name, 'router error', e.message);
  }
});

// must always come last
Route.view('*', 'pages/404');
// Route.redirect('*', '/');

export default Route.all();
