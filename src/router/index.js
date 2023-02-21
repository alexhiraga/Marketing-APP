import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    // {
    //     path: '*',
    //     redirect: '/'
    // },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/project',
        name: 'project',
        component: () => import('../views/project/ProjectList.vue')
    },
    {
        path: '/project/:id',
        name: 'projectId',
        props: true,
        component: () => import('../components/project/ProjectId.vue'),
    },
    {
        path: '/project/:id/settings',
        name: 'ProjectSettings',
        props: true,
        component: () => import('../components/project/project-components/settings/ProjectSettings.vue'),
    },
    {
        path: '/project/:id/posts',
        name: 'PostsList',
        props: true,
        component: () => import('../components/project/project-components/posts/PostsList.vue'),
    },
    {
        path: '/project/:id/posts/:postid',
        name: 'PostId',
        props: true,
        component: () => import('../components/project/project-components/posts/post-view/PostId.vue')
    },
    {
        path: '/project/:id/posts/:postid/view',
        name: 'PostsFeed',
        props: true,
        component: () => import('../components/project/project-components/posts/post-view/PostsFeed.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
