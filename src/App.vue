<template>
    <div id="app">
        <sidebar-menu 
            :menu="$store.state.menu" 
            :collapsed="collapsed" 
            @toggle-collapse="onToggleCollapse"
            v-if="user"
        >
            <div slot="footer" class="m-4">
                <a v-if="!collapsed" @click="logout()" class="vsm--link vsm--link_level-1">
                    <i class="fas fa-sign-out-alt mr-3"></i>
                    <span class="vsm--title">Logout</span>                  
                </a>
            </div>
        </sidebar-menu>

        <LoadingScreen v-if="validatingToken" />

        <div v-else>
            <div v-if="user" :style="collapsed ? 'width: calc(100% - 72px)' : 'width:calc(100% - 300px)'" class="float-right">

                <!-- <nav>
                    <router-link to="/">Home</router-link> |
                    <router-link to="/about">About</router-link>
                </nav> -->
                
                <router-view class="m-5"/>
            </div>

            <router-view v-else/>
        </div>

    </div>
</template>

<style lang="scss">
@import './css/sidebar.css';

#app {
    font-family: 'Rubik', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #f5f5f5;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

</style>

<script>
import _debounce from 'lodash/debounce'
import { mapState } from 'vuex'
import { userKey } from '@/global'
import LoadingScreen from '@/components/template/LoadingScreen'

export default {
    components: { LoadingScreen },
    data() {
        return {
            collapsed: false,
            validatingToken: true
        }
    },

    created() {
        this.validateToken()
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
    
    computed: mapState(['menu', 'user']),

    methods: {
        onToggleCollapse(collapsed) {
            this.collapsed = collapsed
        },

        myEventHandler: _debounce(function(e) {
            if(e.srcElement.innerWidth < 1140) {
                this.collapsed = true
            } else {
                this.collapsed = false
            }
        }, 500),

        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ path: '/auth' })
        },

        async validateToken() {
            this.validatingToken = true

            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

            if(!userData) {
                this.validatingToken = false
                this.$router.push({ path: '/auth'})
                return
            }

            try {
                await this.$http.post(`/validateToken`, userData)
                this.$store.commit('setUser', userData)
            } catch(e) {
                localStorage.removeItem(userKey)
                this.$router.push({ path: '/auth' })
                console.error(e)
            }


            this.validatingToken = false
        }
    }
}
</script>
