// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Tasks from './components/Tasks';
import TaskLists from './components/TaksLists';
import TaskForm from './components/TaskForm';

Vue.config.productionTip = false;

Vue.component('tasks', Tasks);
Vue.component('task-lists', TaskLists);
Vue.component('task-form', TaskForm);

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
