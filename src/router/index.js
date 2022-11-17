import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tools from '@/page/Tools'
import WebformLib from '@/page/WebformLib'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tools',
      name: 'Tools',
      component: Tools
    },
    {
      path: '/webformlib',
      name: 'WebformLib',
      component: WebformLib
    }
  ]
})
