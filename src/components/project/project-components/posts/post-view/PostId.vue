<template>
    <div class="PostId">
        <PostsFeed :id="id" :postid="postid" :view_only="false" />
    </div>
</template>

<script>
import utils from '../../utils'
import PostsFeed from './PostsFeed.vue'

import postDetails from '@/data/postsDetails'

export default {
    name: 'PostId',
    props: ['id', 'postid'],
    mixins: [utils],
    components: { PostsFeed },
    data() {
        return {
            postDetails
        }
    },

    mounted() {
        //from utils, get the project info from id and users and populate project/members
        this.getProjectData(this.id)

        //from utils, add the project to sidebar
        this.toggleProjectToSideBar('add', 'Projects', this.postid)

        //get details of the post based on the this.postid
        //this.getPostDetails(this.postid)

    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        this.toggleProjectToSideBar('remove', 'Projects')
    },

    methods: {
        getPostDetails() {
            //this.postDetails = await axios.get(..) based in this.postid
        }
    }
}
</script>