<template>
    <div>
        <div class="row">
            <div class="col-lg-4 col-sm-12 mt-3">
                <ProjectDetails :project="project" :hide_edit_btn="true" />

                <b-button @click="openModalChangeProjectPhoto()" variant="outline-secondary" class="mt-4">Change photo</b-button>

                <b-modal
                    ref="changeProjectPhoto"
                    title="Change photo"
                    button-size="sm"
                    size="sm"
                    hide-footer
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
                    <b-button class="float-right mt-3" size="sm" @click="$refs['changeProjectPhoto'].hide()" variant="secondary">Cancel</b-button>
                </b-modal>
            </div>

            <div class="col-lg-5 col-sm-12 mt-3">
                <b-tabs content-class="mt-3">

                    <b-tab title="General" active>

                        <b-form class="text-left">
                            <b-form-group label="Project Name:">
                                <b-form-input
                                    v-model="project.name"
                                    placeholder="Enter project name"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group label="Status:">
                                <b-form-select :options="getAllStatusNames()" v-model="project.status"></b-form-select>
                            </b-form-group>

                            <label>Tags:</label>
                            <multiselect 
                                v-model="tagsValue" 
                                tag-placeholder="Add this as new tag" 
                                placeholder="Search or add a tag" 
                                label="name" track-by="code" 
                                :options="tagsOptions" 
                                :multiple="true" 
                                :taggable="true" 
                                @tag="addTag"
                            ></multiselect>

                            <b-form-group label="Social:" class="mt-3">
                                <div class="d-flex mb-3" style="align-items: center" v-for="(link, index) in project.social" :key="index">
                                    <b-icon 
                                        class="mr-2"
                                        id="socialIcons"
                                        :icon="link.icon" 
                                        font-scale="1.5" 
                                        style="cursor:pointer"
                                        variant="light"
                                        v-b-tooltip.hover
                                        :title="link.url"
                                    ></b-icon>
                                    <b-form-input
                                        v-model="link.url"
                                        placeholder="Enter URL"
                                        disabled                                        
                                    ></b-form-input>
                                    <b-button
                                        @click="openIconModal(link)"
                                        class="ml-2"
                                        size="sm"
                                        variant="warning"
                                        title="Edit"
                                        style="cursor: pointer"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </b-button>
                                    <b-button
                                        size="sm"
                                        @click="removeItem(index, 'icon', link.social_id)"
                                        class="ml-2"
                                        variant="danger"
                                        title="Remove"
                                        style="cursor: pointer;"
                                    >   
                                        <i class="fas fa-trash"></i>
                                    </b-button>
                                </div>
                                <b-button @click="openIconModal()" variant="outline-primary" size="sm" class="float-left">Add new</b-button>
                            </b-form-group>

                        </b-form>

                        <b-modal
                            ref="newIcon"
                            title="Edit social info"
                            ok-title="Save"
                            button-size="sm"
                        >
                            <div class="d-flex mb-3" style="align-items: center">
                                <b-icon 
                                    class="mr-2"
                                    id="socialIcons"
                                    :icon="icon" 
                                    @click="openIconsModal(index, icon)"
                                    font-scale="1.5" 
                                    style="cursor:pointer"
                                    variant="light"
                                    v-b-tooltip.hover
                                    :title="url"
                                    ></b-icon>
                                    <b-form-input
                                    v-model="url"
                                    placeholder="Enter URL"
                                    required
                                ></b-form-input>
                            </div>
                            <template #modal-footer>
                                <button @click="$refs['newIcon'].hide()" class="btn btn-secondary btn-sm m-1">Cancel</button>
                                <button @click="addSocial()" class="btn btn-success btn-sm m-1">Save</button>
                            </template>
                        </b-modal>
                        <b-modal
                            hide-footer
                            ref="iconsModal"
                            title="Choose an icon"
                        >
                            <div class="d-inline" v-for="icon in icons" :key="icon">
                                <b-icon 
                                    @click="chooseIcon(icon)"
                                    :icon="icon"
                                    id="socialIcons"
                                    class="m-3"
                                    font-scale="2"
                                    :variant="selectedIcon == icon ? 'success' : 'light'"
                                    :title="icon"
                                    style="cursor: pointer;"
                                ></b-icon>
                            </div>
                        </b-modal>

                        <b-button @click="save()" class="float-right" variant="success">Save</b-button>

                    </b-tab>

                    <b-tab title="Users">
                        <div>
                            <b-form-group label="Project members:" class="mt-3 text-left">
                                <div class="d-flex mb-3" style="align-items: center" v-for="(member, index) in project.users" :key="index">
                                    <b-avatar :src="member.image" class="mr-2"></b-avatar>
                                    <b-badge class="mr-1" :variant="getRoleColor(member.permission)">{{ getRoleName(member.permission) }}</b-badge>
                                    <span>{{ member.name }}</span>
                                    <b-icon
                                        @click="removeItem(index, 'member', member.user_id)"
                                        class="ml-2"
                                        icon="x-square"
                                        variant="danger"
                                        title="Remove"
                                        style="cursor: pointer;"
                                    ></b-icon>
                                </div>
                                <div class="d-flex justify-content-between pt-3">
                                    <div>
                                        <b-button @click="showUsers = !showUsers" variant="outline-primary" size="sm" class="m-1">Manage members</b-button>
                                    </div>
                                    <div class="w-50">
                                        <b-form-input
                                            v-if="showUsers"
                                            v-model="userFilter"
                                            type="search"
                                            placeholder="Type to search users"
                                        ></b-form-input>
                                    </div>
                                </div>
                            </b-form-group>

                            <b-table 
                                v-if="showUsers"
                                hover striped borderless sort-icon-left
                                id="nonMemberList"
                                class="text-left"
                                :items="notProjectMembers()" 
                                :fields="fields"
                                :filter="userFilter"
                                @row-clicked="addUserToProject"
                            >
                                <template #cell(name)="data">
                                    <b-avatar :src="data.item.image" class="mr-2"></b-avatar>
                                    <b-badge class="mr-1" :variant="getRoleColor(data.item.permission)">{{ getRoleName(data.item.permission) }}</b-badge>
                                    <span>{{ data.item.name }}</span>
                                </template>
                            </b-table>
                        </div>
                    </b-tab>

                    <b-tab title="Integration">
                        <under-construction />
                    </b-tab>
                </b-tabs>
            </div>
            <div class="col-lg-3 col-sm-0"></div>
        </div>
    </div>
