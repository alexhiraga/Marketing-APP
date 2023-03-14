<template>
    <div class="ItemsList">
        
        <div v-if="!showForm" class="float-right mt-2 mb-2">
            <b-button @click="showFormAndCleanInput()" variant="outline-primary">Add new</b-button>
        </div>
        <div v-if="showForm" class="row">
            <div class="col-lg-3 col-md-12">
                <b-img 
                    :blank="!selectedItem.image"
                    :src="selectedItem.image ? selectedItem.image : ''"
                    rounded="circle"
                    class="mt-3"
                    fluid-grow
                    style="aspect-ratio: 1; max-width: 300px; object-fit: contain;"
                    blank-color="#777"
                ></b-img>

            </div>

            <div class="col-lg-9 col-md-12">
                <b-form class="text-left">
                    <b-form-group :label="type === 'users' ? 'Name:' : 'Project'">
                        <b-form-input
                            v-model="selectedItem.name"
                        ></b-form-input>
                    </b-form-group>

                    <div v-if="type === 'users'">
                        <b-form-group label="E-mail:">
                            <b-form-input
                            v-model="selectedItem.email"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group label="Role:">
                            <b-form-select :options="getAllRolesNames()" required v-model="selectedItem.permission"></b-form-select>
                        </b-form-group>
                    </div>
                    <div v-else>
                        <b-form-group label="Status:">
                            <b-form-select :options="getAllStatusNames()" v-model="selectedItem.status"></b-form-select>
                        </b-form-group>
                        <div v-if="selectedItem.project_id">
                            <b-form-group label="Project members:" class="mt-3 text-left">
                                <div class="d-flex mb-3" style="align-items: center" v-for="(user, index) in selectedItem.users" :key="index">
                                    <b-avatar :src="user.image" class="mr-2"></b-avatar>
                                    <b-badge class="mr-1" :variant="getRoleColor(user.permission)">{{ getRoleName(user.permission) }}</b-badge>
                                    <span>{{ user.name }}</span>
                                    <b-icon
                                        @click="removeMember(index, user)"
                                        class="ml-2"
                                        icon="x-square"
                                        variant="danger"
                                        title="Remove"
                                        style="cursor: pointer;"
                                    ></b-icon>
                                </div>
                                <div class="d-flex justify-content-between pt-3">
                                    <div>
                                        <b-button @click="showUsers = !showUsers" variant="outline-primary" size="sm" class="m-1">Manage members</b-button>
                                    </div>
                                    <div class="w-50">
                                        <b-form-input
                                            v-if="showUsers"
                                            v-model="userFilter"
                                            type="search"
                                            placeholder="Type to search users"
                                        ></b-form-input>
                                    </div>
                                </div>
                            </b-form-group>
                            <b-table 
                                v-if="showUsers"
                                hover striped borderless sort-icon-left
                                id="nonMemberList"
                                class="text-left"
                                :items="notProjectMembers()" 
                                :fields="fieldsUsers"
                                :filter="userFilter"
                                @row-clicked="addUserToProject"
                            >
                                <template #cell(name)="data">
                                    <b-avatar :src="data.item.image" class="mr-2"></b-avatar>
                                    <b-badge class="mr-1" :variant="getRoleColor(data.item.permission)">{{ getRoleName(data.item.permission) }}</b-badge>
                                    <span>{{ data.item.name }}</span>
                                </template>
                            </b-table>
                        </div>
                    </div>
                </b-form>
                
                <div class="d-flex justify-content-end mt-3 mb-2">
                    <b-button 
                        size="sm" 
                        @click="saveOrEdit()" 
                        :variant="selectedItem.user_id || selectedItem.project_id ? 'primary' : 'success' "
                        class="m-1"
                    >
                        {{ selectedItem.user_id || selectedItem.project_id ? 'Edit' : 'Add' }}
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
            id="itemsList"
            ref="itemsList"
            :items="items"
            :fields="fields"
            sort-icon-left
            show-empty
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template #empty>
                <h6>No {{ type }} registered</h6>
            </template>

            <template #cell(name)="data" v-if="type === 'users'">
                <div style="white-space: nowrap">
                    <b-avatar :src="data.item.image" size="1.7rem" class="mr-2"></b-avatar>
                    <b-badge class="mr-1" :variant="getRoleColor(data.item.permission)">{{ getRoleName(data.item.permission) }}</b-badge>
                    <span>{{ data.item.name }}</span>
                </div>
            </template>

            <template v-else #cell(name)="data">
                <div style="white-space: nowrap">
                    <b-avatar :src="data.item.image" size="1.7rem" class="mr-2"></b-avatar>
                    <b-badge class="mr-1" :variant="getStatusColor(data.item.status)">{{ getStatusName(data.item.status) }}</b-badge>
                    <span>{{ data.item.name }}</span>
                </div>
            </template>

            <template #cell(actions)="data">
                <b-button 
                    class="mx-1"
                    variant="warning" 
                    size="sm"
                    v-b-tooltip.hover
                    :title="'Edit '+type.slice(0, -1)"
                    @click="selectItem(data.item)"
                >
                    <i class="fas fa-user-edit"></i>
                </b-button>
                <b-button
                    class="mx-1"
                    variant="danger"
                    size="sm"
                    v-b-tooltip.hover
                    :title="'Delete '+type.slice(0, -1)"
                    @click="deleteItem(data.item)"
                >
                    <i class="fas fa-trash"></i>
                </b-button>
            </template>
        </b-table>

        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="itemsList"
            size="sm"
        ></b-pagination>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'ItemsList',
    props: [ 'user_info', 'type' ],

    data() {
        return {
            items: [],
            fields: [
                {
                    key: 'name',
                    label: this.type == 'users' ? 'Name' : 'Projects',
                    thClass: 'text-left',
                    tdClass: 'text-left'
                },
                {
                    key: 'actions',
                },
            ],
            fieldsUsers: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true,
                },
            ],
            selectedItem: {
                name: '',
                email: '',
                image: '',
                permission: null,
                user_id: null,
            },
            showForm: false,
            currentPage: 1,
            perPage: 10,
            tagsOptions: [],
            members: [],
            showUsers: false,
            itemsList: []
        }
    },

    computed: {
        rows() {
            return this.items.length
        }
    },

    mounted() {
        this.getData(this.type)
    },

    methods: {
        async getData(type) {
            try {
                this.items = (await this.$http.get(`/${type}`)).data
                if(type === 'projects') {
                    this.itemsList = (await this.$http.get('/users')).data
                }
            } catch(e) {
                console.error(e)
            }
        },

        async saveOrEdit() {
            let method
            let id
            if(this.type === 'users'){
                method = this.selectedItem.user_id ? 'put' : 'post'
                id = this.selectedItem.user_id ? `/${this.selectedItem.user_id}` : ''
            } else {
                method = this.selectedItem.project_id ? 'put' : 'post'
                id = this.selectedItem.project_id ? `/${this.selectedItem.project_id}` : ''
            }
            if(!this.selectedItem.permission) this.selectedItem.permission = 9
            let res
            let newData

            try {
                if(this.type === 'users') {
                    newData = {
                        name: this.selectedItem.name,
                        email: this.selectedItem.email,
                        permission: this.selectedItem.permission,
                        user_id: id,
                    }
                } else if(this.type === 'projects') {
                    newData = {
                        name: this.selectedItem.name,
                        status: this.selectedItem.status,
                        tags: this.selectedItem.tags,
                        image: this.selectedItem.image,
                        project_id: this.selectedItem.project_id
                    }
                }

                res = await this.$http[method](`/${this.type}${id}`, newData)
                if(res) {
                    this.showForm = false
                    if(!this.selectedItem.user_id && this.type === 'users') {
                        this.selectedItem.user_id = res.data[0]
                        this.items.push(this.selectedItem)
                    } else if(this.type === 'users'){
                        var newUser = this.items.findIndex(u => u.user_id == this.selectedItem.user_id)
                        this.items[newUser].name = this.selectedItem.name
                        this.items[newUser].email = this.selectedItem.email
                        this.items[newUser].permission = this.selectedItem.permission

                        //refresh user infos if he edits himself
                        if(this.selectedItem.user_id == this.user_info.user_id) {
                            this.refreshUser(this.selectedItem)
                        }
                    }
                    if(!this.selectedItem.project_id && this.type === 'projects') {
                        this.selectedItem.project_id = res.data[0]
                        this.selectedItem.users = []
                        this.items.push(this.selectedItem) 
                    } else if (this.type === 'projects') {
                        var newUser = this.items.findIndex(u => u.project_id == this.selectedItem.project_id)
                        this.items[newUser].name = this.selectedItem.name
                        this.items[newUser].status = parseInt(this.selectedItem.status)
                        this.items[newUser].image = this.selectedItem.image
                    }

                    this.selectedItem = {}
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

        deleteItem(item) {
            this.$swal.fire({
                title: 'Are you sure?',
                // text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    if(this.type === 'users') this.confirmDeleteItem(item.user_id)
                    else this.confirmDeleteItem(item.project_id)
                }
            })
        },

        async confirmDeleteItem(id) {
            try {
                await this.$http.delete(`/${this.type}/${id}`)
                if(this.type === 'users') this.items = this.items.filter(user => user.user_id != id)
                else this.items = this.items.filter(project => project.project_id != id)
                this.$swal.fire(
                    'Deleted!',
                    `The ${this.type.slice(0, -1)} has been deleted.`,
                    'success'
                )
            } catch(e) {
                console.error(e)
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: `Could not delete the ${this.type.slice(0, -1)}`
                })
            }

        },

        selectItem(user) {
            if(this.type === 'users') {
                this.selectedItem = {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    permission: user.permission,
                    user_id: user.user_id,
                }
            } else if(this.type === 'projects') {
                this.selectedItem = {
                    name: user.name,
                    status: user.status,
                    image: user.image,
                    tags: user.tags,
                    project_id: user.project_id,
                    users: user.users
                }
            }
            this.showForm = true
        },

        showFormAndCleanInput() {
            this.showForm = true
            this.selectedItem = {}
        },

        notProjectMembers() {
            let selectedItemFilter = this.selectedItem.users.map(item => { return item.user_id })

            let filteredUsers = this.itemsList.filter(item => !selectedItemFilter.includes(item.user_id))
            return filteredUsers
        },

        async addUserToProject(user) {
            try {
                const newUser = {
                    project_id: this.selectedItem.project_id,
                    user_id: user.user_id
                }
                await this.$http.post('/members', newUser)

                this.selectedItem.users.push(user)
                this.notProjectMembers() //Refresh table

            } catch(e) {
                console.error(e)
            }
        },

        async removeMember(index, item) {
            try {
                await this.$http.delete(`/members/${this.selectedItem.project_id}/${item.user_id}`)
                //Remove member from rendered list
                this.selectedItem.users.splice(index, 1)
                //Refresh table
                this.notProjectMembers()
            } catch(e) {
                console.error(e)
            }

        },

    }
}
</script>

<style>

</style>