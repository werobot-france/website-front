import Vue from 'vue'
import VueStorage from 'vue-ls';

Vue.use(VueStorage, {
  namespace: 'werobot__',
  name: 'ls',
  storage: 'local'
});