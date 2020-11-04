import Login from '@/views/Login'
import Main from '@/views/Main'
import Registration from '@/views/Registration'
import Dashboard from '@/views/Dashboard'
import ResetPassword from '@/views/ResetPassword'

// Middleware
const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('traindingBTCToken')) return next()
  next('/dashboard')
}
const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('traindingBTCToken')) return next()
  next('/login')
}

const adminRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/reset',
    name: 'reset',
    component: ResetPassword
  }
]

export default adminRoutes
