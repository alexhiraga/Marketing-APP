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
                        <b-button v-if="!view_only" variant="light" @click="openEditPage()" size="sm" class="mb-3">Edit posts</b-button>
                    </div>
                    <br>
                    <div class="d-inline mr-2" v-for="(tag, i) in this.project.tags" :key="i">
                        <b-badge pill variant="primary" v-b-tooltip.hover :title="tag">{{ tag }}</b-badge>
                    </div>
                    <br><br>
                    <div class="d-inline m-1" v-for="(icon, i) in project.social" :key="'icon' + i">
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
                            {{ getMonthName(postsDetails.month) }}
                        </div>
                    </div>
                </b-col>
            </b-row>

            <div >
                <b-row >
                    <b-col cols="4" v-for="(post, i) in postsDetails.data" :key="i" v-b-hover="(e) => postHover(e, i)">
                        <div v-if="hoverList[i]" 
                            class="hoverPostInfo" 
                            style="cursor: pointer"
                            @click="openPostModal(post)"
                        >
                            <p style="padding-top: 46%">
                                <i class="far fa-calendar mr-2"></i>
                                {{ momentPublishDate(post.publishDate) }}
                            </p>
                        </div>
                        <b-img 
                            style="margin: 15px 0; aspect-ratio: 1/1; width: 100%; object-fit: cover"
                            :src="post.image_url ? post.image_url : ''"
                            :blank="!post.image_url"
                            class="imgInsta position-relative" 
                            blankColor="#bbb" 
                            
                        >
                        </b-img>
                    </b-col>
                </b-row>
            </div>
        </b-container>

        <PostModal 
            ref="postmodal"
            :project="project"
        />
    </div>
</template>

<script>
/* eslint-disable */
import PostModal from './PostModal.vue'
import utils from '../../utils'
import * as moment from "moment";

export default {
    name: 'PostsFeed',
    props: [ 'id', 'view_only', 'month', 'year' ],
    components: { PostModal },
    mixins: [utils],

    data() {
        return {
            hoverList: [],
        }
    },
        
    created() {
        if(!this.view_only){
            this.toggleProjectToSideBar('add', 'Projects', this.id)
        }
    },

    async mounted() {
        //from utils, get the project info from id and users and populate project/members
        await this.getProjectData(this.id)
        this.tagsToArray()
        
        await this.getPostsDetails(this.month, this.year, this.id)
        
        this.setAllHoverStatus(this.postsDetails.data)
        
    },

    watch: {
        month() {
            if(!this.month || !this.year || !this.id) return
            this.getPostsDetails(this.month, this.year, this.id)
        }
    },

    methods: {
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
            do {
                // this.hoverList.push(false)
                this.$set(this.hoverList, i, false)
                i++
                
            } while( i < value.length)
        },
        postHover(hovered, i) {
            /* eslint-disable */
            //It is warning
            this.$set(this.hoverList, i, hovered)
        },

        tagsToArray() {
            if(!this.project.tags) return
            this.project.tags = this.project.tags.split(",")
        },

        momentPublishDate(date) {
            return moment(date).format('DD/MM/YYYY')
        },

        openEditPage() {
            this.$router.push({ path: `/project/${this.id}/posts/${this.month}/${this.year}/edit` })
        }

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