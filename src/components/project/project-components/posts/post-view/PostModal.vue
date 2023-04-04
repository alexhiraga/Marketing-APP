<template>
    <div class="PostModal">
        <b-modal
            id="postmodal"
            ref="postInfoModal"
            hide-footer
            hide-header
            centered
        >
            <div class="postModalHeader d-flex justify-content-between mx-3">
                <div class="d-flex align-items-center">
                    <b-img :src="project.image" :blank="!project.image" blankColor="#1a1a1a" width="30px" height="30px" style="object-fit: contain"></b-img>
                    <h6 class="mb-0 ml-3">{{ project.name }}</h6>
                </div>
                <div>
                    <i class="fas fa-ellipsis-h" style="cursor: pointer"></i>
                </div>
            </div>

            <div class="postModalImage my-3">
                <b-img :src="image" blankColor="#1a1a1a" :blank="!image" class="w-100"></b-img>
            </div>

            <div class="interactionIcons d-flex m-3 justify-content-between">
                <div class="d-flex">
                    <i class="far fa-heart text-lg"></i>
                    <i class="far fa-comment text-lg ml-2"></i>
                    <i class="far fa-paper-plane text-lg ml-2"></i>
                </div>
                <div>
                    <i class="far fa-bookmark text-lg"></i>
                </div>
            </div>

            <div class="mx-3 d-flex" v-if="project.users">
                <b-avatar-group size="20px" class="mt-1" v-if="project.users.length > 1">
                    <b-avatar v-for="(member, i) in project.users.slice(0,3)" :key="i"
                        :src="member.image"
                        v-b-tooltip.hover
                        :title="member.name"
                    ></b-avatar>
                </b-avatar-group>
                <b-avatar v-if="project.users.length == 1"
                    size="20px" class="mt-1" 
                    :src="project.users ? project.users[0].image : ''" 
                    v-b-tooltip.hover 
                    :title="project.users[0].name"
                ></b-avatar>
                <p class="ml-2" v-if="project.users.length > 2">Liked by <strong>{{ project.users[0].name }}</strong> and <strong>{{ project.users.length-1 }} others</strong></p>
                <p class="ml-2" v-if="project.users.length == 2">Liked by <strong>{{ project.users[0].name }}</strong> and <strong>{{ project.users[1].name }}</strong></p>
                <p class="ml-2" v-if="project.users.length == 1">Liked by <strong>{{ project.users[0].name }}</strong></p>
            </div>

            <div class="mx-3">
                <p><strong>{{ project.name }} </strong>{{ description }}</p>
                <p class="text-sm" style="color: #c9c9c9;">{{ date }}</p>
            </div>

        </b-modal>
    </div>
</template>

<script>
import * as moment from "moment";

export default {
    name: 'PostModal',
    props: [ 'project' ],
    data() {
        return {
            image: '',
            description: '',
            date: '',
        }
    },

    mounted() {
        this.shuffleMembersArray(this.project.users)
    },
    /* eslint-disable */
    methods: {
        openModal(post) {
            this.image = post.image_url
            this.description = post.description
            this.date = moment(post.publishDate).format('MMMM D, YYYY')
            this.shuffleMembersArray(this.project.users)

            this.$refs['postInfoModal'].show()
        },

        shuffleMembersArray(array) {
            if(!array) return
            if(array.length < 3) return
            let currentIndex = array.length,  randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }

            this.$set(this.project, 'users', array)
        }
    }
}
</script>

<style>
    #postmodal div.modal-body {
        padding-left: 0!important;
        padding-right: 0!important;
    }

</style>