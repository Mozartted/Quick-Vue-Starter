import VueCookie from 'vue-cookie';
import {
  currentUserIsAllowed,
  currentUserOrganization,
  loadCurrentUser,
  subdomain as SUBDOMAIN,
} from '../helpers';
import storeFunc from '../store';

const store = storeFunc();
const currentUserQueue = [];

export const auth = (to, from, next) => {
  next(VueCookie.get('uat') ? true : '/login');
};

export const checkUserRole = (to, from, next) => {
  if (!currentUserIsAllowed(to.meta.roles, to.meta.allowIf)) {
    next(to.path === from.path ? '/' : false);
  } else {
    next();
  }
};

export const fetchCurrentUser = (to, from, next) => {
  if (currentUserQueue.length) {
    return currentUserQueue.push(next);
  }

  currentUserQueue.push(next);
  const proceed = () => {
    // Loading.hide();
    let current = currentUserQueue.shift();
    while (current) {
      current();
      current = currentUserQueue.shift();
    }
  };

  // Loading.show();
  return loadCurrentUser()
    .then((currentUser) => {
      store.commit('users/SET_CURRENT_USER', currentUser);
      proceed();
    })
    .catch((resp) => {
      proceed();
    });
};

export const domain = (to, from, next) => {
  next(SUBDOMAIN ? '/' : true);
};

export const guest = (to, from, next) => {
  // check that token exists. Redirect to protected entry point
  if (VueCookie.get('uat')) {
    const lastPage = localStorage.getItem('last_page');
    if (lastPage && lastPage !== to.path) {
      return next(lastPage);
    }
    next('/');
  } else {
    next();
  }
};

export const redirect = (to, from, next) => {
  let path;
  if (typeof to.meta.redirect === 'function') {
    path = to.meta.redirect(store);
  } else {
    path = typeof to.meta.redirect === 'string' ? to.meta.redirect : '/';
  }
  next(path);
};

export const subdomain = (to, from, next) => {
  next(SUBDOMAIN ? true : '/');
};

export const track = (to, from, next) => {
  // save the last visited page
  localStorage.setItem('last_page', to.path + location.search);
  next();
};

export const sessioned = (to, from, next) => {
  if ((!currentUserOrganization ||
    !currentUserOrganization.currentSession) &&
    to.path !== '/settings/session') {
    next('/settings/session');
  } else {
    next();
  }
};

export default {
  auth,
  checkUserRole,
  domain,
  guest,
  subdomain,
  track,
};
