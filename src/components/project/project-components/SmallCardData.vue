<template>
    <div class="SmallCardData card p-4 m-2">
        <div class="row">
            <div class="col-8 row">

                <div class="col-3">
                    <span class="circle" :style="'background-color:'+progressBarColor('color')">
                        <i :class="icon +' text-xl'" style="vertical-align:middle"></i>
                    </span>
                </div>
                
                <div class="col-9 text-left pl-4">
                    <h5>{{ title }}</h5>
                    <h6 class="text-secondary">{{ subtitle }}</h6>
                </div>

                <div v-if="goal" class="col-12" v-b-tooltip.hover :title="goalPercentage().toFixed(0) + '%'">
                    <span class="text-secondary text-sm">Goal: {{ title == 'Total Revenue' ? '$' : '' }}{{ goal }}</span>
                    <b-progress 
                        class="mx-3" 
                        :variant="progressBarColor('variant')" 
                        height="2px" 
                        :value="goalPercentage()"
                    ></b-progress>
                </div>
            </div>
                
            <div v-if="goal" class="col-4 ml-3" style="border-left: solid 2px gray">
                <i :class="isGoalReached() ? 'fas fa-chevron-up text-success' : 'fas fa-chevron-down text-' +  progressBarColor('variant')" class="text-xl"></i>
                <h5 :class="isGoalReached() ? 'text-success' : 'text-' + progressBarColor('variant') " class="text-bold">{{ title == 'Total Revenue' ? '$' : '' }}{{ totalDataValue() }}</h5>
                <p class="text-secondary">last 30 days</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SmallCardData',
    props: [ 'title', 'subtitle', 'goal', 'ga_data' , 'icon'],
    data() {
        return {

        }
    },
    
    watch: {
        ga_data(){
            this.totalDataValue()
        }

    },

    computed: {
        
    },

    methods: {
        totalDataValue() {
            let total = 0
            for(let i in this.ga_data){
                total += this.ga_data[i].value
            }
            return total
        },

        isGoalReached(){
            if(this.goal < this.totalDataValue()) return true
            return false
        },

        goalPercentage() {
            const percentage = this.totalDataValue()*100/this.goal
            return percentage
        },

        progressBarColor(type) {
            const percentage = this.totalDataValue()*100/this.goal
            if(type == 'variant'){
                if(percentage > 100) return 'success'
                if(percentage > 70 && percentage <= 100) return 'warning'
                if(percentage <= 70) return 'danger'
                return 'secondary'
            } else {
                if(percentage > 100) return 'var(--success)'
                if(percentage > 70 && percentage <= 100) return 'var(--warning)'
                if(percentage <= 70) return 'var(--danger)'
                return 'var(--secondary)'
            }
        }

    }
}
</script>

<style scoped>
    .circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        line-height: 3.5em;
    }

</style>