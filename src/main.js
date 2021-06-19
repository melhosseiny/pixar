import Vue from 'vue';

import router from './router';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import VueApollo from '@vue/apollo-option';
import { VToastPlugin } from '@melhosseiny/vue-aurora';
import { date } from './filters';

Vue.use(VueApollo);
Vue.use(VToastPlugin);
Vue.filter('date', date);

import App from './App.vue';

import { typography, button, table } from '@melhosseiny/aurora'; // eslint-disable-line no-unused-vars

import '@/assets/theme.css';

const httpLink = createHttpLink({
  //uri: 'http://localhost:4000/graphql'
  uri: 'https://pure-shore-08635.herokuapp.com/graphql'
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App)
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
