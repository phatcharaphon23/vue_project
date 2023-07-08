import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../state/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [

    {
      path: '/login',
      name: 'login',

      component: () => import('../views/LoginTest.vue')
    },
    {
      path: '/importcsv',
      name: 'importcsv',

      component: () => import('../views/ImportCsv.vue')
    },
    {
      path: '/importfile',
      name: 'importfile',

      component: () => import('../views/ImportFile.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {

  if (
    to.name !== 'login' && !store.getters['GET_FILTER_USER']
  ) {
    window.location = '/login'
  }
  else if (to.name !== 'importfile' && to.name !== 'importcsv'  && store.getters['GET_FILTER_USER']) {
    window.location = '/importcsv'
  }
  else {
    next()
  }
})

export default router
