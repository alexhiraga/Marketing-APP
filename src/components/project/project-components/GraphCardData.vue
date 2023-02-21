<template>
    <div class="GraphCardData card p-4 m-2">
        <h5 class="text-left ml-3">{{ title }}</h5>
        <div id="chart">
            <apexchart
                ref="gaGraph"
                type="line"
                height="250"
                :options="chartOptions"
                :series="series"
            >
            </apexchart>
        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import * as moment from "moment";

export default {
    name: 'GraphCardData',
    components: {
        apexchart: VueApexCharts,
    },
    props: [ 'goal', 'ga_data', 'title' ],
    data() {
        return {
            series: [{
                name: "Users",
                data: []
            }],
            chartOptions: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                        tools:{
                            download:false 
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    width: 2,
                    colors: 'var(--active-btn)'
                },
                title: {
                },
                grid: {
                    borderColor: '#303030'
                },
                yaxis: {
                    labels: {
                        style: {
                            // fontFamily: 'Rubik'
                        }
                    }
                },
                xaxis: {
                    categories: [],
                    labels: {
                        show: false,
                    }
                    
                },
                tooltip: {
                    enabled: true,
                    theme: 'dark'
                },
                theme: {
                    mode: 'dark'
                }
                
            }
        }
    },

    mounted() {
        this.fillChart()

    },

    methods: {
        fillChart() {
            this.chartOptions.xaxis.categories = []
            this.series[0].data = []
            for(let i in this.ga_data) {
                this.chartOptions.xaxis.categories.push(moment(this.ga_data[i].date, 'DD/MM/YYYY').format('MMMM Do YYYY'))
                this.series[0].data.push(this.ga_data[i].value)
            }
            this.$refs.gaGraph.refresh()
        },

    },
}
</script>

<style>
    .apexcharts-canvas .apexcharts-svg {
        background: transparent!important;
    }
</style>
