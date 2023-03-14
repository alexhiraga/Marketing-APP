<template>
    <div class="ProjectList">
            <h1>Projects</h1>
            
            <b-table hover striped borderless
                id="projectList"
                ref="projectList"
                :items="projects"
                :fields="fields"
                sort-icon-left
                @row-clicked="onRowClicked"
            >

                <template #table-busy>
                    <div class="text-center text-light my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                    </div>
                </template>

                <template #cell(status)="data">
                    <b-badge :variant="getRoleColor(data.item.status)">
                        {{ getStatusName(data.item.status) }}
                    </b-badge>
                </template>

                <template #cell(users)="data">
                    <div>

                        <b-avatar-group size="30px">
                            <b-avatar 
                                v-for="item in data.item.users" 
                                :key="item" 
                                :src="item.image"
                                v-b-tooltip.hover
                                :title="item.name"
                            ></b-avatar>
                        </b-avatar-group>
                    </div>
                </template>
            </b-table>
    </div>
</template>

<script>
// import projects from '@/data/projects'
import users from '@/data/users'

export default {
    name: 'ProjectList',
    data() {
        return {
            projects: [],
            users,
            fields: [
                {
                    key: 'name',
                    label: 'Project',
                    sortable: false,
                    thClass: 'text-left',
                    thStyle: 'width: 70%',
                    tdClass: 'text-left'
                },
                {
                    key: 'status',
                    label: 'Status',
                    sortable: true,
                    thStyle: 'width: 10%',
                },
                {
                    key: 'users',
                    label: 'Members',
                    sortable: false,
                    tdStyle: 'align-items: center'
                },
            ],
            members: [],
        }
    },

    mounted() {
        this.getProjects()
        // this.getUsers()
        this.$refs.projectList.refresh()
    },

    methods: {
        async getProjects() {
            try {
                this.projects = (await this.$http.get('/projects')).data
            } catch(e) {
                console.error(e)
            }
        },

        onRowClicked(item) {
            this.$router.push(`/project/${item.project_id}`)
        },
        // getUsers() {
        //     this.projects.map(e => {
        //         for(let id in e.members) {
        //             for(let item in this.users) {
        //                 if(e.members[id] == this.users[item].user_id) {
        //                     // this.$set(e.members, 'id', this.users[item])
        //                     e.members[id] = this.users[item]
        //                     continue
        //                 }
        //             }
        //         }
        //     })
        // },
    },
}
</script>

<style>
    #projectList {
        cursor: pointer;
    }

</style>
