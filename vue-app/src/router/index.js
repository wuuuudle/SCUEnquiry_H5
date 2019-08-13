import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/login', name: 'Login', component: Login},
    {path: '/', redirect: '/login'},
    {path: '/home', name: 'home', component: Home}
  ]
})
