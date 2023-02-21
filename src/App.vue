<template>
    <div id="app">
        <sidebar-menu :menu="$store.state.menu" :collapsed="collapsed" @toggle-collapse="onToggleCollapse">
            <div v-if="!collapsed" slot="footer" class="m-2">
                <a href="https://github.com/alexhiraga" target="_blank" class="text-secondary">Feito por Alex Hiraga</a>
            </div>
        </sidebar-menu>

        <div :style="collapsed ? 'width: calc(100% - 72px)' : 'width:calc(100% - 300px)'" class="float-right">

            <!-- <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </nav> -->
            
            <router-view class="m-5"/>
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

export default {
    components: {  },
    data() {
        return {
            collapsed: false,
        }
    },

    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
    
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
        }, 500)
    }
}
</script>
