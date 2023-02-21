<template>
    <div>
        <h1>project list</h1>
        
        <b-table hover striped borderless
            id="projectList"
            ref="projectList"
            :items="projects"
            :fields="fields"
            sort-icon-left
            @row-clicked="onRowClicked"
        >
            <template #cell(status)="data">
                <b-badge :variant="getRoleColor(data.item.status)">
                    {{ getStatusName(data.item.status) }}
                </b-badge>
            </template>

            <template #cell(members)="data">
                <div>

                    <b-avatar-group size="30px">
                        <b-avatar 
                            v-for="item in data.item.members" 
                            :key="item" 
                            :src="item.user_photo"
                            v-b-tooltip.hover
                            :title="item.user_name"
                        ></b-avatar>
                    </b-avatar-group>
                </div>
            </template>
        </b-table>

    </div>
</template>

<script>
import projects from '@/data/projects'
import users from '@/data/users'

export default {
    name: 'ProjectList',
    data() {
        return {
            projects,
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
                    key: 'members',
                    label: 'Members',
                    sortable: false,
                    tdStyle: 'align-items: center'
                },
            ],
            members: []
        }
    },

    mounted() {
        // this.getProjects()
        this.getUsers()
        this.$refs.projectList.refresh()
    },

    methods: {
        // async getProjects() {
        //     this.projects = await axios.get(...)
        // },

        onRowClicked(item) {
            this.$router.push(`/project/${item.id}`)
        },
        getUsers() {
            this.projects.map(e => {
                for(let id in e.members) {
                    for(let item in this.users) {
                        if(e.members[id] == this.users[item].user_id) {
                            // this.$set(e.members, 'id', this.users[item])
                            e.members[id] = this.users[item]
                            continue
                        }
                    }
                }
            })
        },
    },
}
</script>

<style>
    #projectList {
        cursor: pointer;
    }

</style>
