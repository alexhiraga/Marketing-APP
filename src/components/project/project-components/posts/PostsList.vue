<template>
    <div class="PostsList">
        <h2>Posts</h2>

        <div class="row pt-4">
            <div class="col-lg-7 col-sm-12">
                <div class="d-flex justify-content-between mb-4">
                    <b-button @click="$router.push(`/project/${id}/posts/new`)" variant="primary">New post</b-button>
                </div>
                <b-table hover striped borderless
                    id="postsList"
                    ref="postsList"
                    :items="posts"
                    :fields="fields"
                    sort-icon-left
                    @row-clicked="onRowClicked"
                >
                    <template #empty>
                        <h6>No post found</h6>
                    </template>

                    <template #cell(month)="data">
                        {{ getMonthName(data.item.month) }}/{{ data.item.year }}
                    </template>

                    <template #cell(status)="data">
                        <b-badge :variant="getRoleColor(data.item.status)">
                            {{ getStatusName(data.item.status) }}
                        </b-badge>
                    </template>
    
                </b-table>
            </div>

            <div class="col-lg-5 col-sm-12">
                <PostsFeed 
                    :id="id"
                    :view_only="true"
                    :month="lastMonth"
                    :year="lastYear"
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
                    key: 'count',
                    label: 'Posts'
                }
            ],
        }
    },

    async mounted() {
        //from utils, get the project info from id and users and populate project/members
        await this.getProjectData(this.id)

        //from utils, add the project to sidebar
        this.toggleProjectToSideBar('add', 'Projects')
        
        await this.getPostsLists(this.id)
        this.getLastMonth()
        this.$refs.postsList.refresh()
    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        this.toggleProjectToSideBar('remove', 'Projects')
    },

    methods: {
        onRowClicked(item) {
            this.$router.push(`/project/${this.id}/posts/${item.month}/${item.year}`)
        },
        
    }

}
</script>

<style>
    #postsList tr {
        cursor: pointer;
    }
</style>