<template>
    <div class="PostId">
        <PostsFeed :id="id" :month="month" :year="year" :view_only="false" />
    </div>
</template>

<script>
import utils from '../../utils'
import PostsFeed from './PostsFeed.vue'

export default {
    name: 'PostId',
    props: ['id', 'month', 'year'],
    mixins: [utils],
    components: { PostsFeed },
    data() {
        return {
        }
    },

    async mounted() {
        //from utils, get the project info from id and users and populate project/members
        // await this.getProjectData(this.id)

        //from utils, add the project to sidebar
        // await this.toggleProjectToSideBar('add', 'Projects', this.id)

        //get details of the post based on the this.postid
        //this.getPostDetails(this.postid)

    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        this.toggleProjectToSideBar('remove', 'Projects')
    },

    methods: {
        
    }
}
</script>