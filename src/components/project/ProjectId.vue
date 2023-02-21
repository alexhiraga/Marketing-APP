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
                        :goal="project.gaData.goalMonthlyRevenue"
                        :ga_data="project.gaData.totalRevenue"
                        icon="far fa-dollar-sign"
                    />
                </div>

                <div class="col-lg-6 col-sm-12">
                    <SmallCardData 
                        title="Conversion"
                        subtitle="Ad performance"
                        :goal="project.gaData.goalMonthlyConversion"
                        :ga_data="project.gaData.conversion"
                        icon="fas fa-chart-line"
                    />
                </div>
                
                <div class="col-lg-12 mt-3">
                    <GraphCardData 
                        title="Users"
                        :goal="project.gaData.goalMonthlyUsers"
                        :ga_data="project.gaData.users"
                    />
                </div>
            </div>

            <div class="col-lg-4 col-sm-12 mt-3">
                insta
            </div>

        </section>
    </div>
</template>

<script>
import SmallCardData from './project-components/SmallCardData.vue'
import GraphCardData from './project-components/GraphCardData.vue'
import ProjectDetails from './project-components/ProjectDetails.vue'
import utils from './project-components/utils'


export default {
    props: ['id'],
    components: { SmallCardData, GraphCardData, ProjectDetails },
    mixins: [utils],
    data() {
        return {
            isBusy: false,
        }
    },

    mounted() {
        //from utils, get the project info from id and users and populate project/members
        this.getProjectData(this.id)

        //from utils, add the project to sidebar
        this.toggleProjectToSideBar('add', 'Projects')
    },

    beforeDestroy() {
        //from utils, remove project from sidebar
        this.toggleProjectToSideBar('remove', 'Projects')
    },

    methods: {
        
    },
}
</script>

<style>
</style>