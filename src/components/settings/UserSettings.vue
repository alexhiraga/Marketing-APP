<template>
    <div class="UserSettings">
        <b-form class="text-left">
            <b-form-group label="Name:">
                <b-form-input
                    v-model="user.name"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group label="E-mail:">
                <b-form-input
                    v-model="user.email"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
                <div class="d-flex">

                    <b-form-input
                        v-model="user.password"
                        v-if="changePassword"
                        type="password"
                        placeholder="New password"
                        class="mr-2"
                    ></b-form-input>
                    <b-button @click="toggleChangePassword()"
                        variant="outline-secondary"
                        >
                        {{ changePassword ? 'Cancel' : 'Change password' }}
                    </b-button>
                </div>
            </b-form-group>

        </b-form>

        <b-button @click="save()" class="float-right mt-2" variant="success">Save personal info</b-button>

    </div>
</template>

<script>
export default {
    name: 'UserSettings',
    props: [ 'user_info' ],

    data() {
        return {
            user: this.user_info,
            oldUser: {},
            changePassword: false,
        }
    },

    mounted() {
        this.oldUser = structuredClone(this.user)
    },

    methods: {
        async save() {
            let user = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                image: this.user.image
            }
            if(!user.password) delete user.password

            try {
                await this.$http.put(`/users/${this.user.user_id}`, user)

                //refresh in store
                //PS: NOT WORKING, when you refresh the page, the user in store doesnt show right
                this.$store.commit('refreshUser', user)

                this.changePassword = false
            } catch(e) {
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'An unexpected error occurred.'
                })
            }

        },

        toggleChangePassword() {
            if(this.changePassword) {
                this.user.password = ''
            }
            this.changePassword = !this.changePassword
        }

    }
}
</script>

<style>

</style>