</template>

<script>
import utils from '../utils'
import Multiselect from 'vue-multiselect'
import ProjectDetails from '../ProjectDetails.vue'

export default {
    props: ['id'],
    name: 'ProjectSettings',
    mixins: [utils],
    components: { Multiselect, ProjectDetails },
    data() {
        return {
            tagsOptions: [],
            tagsValue: [],
            iconIndex: '',
            isHovered: false,
            selectedIcon: '',
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true,
                },
            ],
            showUsers: false,
            userFilter: '',
            usersList: [],
            icon: '',
            url: '',
            social_id: '',
        }
    },

    async mounted() {
        //from utils, get the project info from id and users and populate project/members
        await this.getProjectData(this.id)
        this.getUsers()
        this.transformToMultiSelect()
        
        //from utils, add the project to sidebar
        this.toggleProjectToSideBar('add', 'Projects')
    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        this.toggleProjectToSideBar('remove', 'Projects')
    },

    watch: {
        //Refresh tags in object
        tagsValue(value) {
            this.project.tags = []
            for(let i in value) {
                this.project.tags.push(value[i].name)
            }
        }
    },

    methods: {
        async getUsers() {
            try {
                this.usersList = (await this.$http.get('/users')).data
            } catch(e) {
                console.error(e)
            }
        },

        transformToMultiSelect() {
            if(!this.project.tags) return
            var tags = this.project.tags.split(",")
            for(let i in tags) {
                this.tagsOptions.push({
                    name: tags[i],
                    code: tags[i]
                })
                this.tagsValue.push({
                    name: tags[i],
                    code: tags[i]
                })
            }
        },

        //Set new value for tags
        addTag (newTag) {
            const tag = {
                name: newTag,
                code: newTag
            }
            this.tagsOptions.push(tag)
            this.tagsValue.push(tag)
        },

        openIconsModal(index, selectedIcon) {
            this.$refs.iconsModal.show()
            this.iconIndex = index
            this.selectedIcon = selectedIcon
        },

        chooseIcon(icon) {
            // this.project.social[this.iconIndex].icon = icon
            this.icon = icon
            this.$refs.iconsModal.hide()
        },

        newSocial() {
            this.project.social.push({
                icon: 'plus-square',
                url: ''
            })
        },

        openIconModal(item) {
            this.icon = item ? item.icon : 'plus-square'
            this.url = item ? item.url : ''
            this.social_id = item ? item.social_id : ''

            this.$refs['newIcon'].show()
        },

        async addSocial(){
            let method = this.social_id ? 'put' : 'post'
            let id = this.social_id ? `/${this.social_id}` : ''
            const data = {
                icon: this.icon,
                url: this.url,
                project_id: this.id
            }
            try {
                let res = (await this.$http[method](`/social${id}`, data)).data
                if(this.social_id) {
                    for(let i in this.project.social) {
                        if(this.project.social[i].social_id ==  this.social_id) {
                            this.project.social[i].url = this.url
                            this.project.social[i].icon = this.icon
                        }
                    }
                } else {
                    this.project.social.push({
                        url: this.url,
                        icon: this.icon,
                        social_id: res[0]
                    })
                }
            } catch(e) {
                console.error(e)
            }

            this.$refs['newIcon'].hide()
        },

        async removeItem(index, type, id) {
            if(type == 'icon') {
                this.$swal.fire({
                    title: 'Are you sure?',
                    // text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, remove it!'
                    }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await this.$http.delete(`/social/${id}`)
                        } catch(e) {
                            console.error(e)
                        }
                        this.project.social.splice(index, 1)
                    }
                })
            }
            if(type == 'member' ) {
                try {
                    await this.$http.delete(`/members/${this.id}/${id}`)
                    this.project.users.splice(index, 1)
                } catch(e) {
                    console.error(e)
                }
                //Refresh table
                this.notProjectMembers()
            }
        },

        notProjectMembers() {
            let selectedItemFilter = this.project.users.map(item => { return item.user_id })

            let filteredUsers = this.usersList.filter(item => !selectedItemFilter.includes(item.user_id))
            return filteredUsers
        },

        async addUserToProject(user) {
            try {
                const newUser = {
                    project_id: this.id,
                    user_id: user.user_id
                }
                await this.$http.post('/members', newUser)

                this.project.users.push(user)
                this.notProjectMembers() //Refresh table

            } catch(e) {
                console.error(e)
            }
        },
        async save() {
            let tags = ''
            if(this.tagsValue) {
                for(let i in this.tagsValue) {
                    tags += this.tagsValue[i].name + ","
                }
                tags = tags.slice(0, -1)
            }
            const newData = {
                name: this.project.name,
                status: this.project.status,
                tags,
                image: this.project.image,
                project_id: this.project.project_id
            }

            try {
                await this.$http.put(`/projects/${this.id}`, newData)
                this.$swal.fire(
                    'Saved!',
                    'The project has been saved.',
                    'success'
                )
            } catch(e) {
                console.error(e)
                this.$swal({
                    title: 'Error',
                    icon: 'error',
                    text: 'Could not save the project info.'
                })
            }

        },

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
                this.project.image = res.image_url
                this.$refs['changeProjectPhoto'].hide()
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

        openModalChangeProjectPhoto() {
            this.$refs['changeProjectPhoto'].show()
        }
        
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
    #socialIcons {
        transition: 0.5s;
    }
    #socialIcons:hover {
        color: var(--active-btn)!important;
    }
    #nonMemberList {
        cursor:pointer;
    }
</style>

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
</style>