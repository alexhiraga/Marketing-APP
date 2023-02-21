<template>
    <div class="PostModal">
        <b-modal
            id="postmodal"
            ref="postmodal"
            hide-footer
            hide-header
            centered
        >
            <div class="postModalHeader d-flex justify-content-between mx-3">
                <div class="d-flex align-items-center">
                    <b-img :src="project.image" width="30px" height="30px"></b-img>
                    <h6 class="mb-0 ml-3">{{ project.name }}</h6>
                </div>
                <div>
                    <i class="fas fa-ellipsis-h" style="cursor: pointer"></i>
                </div>
            </div>

            <div class="postModalImage my-3">
                <b-img :src="image" class="w-100"></b-img>
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

            <div class="mx-3 d-flex">
                <b-avatar-group size="20px" class="mt-1">
                    <b-avatar v-for="(member, i) in members.slice(0,3)" :key="i"
                        :src="member.user_photo"
                        v-b-tooltip.hover
                        :title="member.user_name"
                    ></b-avatar>
                </b-avatar-group>
                <p class="ml-2">Liked by <strong>{{ members[0].user_name }}</strong> and <strong>{{ members.length-1 }} others</strong></p>
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
    props: [ 'members', 'project' ],
    data() {
        return {
            image: '',
            description: '',
            date: '',
        }
    },

    mounted() {
        this.shuffleMembersArray(this.members)
    },
    
    methods: {
        openModal(post) {
            this.image = post.image_url
            this.description = post.description
            this.date = moment(post.publishDate, 'DD/MM/YYYY').format('MMMM D, YYYY')
            this.shuffleMembersArray(this.members)

            this.$refs.postmodal.show()
        },

        shuffleMembersArray(array) {
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

            this.$set(this, 'members', array)
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