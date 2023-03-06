<template>
    <div class="PostsFeed">
        <b-container>

            <b-row>
                <b-col cols="4">
                    <b-img :src="project.image" fluid-grow style="max-width: 150px; aspect-ratio: 1; object-fit: contain;" rounded="circle"></b-img>
                </b-col>
                <b-col cols="8" class="text-left">
                    <div class="d-flex align-items-center">
                        <p>{{ project.name }}</p>
                        <b-badge class="mb-3 ml-2" :variant="getStatusColor( project.status)">{{ getStatusName(project.status) }}</b-badge>
                    </div>
                    <br>
                    <div class="d-inline mr-2" v-for="(tag, i) in this.project.tags" :key="i">
                        <b-badge pill variant="primary" v-b-tooltip.hover :title="tag">{{ tag }}</b-badge>
                    </div>
                    <br><br>
                    <div class="d-inline m-1" v-for="icon in project.social" :key="icon">
                        <b-icon 
                            id="socialIcons"
                            :icon="icon.icon" 
                            @click="openUrl(icon.url)"
                            font-scale="1.5" 
                            style="cursor:pointer"
                            variant="light"
                            v-b-tooltip.hover
                            :title="icon.url"
                        ></b-icon>
                    </div>
                </b-col>
                <b-col cols="12" style="padding-top: 3rem">
                    <div style="border-top: solid 1px #1f1f1f">
                        <div class="font-weight-light pl-3 pr-3 pt-2 text-sm" style="border-top: solid 1px var(--active-btn); width: fit-content; margin: 0 auto;">
                            <i class="fas fa-th"></i>
                            {{ postDetails.month }}
                        </div>
                    </div>
                </b-col>
            </b-row>

            <div >
                <b-row >
                    <b-col cols="4" v-for="(post, i) in postDetails.data" :key="i" v-b-hover="(e) => postHover(e, i)">
                        <div v-if="hoverList[i]" 
                            class="hoverPostInfo" 
                            style="cursor: pointer"
                            @click="openPostModal(post)"
                        >
                            <p style="padding-top: 46%">
                                <i class="far fa-calendar mr-2"></i>
                                {{ post.publishDate }}
                            </p>
                            
                        </div>
                        <b-img 
                            style="margin: 15px 0;" 
                            :src="post.image_url" 
                            class="imgInsta position-relative" 
                            
                        >
                        </b-img>
                    </b-col>
                </b-row>
            </div>
        </b-container>

        <PostModal 
            ref="postmodal"
            :project="project"
            :members="members"
        />
    </div>
</template>

<script>
import PostModal from './PostModal.vue'
import utils from '../../utils'

import postDetails from '@/data/postsDetails'

export default {
    name: 'PostsFeed',
    props: [ 'id', 'postid', 'view_only' ],
    components: { PostModal },
    mixins: [utils],

    data() {
        return {
            hoverList: [],
            postDetails
        }
    },

    mounted() {
        this.setAllHoverStatus(this.postDetails.data)

        //from utils, get the project info from id and users and populate project/members
        this.getProjectData(this.id)

        //back-end
        // this.getMonthPosts()

        // if(!this.view_only) {
        //     //from utils, add the project to sidebar
        //     this.toggleProjectToSideBar('add', 'Projects', this.postid, '/view')
        // }
    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        // if(!this.view_only) {
        //     this.toggleProjectToSideBar('remove', 'Projects')
        // }
    },

    watch: {
        "postDetails.data"(value) {
            this.setAllHoverStatus(value)
        }
    },

    methods: {
        // getMonthPosts() {
            //back-end
            //this.postDetails = await axios.get(...)
        // }
        
        openUrl(url) {
            window.open(url, "_blank")
        },
        openPostModal(post) {
            this.$refs.postmodal.openModal(post)
        },
        setAllHoverStatus(value) {
            if(!value) return
            this.hoverList = []
            let i = 0
            while( i < value.length) {
                // this.hoverList.push(false)
                this.$set(this.hoverList, i, false)
                i++
            }
        },
        postHover(hovered, i) {
            this.$set(this.hoverList, i, hovered)
        },

    } 
}
</script>

<style>
    .imgInsta {
        width:inherit;
    }

    @media (max-width: 890px) {
        .PostsFeed .col-4 {
            padding: 2px!important;
        }
        .imgInsta {
            margin: 0!important;
        }
        .hoverPostInfo {
            width: 100%!important;
            height: 100%!important;
            margin-top: 0!important;
        }
    }

    .hoverPostInfo {
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        margin-top: 15px;
        z-index: 3;
        width:calc(100% - 30px);
        height:calc(100% - 30px);
    }
</style>