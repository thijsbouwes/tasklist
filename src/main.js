// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Task from './components/Task';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';
import './assets/sass/style.scss';

Vue.config.productionTip = false;

Vue.component('task', Task);
Vue.component('tasks-list', TasksList);
Vue.component('task-form', TaskForm);

window.jQuery = require('jquery');
window.Vue = require('vue');
window.axios = require('axios');
window.Popper = require('popper.js').default;
require('bootstrap');
require('bootstrap-select');

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});