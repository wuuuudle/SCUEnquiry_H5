import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const Login = () => import('../components/login');
const Index = () => import('../components/index');
const Class = () => import('../components/index/class');
const Setting = () => import('../components/index/setting');

export default new Router({
  routes: [
    {path: '/login', name: 'Login', component: Login},
    {path: '/', redirect: '/login'},
    {
      path: '/index', name: 'index', component: Index,
      redirect: '/index/class',
      children: [{path: 'class', name: 'class', component: Class},
        {path: 'setting', name: 'setting', component: Setting}]
    }
  ]
})
