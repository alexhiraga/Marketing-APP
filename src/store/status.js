export default {
    data() {
        return {
            status: {
                1: { name: "Scheduled", variant: "success" },
                2: { name: "Waiting approvation", variant: "secondary" },
                3: { name: "Ready", variant: "warning" },
                4: { name: "Waiting design", variant: "danger" },
                5: { name: "Waiting copy", variant: "danger" },
                6: { name: "Schedule approvation", variant: "secondary" },
                7: { name: "Waiting planning ", variant: "danger" },
                8: { name: "Requires attention", variant: "danger" },
                9: { name: "On hold", variant: "light" },
                10: { name: "Inactive", variant: "dark" },
            }
        }
    },

    methods: {
        getStatusName(statusValue) {
            return this.status[statusValue].name
        },
        getStatusColor(statusValue) {
            return this.status[statusValue].variant
        },
        getAllStatusNames() {
            var status = Object.keys(this.status).map(key => {
                var options = {}
                this.$set(options, 'value', key)
                this.$set(options, 'text', this.status[key].name)
                return options
            })
            return status
        }
    }
}