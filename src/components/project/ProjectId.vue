<template>
    <div>
        <section class="row">
            <div class="col-lg-4 col-sm-12 mt-3">
                <ProjectDetails 
                    :project="project"
                    :hide_edit_btn="false"
                />

            </div>

            <div class="col-lg-8 col-sm-12 mt-3 row">
                <div class="col-lg-6 col-sm-12">
                    <SmallCardData 
                        title="Total Revenue"
                        subtitle="Ecommerce and ad"
                        :goal="gadata.goalMonthlyRevenue"
                        :ga_data="gadata.totalRevenue"
                        icon="far fa-dollar-sign"
                    />
                </div>

                <div class="col-lg-6 col-sm-12">
                    <SmallCardData 
                        title="Conversion"
                        subtitle="Ad performance"
                        :goal="gadata.goalMonthlyConversion"
                        :ga_data="gadata.conversion"
                        icon="fas fa-chart-line"
                    />
                </div>
                
                <div class="col-lg-12 mt-3">
                    <GraphCardData 
                        title="Users"
                        :goal="gadata.goalMonthlyUsers"
                        :ga_data="gadata.users"
                    />
                </div>
            </div>

            <div class="col-lg-4 col-sm-12 mt-3">
                <div class="card p-4 m-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <b-icon icon="instagram" scale="2" variant="info"></b-icon>
                            <h5 class="ml-3 mt-2">
                                Next post
                            </h5>
                        </div>
                        <b-button @click="openPosts()" variant="primary" size="sm">Open posts</b-button>
                    </div>

                    <div v-if="lastPost" class="d-flex justify-content-between mt-3">
                        <div v-b-hover="postHover" style="min-width: 150px!important">
                            <div v-if="isHover" 
                                class="hoverPostInfo" 
                                style="cursor: pointer"
                                @click="openPostModal(lastPost)"
                            >
                                <p style="padding-top: 46%">
                                    <i class="far fa-calendar mr-2"></i>
                                    {{ getPublishDate(lastPost.publishDate) }}
                                </p>
                            </div>
                            <b-img fluid-grow style="width: 150px; height: 150px; aspect-ratio: 1; object-fit: cover;"
                                :src="lastPost.image_url">
                            </b-img>
                        </div>
                        <div class="ml-3 mt-1">
                            <p class="text-sm text-left">
                                {{ lastPost.description ? lastPost.description.slice(0,200) : '' }}
                                {{ lastPost.description ? lastPost.description.length > 200 ? '...' : '' : '' }}
                            </p>
                            <p class="text-sm text-secondary text-right">
                                {{ getPublishDate(lastPost.publishDate) }}
                            </p>
                        </div>
                    </div>

                    <div v-else>
                        <div class="text-secondary py-5">

                            <b-icon icon="folder-x"></b-icon>
                            No post found.
                        </div>
                    </div>

                    <PostModal 
                        ref="postmodal"
                        :project="project"
                    />

                </div>
                <!-- <b-button variant="outline-primary" @click="openPosts()">
                    <i class="fas fa-instagram"></i>
                </b-button>  -->
            </div>

        </section>
    </div>
</template>

<script>
import SmallCardData from './project-components/SmallCardData.vue'
import GraphCardData from './project-components/GraphCardData.vue'
import ProjectDetails from './project-components/ProjectDetails.vue'
import utils from './project-components/utils'
import * as moment from "moment";
import PostModal from '@/components/project/project-components/posts/post-view/PostModal.vue'

