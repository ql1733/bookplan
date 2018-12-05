/* eslint-disable */ 
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store.js'
// import { resolve } from '_uri-js@4.2.2@uri-js'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const routes = [{
        path: '/login',
        name: 'login',
        component: (resolve) => {
            import ('../view/login.vue').then(resolve)
        }
    },
    {
        path: '/register',
        name: 'register',
        component: (resolve) => {
            import ('../view/register.vue').then(resolve)
        }
    }, {
        path: '/home',
        name: 'home',
        component: (resolve) => {
            import ('../view/home.vue').then(resolve)
        }
    },
    {
        path: '/list',
        name: 'list',
        component: (resolve) => {
            import ('../view/bookList.vue').then(resolve)
        }
    },
    {
        path: '/comments',
        name: 'comments',
        component: (resolve) => {
            import ('../view/commentList.vue').then(resolve)
        }
    },
    {
        path: '/chart',
        name: 'chart',
        component: (resolve) => {
            import ('../view/chart.vue').then(resolve)
        }
    },
    {
        path: '/news',
        name: 'news',
        component: (resolve) => {
            import ('../view/news.vue').then(resolve)
        }
    },
    {
        path: "/detail/:id",
        name: 'detail',
        component: (resolve) => {
            import ('../view/detail.vue').then(resolve)
        }
    }
]
const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes
})

export default router
export function navRouter(){
    router.beforeEach((to, from, next) => {
        
        if (to.path === '/login') {
          next()
        }else if(from.path=='/'){
            next({path:'/login'})
        }else{
            next()
        }
        
        
    // next()
      })
}