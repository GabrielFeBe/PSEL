import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component:()=> import('../views/RegisterView.vue')
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
const allowedRoutes = ['register', 'home']
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');
  if(token || allowedRoutes.includes(to.name as string)) {
    return next()
  } else {
    next({name: 'home'})
  }



})


export default router
