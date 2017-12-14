import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import StandardfileClient from './standardfile-client';
import '../node_modules/spectre.css/src/spectre.scss';
import '../node_modules/spectre.css/src/spectre-icons.scss';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    passwords: {}
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
    addOrUpdate(state, payload) {
      state.passwords = _.set(state.passwords, payload.item.uuid, payload.item);
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    addOrUpdate(context, passwordItem) {
      context.commit('addOrUpdate', passwordItem);
    }
  }
});

const client = new StandardfileClient('http://localhost:8888');

client.signIn('test', 'test').then(() => {
  client.observerable.subscribe(
    passwordItem => {
      store.dispatch('addOrUpdate', passwordItem);
    },
    x => {
      console.error('error', x);
    },
    x => {
      console.info('done', x);
    }
  );
});

// console.log(client);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
});
