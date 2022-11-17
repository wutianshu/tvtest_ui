// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import cookies from 'vue-cookies'
// 引入公共JS文件
import commonJS from './commonJs/common.js'
// 引入全局变量
import global from './components/Global.vue'
// 引入公共样式文件
import './style/common.css'

import axios from 'axios'

import formCreate from '@form-create/element-ui'
import FcDesigner from '@form-create/designer'

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (!response.data.cstest_data) {
    return response
  }
  if (response.data.data.status === 1001) {
    // 未登录
    window.location.href = 'https://xxx.com/login?redirect=' + 'https://tvtest.com'
  } else if (response.data.data.status === 1002) {
    // 第三方已登录，cstest为登录
    window.document.cookie = 'cstestusername=' + response.data.data.token + ';path=/;domain=.xxx.com'
    window.location.href = response.data.cstest_data.data
  } else {
    return response
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

Vue.prototype.commonJS = commonJS
Vue.prototype.global = global
Vue.prototype.$cookies = cookies


Vue.use(ElementUI)
Vue.use(VueJsonp)
Vue.config.productionTip = false

Vue.use(formCreate)
Vue.use(FcDesigner)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
