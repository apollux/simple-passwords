import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import injector from 'vue-inject';
import invariant from 'invariant';
import PasswordItem from './domain/PasswordItem';
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
    addOrUpdate(state, passwordItem) {
      state.passwords = {
        ..._.set(state.passwords, passwordItem.uuid, passwordItem)
      };
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    addOrUpdate(context, payLoad) {
      invariant(
        _.includes(['add-or-update', 'saved'], payLoad.action),
        `unexpected action: ${payLoad.action}`
      );
      if (payLoad.action === 'add-or-update') {
        context.commit('addOrUpdate', payLoad.item);
      } else if (payLoad.action === 'saved') {
        context.commit('addOrUpdate', payLoad.item);
      }
    }
  }
});

const client = new StandardfileClient('http://localhost:8888');

client.signIn('test', 'test').then(() => {
  client.observerable
    .filter(item => item.item.contentType === 'password-item')
    .subscribe(
      passwordItem => {
        const content = JSON.parse(passwordItem.item.content);
        const item = new PasswordItem(
          _.assign(content, {
            created_at: passwordItem.item.createdAt,
            updated_at: passwordItem.item.updatedAt,
            uuid: passwordItem.item.uuid,
            content_type: passwordItem.item.contentType
          })
        );
        console.log(item);
        store.dispatch('addOrUpdate', { ...passwordItem, item });
      },
      x => {
        console.error('error', x);
      },
      x => {
        console.info('done', x);
      }
    );
});

injector.factory('standardfileClient', () => client).lifecycle.application();

Vue.config.productionTip = false;
Vue.use(injector);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
});
