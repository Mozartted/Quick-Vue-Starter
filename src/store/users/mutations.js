import Vue from 'vue';

export const SET_CURRENT_USER = (state, user) => {
  const ourUser = user;
  if (!ourUser.apps) {
    ourUser.apps = [];
  }
  if (!ourUser.organizations) {
    ourUser.organizations = [];
  }
  state.currentUser = ourUser;
};

export const SET_ON_CURRENT_USER = (state, { key, value }) => {
  Vue.set(state.currentUser, key, value);
};

export const ADD_APP = (state, app) => {
  if (!state.currentUser.apps) {
    Vue.set(state.currentUser, 'apps', []);
  }

  state.currentUser.apps.push(app);
};

export const ADD_ORGANIZATION = (state, organization) => {
  if (!state.currentUser.organizations) {
    Vue.set(state.currentUser, 'organizations', []);
  }

  state.currentUser.organizations.push(organization);
};

export const REMOVE_ORGANIZATION = (state, organization) => {
  const index = state.currentUser.organizations.findIndex(org => org.id === organization.id);
  if (index < 0) return;
  state.currentUser.organizations.splice(index, 1);
};

export const REMOVE_APP = (state, app) => {
  const index = state.currentUser.apps.findIndex(org => org.id === app.id);
  if (index < 0) return;
  state.currentUser.apps.splice(index, 1);
};

export const UPDATE_ORGANIZATION = (state, organization) => {
  const index = state.currentUser.organizations.findIndex(org => org.id === organization.id);
  if (index < 0) return;
  state.currentUser.organizations.splice(index, 1, organization);
};

export const UPDATE_APP = (state, app) => {
  const index = state.currentUser.apps.findIndex(org => org.id === app.id);
  if (index < 0) return;
  state.currentUser.apps.splice(index, 1, app);
};
