import Vue from 'vue'
import VueRouter from 'vue-router'
import Player from '../views/Player.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Player',
    component: Player
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/browse',
    name: 'Browse',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Browse.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
