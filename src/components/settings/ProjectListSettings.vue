<template>
    <div class="ProjectListSettings">
        <b-table hover striped borderless
            id="projectList"
            ref="projectList"
            :items="projects"
            :fields="fields"
            sort-icon-left
            show-empty
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template #empty>
                <h6>No projects registered</h6>
            </template>

            <template #cell(name)="data">
                <div style="white-space: nowrap">
                    <b-avatar :src="data.item.image" size="1.7rem" class="mr-2"></b-avatar>
                    <b-badge class="mr-1" :variant="getRoleColor(data.item.permission)">{{ getRoleName(data.item.permission) }}</b-badge>
                    <span>{{ data.item.name }}</span>
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
            aria-controls="projectList"
            size="sm"
        ></b-pagination>
    </div>
</template>

<script>
export default {
    Name: 'ProjectListSettings',
    data() {
        return {
            projects: [],
            fields: [
                {
                    key: 'name',
                    label: 'Project',
                    thClass: 'text-left',
                    tdClass: 'text-left'
                },
                {
                    key: 'actions',
                },
            ],
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
        this.getProjectList()
    },

    methods: {
        async getProjectList() {
            this.projects = await this.$http.get('/projects')
        },

        deleteProject(project) {
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
                    this.confirmDeleteProject(project.project_id)
                }
            })
        },

        async confirmDeleteProject(id) {
            try {
                await this.$http.delete(`/projects/${id}`)
                this.projects = this.projects.filter(project => project.project_id != id)
                this.$swal.fire(
                    'Deleted!',
                    'The project has been deleted.',
                    'success'
                )
            } catch(e) {
                console.error(e)
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'Could not delete the project'
                })
            }

        },
    }

}
</script>

<style>

</style>