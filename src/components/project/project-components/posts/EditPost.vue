<template>
    <div class="EditPost">
        <div class="d-flex justify-content-between">
            <h5>
                {{ selectedMonth ? getMonthName(selectedMonth) : '' }}/{{ selectedYear ? selectedYear : '' }}
                <b-badge v-if="selectedStatus" :variant="getRoleColor(selectedStatus)">
                    {{ getStatusName(selectedStatus) }}
                </b-badge>
            </h5>
            
            
            <div class="float-right pb-3 d-block">
                <b-button v-if="!isNew" variant="danger" @click="deleteMonthPost()">Delete</b-button>
                <b-button variant="success" @click="save()">{{ isNew ? 'Create' : 'Save'}}</b-button>
            </div>
        </div>
        <div class="row">

            <div class="col-lg-9 col-sm-12">
                <b-tabs content-class="mt-3">

                    <b-tab title="Edit" active>
                        <draggable v-model="postsDetails">
                            <div v-for="(post, i) in postsDetails" :key="i" class="align-items-center">
                                <div class="row rounded border p-4 m-3 align-items-center">
                                    <div class="col-2">
                                        <div v-if="!post.image_url" class="file-drop-area">
                                            <i class="fas fa-file-upload"></i>
                                            <input 
                                                class="file-input" 
                                                type="file"
                                                @change="uploadImage($event, i)"
                                                accept="image/png, image/jpeg, image/jpg"
                                            >
                                        </div>
                                        <div v-else v-b-hover="(e) => hoverImage(e, i)">
                                            <div v-if="isHovered[i]" class="hoverImage">
                                                <b-button variant="outline-danger" @click="post.image_url = ''" style="margin: 40% 0">
                                                    <i class="fas fa-trash"></i>
                                                </b-button>
                                            </div>
                                            <b-img :src="post.image_url" fluid-grow class="previewImage position-relative"></b-img>
                                        </div>
                                    </div>
                                    <div class="col-10">

                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex">
                                                <p>Publish date:</p>
                                                <b-badge 
                                                    v-if="publishDates[i]"
                                                    variant="primary" 
                                                    class="float-left ml-1" 
                                                    style="max-height: 20px"
                                                >
                                                    {{ moment(publishDates[i]).format("DD/MM/YYYY") }}
                                                </b-badge>
                                            </div>
                                        </div>
                                        
                                        <b-form-textarea
                                        size="sm"
                                        v-model="post.description"
                                        ></b-form-textarea>
                                    </div>
                                </div>
                            </div>
                        </draggable>
                    </b-tab>

                    <b-tab title="Preview">

                        <div >
                            <b-row style="margin: 0 6rem">
                                <b-col cols="4" v-for="(post, i) in postsDetails.slice().reverse()" :key="'preview' + i" v-b-hover="(e) => postHover(e, i)">
                                    <div v-if="hoverList[i]" 
                                        class="hoverPostInfo" 
                                    >
                                        <p style="padding-top: 46%">
                                            <i class="far fa-calendar mr-2"></i>
                                            {{ momentPublishDate(publishDates.slice().reverse()[i]) }}
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

                    </b-tab>

                </b-tabs>
            </div>

            <div class="col-lg-3 col-sm-12">
                <b-form-group v-if="isNew" label="Posts:" class="text-left" label-for="posts-quantity">
                    <b-form-input
                        v-if="isNew"
                        id="posts-quantity"
                        type="number"
                        v-model="postsQuantity"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Month:" class="text-left" label-for="month">
                    <b-form-select
                        id="month"
                        :options="optionsMonth"
                        v-model="selectedMonth"
                        required
                        :disabled="!isNew"
                    ></b-form-select>
                </b-form-group>

                <b-form-group label="Year:" class="text-left" label-for="year">
                    <b-form-input
                        id="year"
                        type="number"
                        v-model="selectedYear"
                        required
                        :disabled="!isNew"
                        ></b-form-input>
                </b-form-group>

                <b-form-group label="Status:" class="text-left" label-for="status">

                    <b-form-select
                        id="status"
                        :options="getAllStatusNames()"
                        v-model="selectedStatus"
                    ></b-form-select>
                </b-form-group>

                <div class="d-flex justify-content-between">
                    <label class="float-left">Publish dates:</label>
                    <b-button @click="orderPublishDates()" size="sm" variant="outline-secondary">Order dates</b-button>
                </div>
                <m-date-picker 
                    id="calendar-publishdate"
                    v-model="publishDates" 
                    :multi="true" 
                    :always-display="true" 
                    :format="formatDate"
                    lang="en"
                ></m-date-picker>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import utils from '../utils'
import draggable from 'vuedraggable'
import * as moment from "moment";

