import Vue from 'vue'
import App from './App.vue'
import router from './router'

// reset.css
import "@/assets/css/reset.css"
// iconfont.css
import "@/assets/iconfont/iconfont.css"

// 引入element
Vue.use(ElementUI)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
