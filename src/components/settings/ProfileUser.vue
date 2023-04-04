<template>
    <div class="ProfileUser">
        <b-img 
            rounded="circle"
            fluid-grow
            :src="user.image"
            blank-color="#777"
            v-b-tooltip.hover
            style="cursor: pointer; max-width: 300px; aspect-ratio: 1; object-fit: contain; border: 2px solid var(--active-btn)"
            title="Change photo"
            @click="$refs['uploadUserPhoto'].show()"
        ></b-img>
        <h3 class="mt-4">{{ user.name }} </h3>
        <b-badge class="mb-3" :variant="getRoleColor(user.permission)">{{ getRoleName(user.permission) }}</b-badge>

        <b-modal ref="uploadUserPhoto"
            hide-footer
            title="Upload profile photo"
        >
            <div class="file-drop-area">
                <i class="fas fa-file-upload"></i>
                <p class="ml-2 mt-3 text-secondary text-sm">Click here or drop an image.</p>
                <input 
                    class="file-input" 
                    type="file" 
                    @change="uploadImage($event)"
                    accept="image/png, image/jpeg, image/jpg"
                >
            </div>
            <div class="d-flex justify-content-end">
                <b-button variant="danger" size="sm" class="mt-3" @click="user.image = ''">Remove current image</b-button>
                <b-button class="float-right mt-3" size="sm" @click="$refs['uploadUserPhoto'].hide()" variant="secondary">Cancel</b-button>
            </div>
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
        async uploadImage(event) {
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

                let user = { 
                    name: this.user.name,
                    email: this.user.email,
                    image: res.image_url
                }
                this.$store.commit('refreshUser', user)

                this.$refs['uploadUserPhoto'].hide()
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

        // async refreshUserImage(image) {
        //     let user = { 
        //         name: this.user.name,
        //         email: this.user.email,
        //         image: image.image_url
        //     }
        //     try {
        //         await this.$http.put(`/users/${this.user.user_id}`, user)
        //         //refresh user in store
        //         this.$store.commit('refreshUser', user)
        //     } catch(e) {
        //         console.error(e)
        //     }
        // }
    }
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
    object-fit: contain;
    max-height: 100px;
    max-width: 100px;
}

#calendar-publishdate {
    padding: 0 !important;
}
</style>