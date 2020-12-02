import Login from '@/views/Login'
import Main from '@/views/Main'
import Registration from '@/views/Registration'
import Dashboard from '@/views/Dashboard'
import ResetPassword from '@/views/ResetPassword'
import Withdrawal from '@/views/Withdrawal'
import Merchant from '@/views/BalanceMerchant'
import Verification from '@/views/Verification'
import AdminPanel from '@/views/AdminPanel'

import store from "@/store/"

// Middleware
const ifNotAuthenticated = (to, from, next) => {
  !localStorage.getItem('tradingBTCToken') ? next() : next('/dashboard')
}

const ifAuthenticated = async (to, from, next) => {
  if (localStorage.getItem('tradingBTCToken')) {
    await store.dispatch('auth/CHECK_AUTH')
    next()
  } else {
    next('/login')
  }
  
}

const isAdmin = async (to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  console.log("🚀 ~ file: admin-router.js ~ line 30 ~ isAdmin ~ currentUser", currentUser)

  if (currentUser.isAdmin) {
    next()
  } else {
    next(from.fullPath)
  }
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
  },
  {
    path: '/withdrawal',
    name: 'withdrawal',
    component: Withdrawal,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/merchant',
    name: 'merchant',
    component: Merchant,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/verify',
    name: 'verify',
    component: Verification,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel,
    beforeEnter: isAdmin
  }
]

export default adminRoutes
