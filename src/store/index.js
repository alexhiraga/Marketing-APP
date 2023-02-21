import Vue from 'vue'
import Vuex from 'vuex'

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
        ]
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
