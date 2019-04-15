import Vue from 'vue';

export const SET_ON_SCHOOL = (state, { key, value }) => {
  Vue.set(state, key, value);
};

export const SET_SCHOOL = (state, school) => {
  Vue.set(state, 'school', school);
};

export const RESET_SCHOOL = (state) => {
  Vue.set(state, 'school', { ...state.default });
};
