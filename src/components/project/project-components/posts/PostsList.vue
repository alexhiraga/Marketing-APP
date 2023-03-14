<template>
    <div class="PostsList">
        <h2>Posts</h2>

        <div class="row pt-4">
            <div class="col-lg-8 col-sm-12">

                <b-table hover striped borderless
                    id="projectList"
                    ref="projectList"
                    :items="getPostsLists"
                    :fields="fields"
                    sort-icon-left
                    @row-clicked="onRowClicked"
                >

                    <template #cell(status)="data">
                        <b-badge :variant="getRoleColor(data.item.status)">
                            {{ getStatusName(data.item.status) }}
                        </b-badge>
                    </template>
    
                </b-table>
            </div>

            <div class="col-lg-4 col-sm-12">
                <PostsFeed 
                    :id="id"
                    :view_only="true"
                />
            </div>
        </div>


    </div>
</template>

<script>
import utils from '../utils'
import PostsFeed from './post-view/PostsFeed.vue'

export default {
    name: 'PostsList',
    props: ['id'],
    mixins: [utils],
    components: { PostsFeed },

    data() {
        return {
            fields: [
                {
                    key: 'month',
                    label: 'Month',
                    sortable: false,
                    thClass: 'text-left',
                    tdClass: 'text-left'
                },
                {
                    key: 'status',
                    label: 'Status',
                },
                {
                    key: 'posts_quantity',
                    label: 'Posts'
                }
            ]
        }
    },

    async mounted() {
        //from utils, get the project info from id and users and populate project/members
        await this.getProjectData(this.id)

        //from utils, add the project to sidebar
        this.toggleProjectToSideBar('add', 'Projects')
        
        this.getPostsLists()
    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        this.toggleProjectToSideBar('remove', 'Projects')
    },

    methods: {
        

        onRowClicked(item) {
            this.$router.push(`/project/${this.id}/posts/${item.post_id}`)
        },
    }

}
</script>

<style>
    #projectList tr {
        cursor: pointer;
    }
</style>