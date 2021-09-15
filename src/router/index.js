import Vue from 'vue'
import Router from 'vue-router'
import MainBoard from '@/components/MainBoard'
import HelloWorld from '@/components/HelloWorld'
import LoginBoard from '@/components/LoginBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainBoard',
      component: MainBoard
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'LoginBoard',
      component: LoginBoard
    }
  ]
})
