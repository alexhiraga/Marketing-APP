<template>
    <div class="ProfileUser">
        <b-img 
            rounded="circle"
            fluid-grow
            :src="user.user_photo"
            blank-color="#777"
            v-b-tooltip.hover
            title="Change photo"
            @click="$refs['uploadUserPhoto'].show()"
            style="cursor: pointer; max-width: 300px; aspect-ratio: 1"
        ></b-img>
        <h3 class="mt-4">{{ user.user_name }} </h3>
        <b-badge class="mb-3" :variant="getRoleColor(user.permission)">{{ getRoleName(user.permission) }}</b-badge>

        <b-modal ref="uploadUserPhoto"
            hide-footer
            title="Upload profile photo"
        >
            <b-form-file
                v-model="photo"
                :state="Boolean(photo)"
                placeholder="Choose a photo or drop it here..."
                drop-placeholder="Drop photo here..."
            ></b-form-file>
            <b-button 
                v-if="photo" 
                @click="uploadPhoto()" 
                variant="success"
                class="mt-3"
            >
                Change photo
            </b-button>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'ProfileUser',
    props: [ 'user_info' ],

    data() {
        return {
            user: this.user_info,
            photo: null,

        }
    },

    methods: {
        uploadPhoto() {
            //function to upload new photo
            //if success uploading, replace the new photo
            //else display $swal 
        }
    }
}
</script>

<style>

</style>