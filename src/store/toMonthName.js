export default {
    data() {
        return {
            monthName: {
                1: { name: "January" },
                2: { name: "February" },
                3: { name: "March" },
                4: { name: "April" },
                5: { name: "May" },
                6: { name: "June" },
                7: { name: "July" },
                8: { name: "August" },
                9: { name: "September" },
                10: { name: "October" },
                11: { name: "November" },
                12: { name: "December" },
            }
        }
    },
/* eslint-disable */
    methods: {
        getMonthName(roleValue) {
            if(!roleValue) return
            roleValue = parseInt(roleValue)
            return this.monthName[roleValue].name
        },
    }
}