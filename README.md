# tvtest_ui

> tvtest_ui

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# dependencies
"dependencies": {
    "@form-create/designer": "^1.0.7",
    "@form-create/element-ui": "^2.5.22",
    "@form-create/iview": "^2.5.22",
    "axios": "^0.21.4",
    "element-ui": "^2.6.1",
    "iview": "^3.5.4",
    "peer": "^0.6.1",
    "vue": "^2.6.12",
    "vue-cookie": "^1.1.4",
    "vue-cookies": "^1.7.4",
    "vue-json-editor": "^1.4.3",
    "vue-jsonp": "^0.1.8",
    "vue-resource": "^1.5.1",
    "vue-router": "^3.4.4",
    "vue-trackevent": "^1.0.1"
  }
  
# 解决本地调试跨域
tvtest_ui/config/index.js

module.exports下配置:
proxyTable: {
      '/api': {
        target: 'http://localhost:5000',
         secure: false,           //如果是https接口，需要配置这个参数
         changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
         pathRewrite: {
           '^/api': '/api'  // 路径重写
         }
       },
     }, 
     
原理和含义：

前端请求http://localhost:8080/api的path时，vue会转发到http://localhost:5000/api，由于前端是页面地址是http://localhost:8080，所以浏览器并不认为跨域；
实际是vue做了一次转发
