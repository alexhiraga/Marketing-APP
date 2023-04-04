<template>
    <div>
        <b-img :src="project.image" rounded="circle" fluid-grow style="max-width: 300px; aspect-ratio: 1; object-fit: contain; border: 2px solid var(--active-btn)"></b-img>
        <h3 class="mt-4">{{ project.name }} </h3>
        <b-badge v-if="project.status" class="mb-3" :variant="getStatusColor(project.status)">{{ getStatusName(project.status) }}</b-badge>
        <br>
        <div class="d-inline m-1" v-for="(tag, i) in this.project.tags" :key="tag+i">
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
        <div class="d-inline m-1" v-for="(icon, i) in project.social" :key="i">
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
            this.$router.push(`/project/${this.project.project_id}/settings`)
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