import Vue from 'vue'
import Router from 'vue-router'
import MainBoard from '@/components/MainBoard'
import HelloWorld from '@/components/HelloWorld'
import LoginBoard from '@/components/LoginBoard'
import GoodListPage from '@/components/GoodListPage'
import TestLabBoard from '@/components/TestLabBoard'

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
    },
    {
      path: '/goodlist',
      name: 'GoodLisPage',
      component: GoodListPage
    },
    {
      path: '/dev/:mode',
      name: 'TestLabBoard',
      component: TestLabBoard
    },
    { path: '*', redirect: '/' }
  ]
})
