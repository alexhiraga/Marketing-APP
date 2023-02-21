<template>
    <div>
        <div class="row">
            <div class="col-lg-4 col-sm-12 mt-3">
                <ProjectDetails :project="project" :hide_edit_btn="true" />
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

                            <label class="typo__label">Tags:</label>
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
                                        @click="openIconsModal(index, link.icon)"
                                        font-scale="1.5" 
                                        style="cursor:pointer"
                                        variant="light"
                                        v-b-tooltip.hover
                                        :title="link.url"
                                    ></b-icon>
                                    <b-form-input
                                        v-model="link.url"
                                        placeholder="Enter URL"
                                        required
                                    ></b-form-input>
                                    <b-icon
                                        @click="removeItem(index, 'icon')"
                                        class="ml-2"
                                        icon="x-square"
                                        variant="danger"
                                        title="Remove"
                                        style="cursor: pointer;"
                                    ></b-icon>
                                </div>
                                <b-button @click="newSocial()" variant="outline-primary" size="sm" class="float-left">Add new</b-button>
                            </b-form-group>

                        </b-form>
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
                    </b-tab>

                    <b-tab title="Users">
                        <div>
                            <b-form-group label="Project members:" class="mt-3 text-left">
                                <div class="d-flex mb-3" style="align-items: center" v-for="(member, index) in members" :key="index">
                                    <b-avatar :src="member.user_photo" class="mr-2"></b-avatar>
                                    <b-badge class="mr-1" :variant="getRoleColor(member.permission)">{{ getRoleName(member.permission) }}</b-badge>
                                    <span>{{ member.user_name }}</span>
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
                                <template #cell(user_name)="data">
                                    <b-avatar :src="data.item.user_photo" class="mr-2"></b-avatar>
                                    <b-badge class="mr-1" :variant="getRoleColor(data.item.permission)">{{ getRoleName(data.item.permission) }}</b-badge>
                                    <span>{{ data.item.user_name }}</span>
                                </template>
                            </b-table>
                        </div>
                    </b-tab>

                    <b-tab title="Integration">
                        <under-construction />
                    </b-tab>
                </b-tabs>

                <b-button @click="save()" class="float-right" variant="success">Save</b-button>

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
                    key: 'user_name',
                    label: 'Name',
                    sortable: true,
                },
            ],
            showUsers: false,
            userFilter: '',
        }
    },

    mounted() {
        //from utils, get the project info from id and users and populate project/members
        this.getProjectData(this.id)

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
        transformToMultiSelect() {
            for(let i in this.project.tags) {
                this.tagsOptions.push({
                    name: this.project.tags[i],
                    code: this.project.tags[i]
                })
                this.tagsValue.push({
                    name: this.project.tags[i],
                    code: this.project.tags[i]
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
            this.project.social[this.iconIndex].icon = icon
            this.$refs.iconsModal.hide()
        },

        newSocial() {
            this.project.social.push({
                icon: 'plus-square',
                url: ''
            })
        },

        removeItem(index, type, id) {
            if(type == 'icon') this.project.social.splice(index, 1)
            if(type == 'member' ) {
                //Remove member id from project object
                let index = this.project.members.indexOf(id)
                this.project.members.splice(index, 1)

                //Remove member from rendered list
                this.members.splice(index, 1)

                //Refresh table
                this.notProjectMembers()
            }
        },

        notProjectMembers() {
            //Compares all users from project members id to create a list of non-members
            let notProjectMember = this.users.filter(e => {
                for(let id in this.project.members) {
                    if(e.user_id === this.project.members[id]) {
                        return
                    }
                }
                return e
            })
            return notProjectMember
        },

        addUserToProject(item) {
            this.members.push(item) //Add member to member list
            this.project.members.push(item.user_id) //Add member id to project members
            this.notProjectMembers() //Refresh table
        },

        save() {
            //no back-end
            // eslint-disable-next-line
            this.$swal({
                title: 'Error',
                icon: 'error',
                text: 'Feature not avaible.'
            })
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