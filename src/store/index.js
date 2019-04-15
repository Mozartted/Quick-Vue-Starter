import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import env from '../../env';

import custom from './custom';
import onboard from './onboard';
import users from './users';

Vue.use(Vuex);

export default function () {
  const store = new Vuex.Store({
    plugins: [createPersistedState({
      key: env.STORE_KEY,
    })],
    modules: {
      custom,
      onboard,
      users,
    },
  });

  return store;
}
