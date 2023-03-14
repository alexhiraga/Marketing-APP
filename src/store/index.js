import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        menu: [
            // {
            //     header: true,
            //     title: 'Main Navigation',
            //     hiddenOnCollapse: true
            // },
            {
                href: '/',
                title: 'Dashboard',
                icon: 'fa fa-user'
            },
            // {
            //     href: '/projects',
            //     title: 'Projects',
            //     icon: 'fas fa-list-ul'
            // },
            {
                href: `/project/`,
                title: 'Projects',
                icon: 'fas fa-list-ul',
                child: []
            },
            {
                href: '/settings/',
                title: 'General Settings',
                icon: 'fas fa-user-cog'
            }
        ],
        user: null
    },
    getters: {
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        },
        refreshUser(state, user) {
            if(!user) return
            state.user.name = user.name
            state.user.email = user.email
            if(!user.permission) return
            state.user.permission = user.permission
        }
    },
    actions: {
    },
    modules: {
    }
})
