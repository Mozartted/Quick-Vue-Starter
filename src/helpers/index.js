import Vue from 'vue';
import VueCookie from 'vue-cookie';
import storeFunc from '../store';
import env from '../../env';

export const lazyLoad = path =>
  () => import(`../${path}.vue`);

export default {
  lazyLoad,
};
