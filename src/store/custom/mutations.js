import Vue from 'vue';

export const SET = (state, { key, value }) => {
  Vue.prototype.$set(state, key, value);
};

export const REMOVE = (state, key) => {
  delete state[key];
};
