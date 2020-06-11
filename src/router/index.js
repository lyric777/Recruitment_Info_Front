import Vue from 'vue';
import Router from 'vue-router';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import feather from 'vue-icon'

Vue.use(BootstrapVue)
Vue.use(feather, 'v-icon')


const Login = () => import('../components/Login')
const Index = () => import('../components/Index')
const Register = () => import('../components/Register')
const SearchResult = () => import('../components/SearchResult')
const Mark = () => import('../components/Mark')
const Result = () => import('../components/Result')
const Report = () => import('../components/Report')

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login',
      component: Login
    },
    {
      path:'/login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/search',
      component: SearchResult
    },
    {
      path: '/mark',
      component: Mark
    },
    {
      path:'/result/:markId',
      component: Result
    },
    {
      path:'/report/:keyword',
      component: Report
    }
  ],
  mode: 'history',
});

