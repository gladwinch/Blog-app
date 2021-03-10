import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueModular from '../lib'
import router from './router'
import store from './store'
// modules
import auth from './modules/auth'
import blog from './modules/blog'

Vue.config.productionTip = false

// use the plugin and pass modules, vuex store and vue router
Vue.use(VueModular, {
    modules: { auth, blog },
    store,
    router
})

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
