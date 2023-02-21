<template>
    <div>
        <b-img :src="project.image" rounded="circle" width="300px" height="300px" style="object-fit: contain; border: 2px solid var(--active-btn)"></b-img>
        <h3 class="mt-4">{{ project.name }} </h3>
        <b-badge class="mb-3" :variant="getStatusColor( project.status)">{{ getStatusName(project.status) }}</b-badge>
        <br>
        <div class="d-inline m-1" v-for="tag in this.project.tags" :key="tag">
            <b-badge pill variant="primary" v-b-tooltip.hover :title="tag">{{ tag }}</b-badge>
        </div>
        <hr class="xs">
        <b-button 
            v-if="!hide_edit_btn"
            @click="openConfig()"
            class="w-75 mb-3" 
            variant="secondary" 
            size="sm"
        >
            Edit project
        </b-button>
        <br>
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

    </div>

</template>

<script>
export default {
    name: 'ProjectDetails',
    props: [ 'project', 'hide_edit_btn' ],
    data() {
        return {

        }
    },
    mounted() {
    },
    methods: {
        openUrl(url) {
            window.open(url, "_blank")
        },
        openConfig() {
            this.$router.push(`/project/${this.project.id}/settings`)
        }
    }
}
</script>

<style>
    #socialIcons {
        transition: 0.5s;
    }
    #socialIcons:hover {
        color: var(--active-btn)!important;
    }
</style>