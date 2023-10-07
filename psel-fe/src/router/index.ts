import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/statement',
      name: 'statement',
      component: () => import('../views/BankStatment.vue')
    }
  ]
})
// Validator similar to Middleware in Next.js;
const allowedRoutes = ['login' , 'about', 'home']
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');
  if(token || allowedRoutes.includes(to.name as string)) {
    return next()
  } else {
    next({name: 'login'})
  }



})


export default router