export default {
    props: ['id'],
    components: { SmallCardData, GraphCardData, ProjectDetails, PostModal },
    mixins: [utils],
    data() {
        return {
            isBusy: false,
            gadata: {
                "totalRevenue": [
                    { "date": "08-12-2022", "value": 309 },
                    { "date": "09-12-2022", "value": 87 },
                    { "date": "10-12-2022", "value": 323 },
                    { "date": "11-12-2022", "value": 213 },
                    { "date": "12-12-2022", "value": 420 },
                    { "date": "13-12-2022", "value": 109 },
                    { "date": "14-12-2022", "value": 49 },
                    { "date": "15-12-2022", "value": 33 },
                    { "date": "16-12-2022", "value": 121 },
                    { "date": "17-12-2022", "value": 422 },
                    { "date": "18-12-2022", "value": 96 },
                    { "date": "19-12-2022", "value": 323 },
                    { "date": "20-12-2022", "value": 18 },
                    { "date": "21-12-2022", "value": 49 },
                    { "date": "22-12-2022", "value": 32 },
                    { "date": "23-12-2022", "value": 73 },
                    { "date": "24-12-2022", "value": 22 },
                    { "date": "25-12-2022", "value": 42 },
                    { "date": "26-12-2022", "value": 45 },
                    { "date": "27-12-2022", "value": 67 },
                    { "date": "28-12-2022", "value": 24 },
                    { "date": "29-12-2022", "value": 321 },
                    { "date": "30-12-2022", "value": 115 },
                    { "date": "31-12-2022", "value": 65 },
                    { "date": "01-01-2023", "value": 23 },
                    { "date": "02-01-2023", "value": 75 },
                    { "date": "03-01-2023", "value": 22 },
                    { "date": "04-01-2023", "value": 31 },
                    { "date": "05-01-2023", "value": 97 },
                    { "date": "06-01-2023", "value": 23 }
                ],
                "conversion": [
                    { "date": "08-12-2022", "value": 6 },
                    { "date": "09-12-2022", "value": 4 },
                    { "date": "10-12-2022", "value": 7 },
                    { "date": "11-12-2022", "value": 3 },
                    { "date": "12-12-2022", "value": 10 },
                    { "date": "13-12-2022", "value": 2 },
                    { "date": "14-12-2022", "value": 4 },
                    { "date": "15-12-2022", "value": 2 },
                    { "date": "16-12-2022", "value": 5 },
                    { "date": "17-12-2022", "value": 11 },
                    { "date": "18-12-2022", "value": 6 },
                    { "date": "19-12-2022", "value": 8 },
                    { "date": "20-12-2022", "value": 1 },
                    { "date": "21-12-2022", "value": 4 },
                    { "date": "22-12-2022", "value": 2 },
                    { "date": "23-12-2022", "value": 3 },
                    { "date": "24-12-2022", "value": 1 },
                    { "date": "25-12-2022", "value": 2 },
                    { "date": "26-12-2022", "value": 2 },
                    { "date": "27-12-2022", "value": 3 },
                    { "date": "28-12-2022", "value": 1 },
                    { "date": "29-12-2022", "value": 10 },
                    { "date": "30-12-2022", "value": 5 },
                    { "date": "31-12-2022", "value": 5 },
                    { "date": "01-01-2023", "value": 3 },
                    { "date": "02-01-2023", "value": 5 },
                    { "date": "03-01-2023", "value": 2 },
                    { "date": "04-01-2023", "value": 1 },
                    { "date": "05-01-2023", "value": 4 },
                    { "date": "06-01-2023", "value": 2 }    
                ],
                "users": [
                    { "date": "08-12-2022", "value": 3090 },
                    { "date": "09-12-2022", "value": 873 },
                    { "date": "10-12-2022", "value": 3231 },
                    { "date": "11-12-2022", "value": 2133 },
                    { "date": "12-12-2022", "value": 4320 },
                    { "date": "13-12-2022", "value": 1909 },
                    { "date": "14-12-2022", "value": 498 },
                    { "date": "15-12-2022", "value": 335 },
                    { "date": "16-12-2022", "value": 1241 },
                    { "date": "17-12-2022", "value": 4252 },
                    { "date": "18-12-2022", "value": 963 },
                    { "date": "19-12-2022", "value": 3223 },
                    { "date": "20-12-2022", "value": 198 },
                    { "date": "21-12-2022", "value": 439 },
                    { "date": "22-12-2022", "value": 362 },
                    { "date": "23-12-2022", "value": 773 },
                    { "date": "24-12-2022", "value": 252 },
                    { "date": "25-12-2022", "value": 429 },
                    { "date": "26-12-2022", "value": 457 },
                    { "date": "27-12-2022", "value": 671 },
                    { "date": "28-12-2022", "value": 244 },
                    { "date": "29-12-2022", "value": 3213 },
                    { "date": "30-12-2022", "value": 1152 },
                    { "date": "31-12-2022", "value": 653 },
                    { "date": "01-01-2023", "value": 238 },
                    { "date": "02-01-2023", "value": 754 },
                    { "date": "03-01-2023", "value": 225 },
                    { "date": "04-01-2023", "value": 316 },
                    { "date": "05-01-2023", "value": 977 },
                    { "date": "06-01-2023", "value": 33 }
                ],
                "goalMonthlyRevenue": 4000,
                "goalMonthlyConversion": 100,
                "goalMonthlyUsers": 20000
            },
            lastPost: {},
            isHover: false,
        }
    },

    created() {
        //from utils, add the project to sidebar
        this.toggleProjectToSideBar('add', 'Projects')
    },

    async mounted() {
        //from utils, get the project info from id and users and populate project/members
        await this.getProjectData(this.id)
        
        //Transform tags in array
        this.stringToArray()

        //Get posts list and last month/year
        await this.getPostsLists(this.id)
        this.getLastMonth()

        this.getNextPost()
    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        this.toggleProjectToSideBar('remove', 'Projects')
    },

    methods: {
        openPosts() {
            this.$router.push(`/project/${this.project.project_id}/posts`)
        },

        async getNextPost() {
            try {
                this.lastPost = (await this.$http.get(`/posts/${this.id}/next`)).data
            } catch(e) {
                console.error(e)
            }
        },

        getPublishDate(value) {
            return moment(value).format('MMMM D, YYYY')
        },

        postHover(hovered) {
            this.isHover = hovered
        },

        openPostModal(post) {
            this.$refs.postmodal.openModal(post)
        },
    },
}
</script>

<style scoped>
.hoverPostInfo {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    margin-top:0;
    z-index: 3;
    width:150px;
    height:150px;
}
</style>