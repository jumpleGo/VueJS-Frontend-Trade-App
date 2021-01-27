import About from '@/views/pages/about'
import Documentation from '@/views/pages/documentation.vue'
import Term from '@/views/pages/term.vue'
import Contacts from '@/views/pages/contacts.vue'

const clientRoutes = [
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: Documentation,
  },
  {
    path: '/term',
    name: 'term',
    component: Term,
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
  },
]

export default clientRoutes
