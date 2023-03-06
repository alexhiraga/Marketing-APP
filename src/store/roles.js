export default {
    data() {
        return {
            role: {
                1: { name: "GOD", variant: "dark" },
                2: { name: "CEO", variant: "secondary" },
                3: { name: "Manager", variant: "danger" },
                4: { name: "Project manager", variant: "warning" },
                5: { name: "Traffic manager", variant: "info" },
                6: { name: "Designer", variant: "info" },
                7: { name: "Copywriter", variant: "info" },
                8: { name: "Recruit", variant: "info" },
                9: { name: "Member", variant: "info" },
            }
        }
    },

    methods: {
        getRoleName(roleValue) {
            return this.role[roleValue].name
        },
        getRoleColor(roleValue) {
            return this.role[roleValue].variant
        },
        getAllRolesNames() {
            var roles = Object.keys(this.role).map(key => {
                var options = {}
                this.$set(options, 'value', key)
                this.$set(options, 'text', this.role[key].name)
                return options
            })
            return roles
        }
    }
}