export default {
    name: 'EditPost',
    props: ['id', 'month', 'year'],
    mixins: [utils],
    components: { draggable },

    data() {
        return {
            moment,
            isNew: false,
            postsQuantity: 12,
            optionsMonth: [
                { text: 'January', value: 1 },
                { text: 'February', value: 2 },
                { text: 'March', value: 3 },
                { text: 'April', value: 4 },
                { text: 'May', value: 5 },
                { text: 'June', value: 6 },
                { text: 'July', value: 7 },
                { text: 'August', value: 8 },
                { text: 'September', value: 9 },
                { text: 'October', value: 10 },
                { text: 'November', value: 11 },
                { text: 'December', value: 12 }
            ],
            selectedMonth: null,
            selectedYear: 2023,
            selectedStatus: 0,
            publishDates: [],
            isHovered: [],
            hoverList: []
        }
    },

    watch: {
        postsQuantity(value) {
            if(this.postsDetails.length == value) return
            if(this.postsDetails.length > value) {
                do {
                    this.postsDetails.pop()
                } while(this.postsDetails.length > value)
            }
            if(this.postsDetails.length < value) {
                do {
                    this.postsDetails.push({
                        project_id: this.id,
                        month: this.selectedMonth,
                        year: this.selectedYear,
                        status: this.selectedStatus,
                        image_url: '',
                        description: '',
                        publishDate: ''
                    })
                } while(this.postsDetails.length < value)
            }
        },

    },

    created() {
        //from utils, add the project to sidebar
        this.toggleProjectToSideBar('add', 'Projects')
    },

    async mounted() {
        //from utils, get the project info from id and users and populate project/members
        await this.getProjectData(this.id)

        //If its a new post
        if(window.location.href.endsWith('/new')) {
            this.isNew = true
            //fill posts array of objects 
            do {
                this.postsDetails.push({
                    // project_id: this.id,
                    // month: this.selectedMonth,
                    // year: this.selectedYear,
                    status: this.selectedStatus,
                    image_url: '',
                    description: '',
                    publishDate: ''
                })


            } while(this.postsDetails.length < this.postsQuantity)
            

        } else {
            this.isNew = false
            await this.getPosts(this.id, this.month, this.year)
            this.selectedMonth = this.month
            this.selectedYear = this.year
            if(this.postsDetails[0].status) {
                this.selectedStatus = this.postsDetails[0].status
            }

            //reverse the array
            this.postsDetails = this.postsDetails.reverse()

            //handle publish dates
            for(let i in this.postsDetails) {
                this.publishDates.push(this.postsDetails[i].publishDate)
            }
        }

    },

    methods: {
        async getPosts(id, month, year) {
            try {
                this.postsDetails = (await this.$http.get(`/posts/${id}/${month}/${year}`)).data
            } catch(e) {
                console.error(e)
            }
        },

        orderPublishDates() {
            if(this.publishDates.length < 2) return
            this.publishDates.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a) - new Date(b);
            });
        },

        async uploadImage(event, i) {
            if(!event) return
            if(event.target.files[0].size > 3E6) {
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: `Maximum upload file size 3MB!`
                })
                return
            }

            let data = new FormData()
            data.append('image', event.target.files[0])

            let config = {
                header: {
                    'Content-Type': 'image'
                }
            }

            try {
                let res = (await this.$http.post('/image', data, config)).data
                this.postsDetails[i].image_url = res.image_url
            } catch(e) {
                console.error(e)
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: `An unexpected error occurred`
                })
                return
            }
        },

        async save() {
            let method = this.isNew ? 'post' : 'put'

            for(let i in this.postsDetails) {
                this.postsDetails[i].status = this.selectedStatus
                this.postsDetails[i].publishDate = this.publishDates[i]
            }

            try {
                await this.$http[method](`/posts/${this.id}/${this.selectedMonth}/${this.selectedYear}`, this.postsDetails)
                if(this.isNew) {
                    //redirect 
                    this.$router.push({ path: `/project/${this.id}/posts/${this.selectedMonth}/${this.selectedYear}/edit`})
                    this.isNew = false
                }
            } catch(e) {
                console.error(e)
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: `An unexpected error occurred`
                })
            }
                
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        hoverImage(e, i) {
            this.$set(this.isHovered, i, e)
        },

        async deleteMonthPost() {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!'
                }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await this.$http.delete(`/posts/${this.id}/${this.month}/${this.year}`)
                    } catch(e) {
                        console.error(e)
                        this.$swal({
                            title: 'Error',
                            icon: 'error',
                            text: 'An unexpected error occured.'
                        })
                        return
                    }
                    this.$router.push({ path: `/project/${this.id}/posts`})
                }
            })
        },

        postHover(hovered, i) {
            this.$set(this.hoverList, i, hovered)
        },
        momentPublishDate(date) {
            if(!date) return
            return moment(date).format('DD/MM/YYYY')
        },
    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        this.toggleProjectToSideBar('remove', 'Projects')
    },

}

</script>

<style lang="scss" scoped>
.file-drop-area {
    position: relative;
    display: flex;
    align-items: center;
    width: 450px;
    max-width: 100%;
    padding: 25px;
    border: 1px dashed rgba(255, 255, 255, 0.4);
    border-radius: 3px;
    transition: 0.2s;
    &.is-active {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
  
.file-input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0;
    &:focus {
      outline: none;
    }
  }

.previewImage {
    object-fit: cover;
    max-height: 120px!important;
    max-width: 120px!important;
    aspect-ratio: 1;
}

#calendar-publishdate {
    padding: 0 !important;
}

.hoverImage {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    align-items:center;
    margin-left: 12px;
    z-index: 3;
    width:120px;
    height:100%;
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