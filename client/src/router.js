import Vue from 'vue'
import Router from 'vue-router'
import Landing from './Landing.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: Landing
        }
    ]
})