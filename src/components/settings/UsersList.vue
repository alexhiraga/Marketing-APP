<template>
    <div class="UsersList">
        
        <div v-if="!showForm" class="float-right mt-2 mb-2">
            <b-button @click="showFormAndCleanInput()" variant="outline-primary">Add new</b-button>
        </div>
        <div v-if="showForm" class="row">
            <div class="col-lg-3 col-md-12">
                <b-img 
                    :blank="!selectedUser.user_photo"
                    :src="selectedUser.user_photo ? selectedUser.user_photo : ''"
                    rounded="circle"
                    class="mt-3"
                    fluid-grow
                    style="aspect-ratio: 1; max-width: 300px; object-fit: contain;"
                    blank-color="#777"
                ></b-img>

            </div>

            <div class="col-lg-9 col-md-12">
                <b-form class="text-left">
                    <b-form-group label="Name:">
                        <b-form-input
                            v-model="selectedUser.user_name"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="E-mail:">
                        <b-form-input
                            v-model="selectedUser.email"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Role:">
                        <b-form-select :options="getAllRolesNames()" required v-model="selectedUser.permission"></b-form-select>
                    </b-form-group>
                </b-form>
                
                <div class="d-flex justify-content-end mt-3 mb-2">
                    <b-button 
                        size="sm" 
                        @click="saveOrEdit()" 
                        :variant="selectedUser.user_id ? 'primary' : 'success' "
                        class="m-1"
                    >
                        {{ selectedUser.user_id ? 'Edit' : 'Add' }}
                    </b-button>

                    <b-button 
                        size="sm" 
                        @click="showForm = false" 
                        variant="outline-secondary"
                        class="m-1"
                    >
                        Cancel
                    </b-button>
                </div>
            </div>
        </div>

        <b-table hover striped borderless
            id="usersList"
            ref="usersList"
            :items="users"
            :fields="fields"
            sort-icon-left
            show-empty
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template #empty>
                <h6>No users registered</h6>
            </template>

            <template #cell(user_name)="data">
                <div style="white-space: nowrap">
                    <b-avatar :src="data.item.user_photo" size="1.7rem" class="mr-2"></b-avatar>
                    <b-badge class="mr-1" :variant="getRoleColor(data.item.permission)">{{ getRoleName(data.item.permission) }}</b-badge>
                    <span>{{ data.item.user_name }}</span>
                </div>
            </template>

            <template #cell(actions)="data">
                <b-button 
                    class="mx-1"
                    variant="warning" 
                    size="sm"
                    v-b-tooltip.hover
                    title="Edit user"
                    @click="selectUser(data.item)"
                >
                    <i class="fas fa-user-edit"></i>
                </b-button>
                <b-button
                    class="mx-1"
                    variant="danger"
                    size="sm"
                    v-b-tooltip.hover
                    title="Delete user"
                    @click="deleteUser(data.item)"
                >
                    <i class="fas fa-trash"></i>
                </b-button>
            </template>
        </b-table>

        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="usersList"
            size="sm"
        ></b-pagination>
    </div>
</template>

<script>
export default {
    name: 'UsersList',
    props: [ 'user_info' ],

    data() {
        return {
            users: [],
            fields: [
                {
                    key: 'user_name',
                    label: 'Name',
                    thClass: 'text-left',
                    tdClass: 'text-left'
                },
                {
                    key: 'actions',
                },
            ],
            selectedUser: {
                user_name: '',
                email: '',
                user_photo: '',
                permission: null,
                user_id: null,
            },
            showForm: false,
            currentPage: 1,
            perPage: 10,
        }
    },

    computed: {
        rows() {
            return this.users.length
        }
    },

    mounted() {
        this.getUsers()
    },

    methods: {
        async getUsers() {
            try {
                this.users = (await this.$http.get('/users')).data
            } catch(e) {
                console.error(e)
            }
        },

        async saveOrEdit() {
            const method = this.selectedUser.user_id ? 'put' : 'post'
            const id = this.selectedUser.user_id ? `/${this.selectedUser.user_id}` : ''
            if(!this.selectedUser.permission) this.selectedUser.permission = 9
            let res
            try {
                res = await this.$http[method](`/users${id}`, this.selectedUser)
                if(res) {
                    this.showForm = false
                    if(!this.selectedUser.user_id) this.users.push(this.selectedUser)
                    else {
                        var newUser = this.users.findIndex(u => u.user_id == this.selectedUser.user_id)
                        this.users[newUser].user_name = this.selectedUser.user_name
                        this.users[newUser].email = this.selectedUser.email
                        this.users[newUser].permission = this.selectedUser.permission

                        //refresh user infos if he edits himself
                        if(this.selectedUser.user_id == this.user_info.user_id) {
                            this.refreshUser(this.selectedUser)
                        }
                    }
                    this.selectedUser.user_id = res.data[0]
                    this.selectedUser = {}
                }
            } catch(e) {
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: e.response.data
                })
            }
        },

        refreshUser(user) {
            this.$store.commit('refreshUser', user)
        },

        deleteUser(user) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    this.confirmDeleteUser(user.user_id)
                }
            })
        },

        async confirmDeleteUser(id) {
            try {
                await this.$http.delete(`/users/${id}`)
                this.users = this.users.filter(user => user.user_id != id)
                this.$swal.fire(
                    'Deleted!',
                    'The user has been deleted.',
                    'success'
                )
            } catch(e) {
                console.error(e)
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'Could not delete the user'
                })
            }

        },

        selectUser(user) {
            this.selectedUser = {
                user_name: user.user_name,
                email: user.email,
                user_photo: user.user_photo,
                permission: user.permission,
                user_id: user.user_id,
            }

            this.showForm = true
        },

        showFormAndCleanInput() {
            this.showForm = true
            this.selectedUser = {
                user_name: '',
                email: '',
                user_photo: '',
                permission: null,
                user_id: null,
            }
        }
    }
}
</script>

<style>

</style>