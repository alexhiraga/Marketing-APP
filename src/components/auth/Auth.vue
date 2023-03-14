<template>
    <div class="auth-content">
        <div class="auth-modal">
            
            <div class="auth-title">{{ showSignup ? 'Register' : 'Login' }}</div>

            <div v-if="showSignup" class="input-box">
                <i class="fas fa-user"></i>
                <input v-model="user.name" type="text" required>
                <label>Name</label>
            </div>

            <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input v-model="user.email" name="email" type="text" required>
                <label>E-mail</label>
            </div>

            <div class="input-box">
                <i class="fas fa-lock"></i>
                <input v-model="user.password" name="password" type="password" required>
                <label>Password</label>
            </div>

            <div v-if="showSignup" class="input-box">
                <i class="fas fa-lock"></i>
                <input v-model="user.confirmPassword" type="password" required>
                <label>Confirm password</label>
            </div>

            <b-button v-if="showSignup" @click="signup" pill block variant="light">Register</b-button>
            <b-button v-else @click="signin" pill block variant="outline-light">Login</b-button>

            <a href @click.prevent="showSignup = !showSignup" class="text-light">
                <span v-if="showSignup">Already registered? Log-in!</span>
                <span v-else>Not registered yet? Register here!</span>
            </a>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { showError, userKey } from '@/global'

export default {
    name: 'Auth',
    data() {
        return {
            showSignup: false,
            user: {}
        }
    },

    methods: {
        signin() {
            this.$http.post(`/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },

        signup() {
            this.$http.post(`/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('@/assets/wallpaper-auth-screen.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0!important;
    }

    .auth-modal {
        background-color: rgba(0, 0, 0, 0.2);
        width: 400px;
        padding: 35px;
        border: solid 1px var(--active-btn);
        border-radius: 1rem;

        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .auth-modal input {
        margin-bottom: 1rem;
    }

    .auth-modal button {
        margin: 1rem 0;
    }

    .auth-modal input.form-control {
        background: none!important;
        border: none!important;
        border-bottom: 1px solid var(--active-btn)!important;
        color: white!important;
        border-radius: 0!important;
    } 

    .input-box {
        position: relative;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid var(--active-btn);
        margin: 20px 0;
    }

    .input-box label {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        font-size: 1em;
        color: #f0f0f0;
        font-weight: 500;
        pointer-events: none;
        transition: .5s;
    }

    .input-box input:-webkit-autofill,
    .input-box input:-webkit-autofill:focus {
        transition: background-color 600000s 0s, color 600000s 0s;
    }

    .input-box input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        color: white;
        font-weight: 600;
        padding: 0 35px 0 5px;
    }
    .input-box input:focus ~ label,
    .input-box input:not(:focus):valid ~ label {
        top: -5px;
    }
    .input-box *:focus {
        outline: none!important;
    }

    .input-box i {
        position: absolute;
        right: 8px;
        font-size: 1.2em;
        color: #f0f0f0;
        line-height: 57px;
    }

</style>