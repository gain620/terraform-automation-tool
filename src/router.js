import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateVM from './views/CreateVM.vue'
import Show from './components/IndexMovie.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [

    // loads Home component
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/page/create-new-v-ms',
      name: 'create-vm',
      component: CreateVM
    },
    {
      path: '/:id',
      name: 'show',
      component: Show
    }
    // {
    //   path: '/page/:sectionSlug',
    //   name: 'dynamicContent',
    //   // route level code-splitting
    //   // this generates a separate chunk (dynamicContent.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "dynamicContent" */ './views/DynamicContent.vue')
    // },

  ]
})
